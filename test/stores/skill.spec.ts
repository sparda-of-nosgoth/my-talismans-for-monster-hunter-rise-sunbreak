import {
  beforeEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { useSkillStore } from 'stores/skills';
import { createPinia, setActivePinia } from 'pinia';

jest.mock('boot/i18n');

describe('stores/skill', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('has a function to get skill by id', () => {
    const { getSkillById } = useSkillStore();
    expect(getSkillById('botanist')).toStrictEqual({
      id: 'botanist',
      type: 'quest',
      levelMaximum: 4,
      foundOnTalismans: true,
      decorations: [
        { id: 'botany-jewel-1', requiredSlot: 1, skillPoints: 1 },
        { id: 'botany-jewel-4', requiredSlot: 4, skillPoints: 3 },
      ],
    });

    // Don't find
    expect(getSkillById('bokanist')).toBeFalsy();
  });

  it('has a function to get a Skill by a translated name', () => {
    const { getSkillByName } = useSkillStore();
    // Find with a name translated in French
    expect(getSkillByName('Mise à mort')).toStrictEqual({
      id: 'weakness-exploit',
      type: 'battle',
      levelMaximum: 3,
      foundOnTalismans: true,
      decorations: [
        { id: 'tenderizer-jewel-2', requiredSlot: 2, skillPoints: 1 },
      ],
    });

    // Find with a name translated in English
    expect(getSkillByName('Speed Sharpening')).toStrictEqual({
      id: 'speed-sharpening',
      type: 'battle-swordsman',
      levelMaximum: 3,
      foundOnTalismans: true,
      decorations: [
        { id: 'grinder-jewel-2', requiredSlot: 1, skillPoints: 1 },
        { id: 'grinder-jewel-4', requiredSlot: 4, skillPoints: 3 },
      ],
    });

    // Don't find
    expect(getSkillByName('Seed Sharpening')).toBeFalsy();
  });

  it('has a function to filter skills by SkillType', () => {
    const { filterByType, getSkillById } = useSkillStore();
    expect(filterByType({ id: 'quest' })).toStrictEqual([
      getSkillById('affinity-sliding'),
      getSkillById('botanist'),
      getSkillById('capture-master'),
      getSkillById('carving-pro'),
      getSkillById('constitution'),
      getSkillById('geologist'),
      getSkillById('good-luck'),
      getSkillById('hunger-resistance'),
      getSkillById('jump-master'),
      getSkillById('marathon-runner'),
      getSkillById('stamina-surge'),
      getSkillById('wall-runner'),
      getSkillById('wirebug-whisperer'),
      getSkillById('carving-master'),
      getSkillById('spiribirds-call'),
      getSkillById('wall-runner-boost'),
    ]);
  });

  it('has a function to sort skills by translated name order', () => {
    const { getSkillById, sortedSkills } = useSkillStore();
    // Sorted in French
    expect(sortedSkills).toStrictEqual([
      getSkillById('dereliction'),
      getSkillById('protective-polish'),
      getSkillById('jump-master'),
      getSkillById('speed-sharpening'),
      getSkillById('thunder-alignment'),
      getSkillById('wind-alignment'),
      getSkillById('blast-resistance'),
      getSkillById('muck-resistance'),
      getSkillById('ice-resistance'),
      getSkillById('paralysis-resistance'),
      getSkillById('spiribirds-call'),
      getSkillById('constitution'),
      getSkillById('sneak-attack'),
      getSkillById('dragon-resistance'),
      getSkillById('artillery'),
      getSkillById('ballistics'),
      getSkillById('defense-boost'),
      getSkillById('punishing-draw'),
      getSkillById('critical-boost'),
      getSkillById('ice-attack'),
      getSkillById('bombardier'),
      getSkillById('botanist'),
      getSkillById('earplugs'),
      getSkillById('divine-blessing'),
      getSkillById('chameleos-blessing'),
      getSkillById('kushala-blessing'),
      getSkillById('teostra-blessing'),
      getSkillById('hellfire-cloak'),
      getSkillById('speed-eating'),
      getSkillById('status-trigger'),
      getSkillById('recovery-up'),
      getSkillById('good-luck'),
      getSkillById('item-prolonger'),
      getSkillById('slugger'),
      getSkillById('focus'),
      getSkillById('counterstrike'),
      getSkillById('maximum-might'),
      getSkillById('mail-of-hellfire'),
      getSkillById('guts'),
      getSkillById('stun-resistance'),
      getSkillById('dragonheart'),
      getSkillById('partbreaker'),
      getSkillById('blast-attack'),
      getSkillById('diversion'),
      getSkillById('wirebug-whisperer'),
      getSkillById('defiance'),
      getSkillById('critical-draw'),
      getSkillById('resuscitate'),
      getSkillById('carving-pro'),
      getSkillById('element-exploit'),
      getSkillById('thunder-attack'),
      getSkillById('latent-power'),
      getSkillById('offensive-guard'),
      getSkillById('spread-up'),
      getSkillById('wall-runner'),
      getSkillById('wall-runner-boost'),
      getSkillById('geologist'),
      getSkillById('recovery-speed'),
      getSkillById('heroics'),
      getSkillById('fire-resistance'),
      getSkillById('foray'),
      getSkillById('sleep-resistance'),
      getSkillById('evade-window'),
      getSkillById('fortify'),
      getSkillById('sleep-attack'),
      getSkillById('bladescale-hone'),
      getSkillById('attack-boost'),
      getSkillById('water-attack'),
      getSkillById('horn-maestro'),
      getSkillById('masters-touch'),
      getSkillById('marathon-runner'),
      getSkillById('bludgeoner'),
      getSkillById('ammo-up'),
      getSkillById('bow-charge-plus'),
      getSkillById('capture-master'),
      getSkillById('critical-eye'),
      getSkillById('charge-master'),
      getSkillById('carving-master'),
      getSkillById('master-mounter'),
      getSkillById('weakness-exploit'),
      getSkillById('rapid-morph'),
      getSkillById('poison-attack'),
      getSkillById('mushroomancer'),
      getSkillById('stamina-surge'),
      getSkillById('grinder-s'),
      getSkillById('flinch-free'),
      getSkillById('paralysis-attack'),
      getSkillById('normal-rapid'),
      getSkillById('furious'),
      getSkillById('guard'),
      getSkillById('thunder-resistance'),
      getSkillById('windproof'),
      getSkillById('pierce-up'),
      getSkillById('peak-performance'),
      getSkillById('free-meal'),
      getSkillById('dragon-attack'),
      getSkillById('adrenaline-rush'),
      getSkillById('power-prolonger'),
      getSkillById('fire-attack'),
      getSkillById('critical-element'),
      getSkillById('load-shells'),
      getSkillById('recoil-down'),
      getSkillById('redirection'),
      getSkillById('quick-sheathe'),
      getSkillById('blood-rite'),
      getSkillById('affinity-sliding'),
      getSkillById('tune-up'),
      getSkillById('special-ammo-boost'),
      getSkillById('razor-sharp'),
      getSkillById('leap-of-faith'),
      getSkillById('handicraft'),
      getSkillById('tremor-resistance'),
      getSkillById('steadiness'),
      getSkillById('bloodlust'),
      getSkillById('quick-breath'),
      getSkillById('hunger-resistance'),
      getSkillById('spare-shot'),
      getSkillById('rapid-fire-up'),
      getSkillById('blight-resistance'),
      getSkillById('poison-resistance'),
      getSkillById('evade-extender'),
      getSkillById('agitator'),
      getSkillById('guard-up'),
      getSkillById('wide-range'),
      getSkillById('coalescence'),
      getSkillById('chain-crit'),
      getSkillById('resentment'),
      getSkillById('reload-speed'),
      getSkillById('stamina-thief'),
      getSkillById('stormsoul'),
      getSkillById('bubbly-dance'),
      getSkillById('water-resistance'),
      getSkillById('minds-eye'),
    ]);
  });
});
