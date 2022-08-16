import _ceil from 'lodash/ceil';
import _filter from 'lodash/filter';
import _indexOf from 'lodash/indexOf';
import _each from 'lodash/each';
import _map from 'lodash/map';
import { Decoration } from 'src/models/decoration';
import { Skill } from 'src/models/skill';
import { Talisman } from 'src/models/talisman';

export interface MeldingFilterOptions {
  // Option to skip favorite talismans during talisman's filtering. Default: false.
  skipFavorite: boolean
}

export function useMeldingFilter(talismans: Talisman[], options: MeldingFilterOptions) {
  /**
   * Skills weight calculators
   */

  /**
   * Return skill's level weight
   * @param skillLevelMaximum Skill's level to reach is maximum
   * @param skillLevel        Talisman's Skill level
   * @param decorationWeight  Skill's decoration weight
   */
  function getSkillLevelWeight(skillLevelMaximum: number, skillLevel: number, decorationWeight: number): number {
    const diff = skillLevelMaximum - skillLevel;

    // If diff equals 0, the skill has reached is maximum on the talisman.
    if (diff === 0) {
      // Higher the maximum level is, heavier the weight is on return.
      return 20 * decorationWeight * skillLevelMaximum;
    }

    // Then we divide the diff.
    return _ceil((15 * decorationWeight * skillLevelMaximum) / diff);
  }

  /**
   * Return skill's decoration weight, equals to the lowest decoration's required slots for one skill point
   * @param skill Talisman's Skill
   */
  function getSkillDecorationWeight(skill: Skill): number {
    let lowestDecoration = 4;

    _each(skill.decorations, (decoration: Decoration) => {
      if (decoration.requiredSlot < lowestDecoration) {
        lowestDecoration = decoration.requiredSlot;
      }
    });

    return lowestDecoration;
  }

  /**
   * Return skill weight, if empty weight is negative
   * @param skill      Talisman's Skill, can be null if you're unlucky
   * @param skillLevel Talisman's Skill level
   */
  function getSkillWeight(skill: Skill | null, skillLevel: number | null): number {
    // If this skill is empty, it's not good, we return a bad weight.
    if (!skill || !skillLevel) {
      return -25;
    }

    return getSkillLevelWeight(skill.levelMaximum, skillLevel, getSkillDecorationWeight(skill));
  }

  /**
   * If skills type are opposite, like SkillTypeInterface::BATTLE_SWORDSMAN and SkillTypeInterface::BATTLE_GUNNER,
   * we return a negative weight
   * @param skill1 mandatory Skill, can't be null
   * @param skill2 secondary Skill, can be null if you're unlucky
   */
  function getSkillsTypeWeight(skill1: Skill, skill2: Skill | null): number {
    // If this skill2 is empty, comparison is not useful.
    if (!skill2) {
      return 0;
    }

    // If skill1 type is 'battle-gunner' and skill2 is 'battle-swordsman'
    // or if skill1 type is 'battle-swordsman' and skill2 type is 'battle-gunner'
    if ((skill1.type === 'battle-gunner' && skill2.type === 'battle-swordsman')
      || (skill1.type === 'battle-swordsman' && skill2.type === 'battle-gunner')) {
      return -200;
    }

    return 0;
  }

  /**
   * Slots weight calculators
   */

  /**
   * Return Slot 1 weight, numbers are heavier than the other's calculation
   * @param slot slot's number of decoration available
   */
  function getSlot1Weight(slot: number): number {
    switch (slot) {
      case 3:
        // It's a very good start, other slots can be 3, 2, 1 or 0.
        return 30;
      case 2:
        // It's a good start, other slots can be 2, 1 or 0.
        return 20;
      case 1:
        // It's a bad start, other slots are 1 or 0 now.
        return 10;
      case 0:
      default:
        // It's a very bad start, other slots are 0 too.
        return -20;
    }
  }

  /**
   * Return Slot 2 weight
   * @param slot slot's number of decoration available
   */
  function getSlot2Weight(slot: number): number {
    switch (slot) {
      case 2:
        // It's very good, the last slot can be 2, 1 or 0.
        return 25;
      case 1:
        // It's good, the last slot can be 1 or 0.
        return 15;
      case 0:
      default:
        // It's bad, the last slot is a 0 too.
        return -15;
    }
  }

  /**
   * Return Slot 3 weight
   * @param slot slot's number of decoration available
   */
  function getSlot3Weight(slot: number): number {
    switch (slot) {
      case 1:
        // It's good, especially if others slots are 3 or 2.
        return 20;
      case 0:
      default:
        // It's ok if others are not 0, otherwise it's very bad.
        return -10;
    }
  }

  /**
   * Common Skills weight calculators
   */

  /**
   * Return if a skill is in common with the currently compared talisman
   * @param skill             skill to search
   * @param talismanToCompare currently compared talisman
   */
  function hasSkillInCommon(skill: Skill, talismanToCompare: Talisman): boolean {
    return _indexOf([talismanToCompare.skill1?.id, talismanToCompare.skill2?.id], skill.id) > -1;
  }

  /**
   * Return weight of for common talismans who are inferior to the talisman with the skill to search
   * @param skill  skill to search
   * @param weight current Talisman weight
   */
  function getInferiorTalismansWeight(skill: Skill, weight: number): number {
    return 25 * _filter(talismans, (talismanToCompare) => hasSkillInCommon(skill, talismanToCompare)
      && (talismanToCompare.weight < weight)
      // Currently, compared talisman need to be skipped if is tagged as favorite
      && ((options.skipFavorite && !talismanToCompare.favorite) || !options.skipFavorite)).length;
  }

  /**
   * Return weight of for common talismans who are superior to the talisman with the skill to search
   * @param skill  skill to search
   * @param weight current Talisman weight
   */
  function getSuperiorTalismansWeight(skill: Skill, weight: number): number {
    return -50 * _filter(talismans, (talismanToCompare) => hasSkillInCommon(skill, talismanToCompare)
      && (talismanToCompare.weight > weight)
      // Currently, compared talisman need to be skipped if is tagged as favorite
      && ((options.skipFavorite && !talismanToCompare.favorite) || !options.skipFavorite)).length;
  }

  /**
   * Return weight for skill who is in common with other talismans
   * @param skill  skill to search, can be null
   * @param weight current Talisman weight
   */
  function getCommonSkillsWeight(skill: Skill | null, weight: number): number {
    if (!skill) {
      return 0;
    }

    return getInferiorTalismansWeight(skill, weight) + getSuperiorTalismansWeight(skill, weight);
  }

  /**
   * Talisman weight calculators
   */
  /**
   * Calculate talisman's weight based on options set, skills and slots.
   * @param talisman Talisman with weight to calculate
   */
  function calculateTalismanBaseWeight(talisman: Talisman): Talisman {
    // We reset skill weight to reboot calculation
    talisman.resetWeight();

    // If Talisman is already tag for rebirth, we return a negative weight.
    if (talisman.forMelding) {
      return talisman.updateWeight(-500);
    }

    // If options skipFavorite is enabled, we return a very positive weight.
    if (options.skipFavorite && talisman.favorite) {
      return talisman.updateWeight(500);
    }

    // Applying skill 1 weight.
    talisman.updateWeight(getSkillWeight(talisman.skill1, talisman.skill1Level));
    // Applying skill 2 weight.
    talisman.updateWeight(getSkillWeight(talisman.skill2, talisman.skill2Level));
    // Applying skill type weight.
    talisman.updateWeight(getSkillsTypeWeight(<Skill>talisman.skill1, talisman.skill2));
    // Applying slots weight, for each talisman's slots.
    talisman.updateWeight(getSlot1Weight(talisman.slots.slot1));
    talisman.updateWeight(getSlot2Weight(talisman.slots.slot2));
    talisman.updateWeight(getSlot3Weight(talisman.slots.slot3));

    return talisman;
  }

  /**
   * Calculate commons skills weight based on options set, and other talismans.
   * @param talisman Talisman with weight to calculate
   */
  function calculateCommonSkillWeight(talisman: Talisman): Talisman {
    // Applying commons skills weight for talisman's skill 1.
    talisman.updateWeight(getCommonSkillsWeight(talisman.skill1, talisman.weight));
    // Applying commons skills weight for talisman's skill 2.
    talisman.updateWeight(getCommonSkillsWeight(talisman.skill2, talisman.weight));

    return talisman;
  }

  /**
   * Return bool if a talisman is good for melding or not.
   * If Talisman's weight is lower than 100, it's a bad talisman, good for melding.
   * @param talisman Talisman to compare
   */
  function toMelt(talisman: Talisman): boolean {
    return talisman.weight < 100;
  }

  function applyMeldingFilter(): Talisman[] {
    // TODO: Try to pass a ref ?
    let talismansWithWeight = _map(talismans, calculateTalismanBaseWeight);
    talismansWithWeight = _map(talismansWithWeight, calculateCommonSkillWeight);

    return _filter(talismansWithWeight, toMelt);
  }

  return { applyMeldingFilter };
}
