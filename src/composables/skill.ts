import { computed, ref } from 'vue';
import { SkillType } from 'src/composables/skillType';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _lowercase from 'lodash/lowerCase';
import _sortBy from 'lodash/sortBy';
import { searchInLocales, translate } from 'src/utils/translation';

export interface Skill {
  id: number
  name: string
  type: number
  levelMaximum: number
  foundOnTalismans: boolean
}

const allSkills = [
  {
    id: 1, name: 'affinity-sliding', type: 1, levelMaximum: 1, foundOnTalismans: true,
  }, {
    id: 2, name: 'botanist', type: 1, levelMaximum: 4, foundOnTalismans: true,
  }, {
    id: 3, name: 'capture-master', type: 1, levelMaximum: 1, foundOnTalismans: false,
  }, {
    id: 4, name: 'carving-pro', type: 1, levelMaximum: 1, foundOnTalismans: true,
  }, {
    id: 5, name: 'constitution', type: 1, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 6, name: 'geologist', type: 1, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 7, name: 'good-luck', type: 1, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 8, name: 'hunger-resistance', type: 1, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 9, name: 'jump-master', type: 1, levelMaximum: 1, foundOnTalismans: true,
  }, {
    id: 10, name: 'marathon-runner', type: 1, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 11, name: 'stamina-surge', type: 1, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 12, name: 'wall-runner', type: 1, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 13, name: 'wirebug-whisperer', type: 1, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 14, name: 'bombardier', type: 2, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 15, name: 'free-meal', type: 2, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 16, name: 'item-prolonger', type: 2, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 17, name: 'mushroomancer', type: 2, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 18, name: 'recovery-up', type: 2, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 19, name: 'speed-eating', type: 2, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 20, name: 'wide-range', type: 2, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 21, name: 'bubbly-dance', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 22, name: 'divine-blessing', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 23, name: 'earplugs', type: 5, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 24, name: 'evade-extender', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 25, name: 'evade-window', type: 5, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 26, name: 'flinch-free', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 27, name: 'guard-up', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 28, name: 'guard', type: 5, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 29, name: 'leap-of-faith', type: 5, levelMaximum: 1, foundOnTalismans: true,
  }, {
    id: 30, name: 'muck-resistance', type: 5, levelMaximum: 2, foundOnTalismans: true,
  }, {
    id: 31, name: 'quick-sheath', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 32, name: 'recovery-speed', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 33, name: 'stun-resistance', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 34, name: 'tremor-resistance', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 35, name: 'windproof', type: 5, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 36, name: 'attack-boost', type: 3, levelMaximum: 7, foundOnTalismans: true,
  }, {
    id: 37, name: 'blast-attack', type: 3, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 38, name: 'critical-eye', type: 3, levelMaximum: 7, foundOnTalismans: true,
  }, {
    id: 39, name: 'dragon-attack', type: 3, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 40, name: 'fire-attack', type: 3, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 41, name: 'ice-attack', type: 3, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 42, name: 'paralysis-attack', type: 3, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 43, name: 'poison-attack', type: 3, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 44, name: 'sleep-attack', type: 3, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 45, name: 'thunder-attack', type: 3, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 46, name: 'water-attack', type: 3, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 47, name: 'blast-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 48, name: 'blight-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 49, name: 'defense-boost', type: 4, levelMaximum: 7, foundOnTalismans: true,
  }, {
    id: 50, name: 'dragon-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 51, name: 'fire-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 52, name: 'ice-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 53, name: 'paralysis-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 54, name: 'poison-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 55, name: 'sleep-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 56, name: 'thunder-alignment', type: 9, levelMaximum: 1, foundOnTalismans: false,
  }, {
    id: 57, name: 'thunder-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 58, name: 'water-resistance', type: 4, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 59, name: 'wind-alignment', type: 9, levelMaximum: 1, foundOnTalismans: false,
  }, {
    id: 60, name: 'agitator', type: 6, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 61, name: 'artillery', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 62, name: 'bludgeoner', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 63, name: 'counterstrike', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 64, name: 'critical-boost', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 65, name: 'critical-draw', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 66, name: 'critical-element', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 67, name: 'diversion', type: 6, levelMaximum: 1, foundOnTalismans: true,
  }, {
    id: 68, name: 'focus', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 69, name: 'fortify', type: 6, levelMaximum: 1, foundOnTalismans: true,
  }, {
    id: 70, name: 'hellfire-cloak', type: 6, levelMaximum: 4, foundOnTalismans: true,
  }, {
    id: 71, name: 'heroics', type: 6, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 72, name: 'latent-power', type: 6, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 73, name: 'master-mounter', type: 6, levelMaximum: 1, foundOnTalismans: true,
  }, {
    id: 74, name: 'maximum-might', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 75, name: 'offensive-guard', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 76, name: 'partbreaker', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 77, name: 'peak-performance', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 78, name: 'power-prolonger', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 79, name: 'punishing-draw', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 80, name: 'resentment', type: 6, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 81, name: 'resuscitate', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 82, name: 'slugger', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 83, name: 'stamina-thief', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 84, name: 'weakness-exploit', type: 6, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 85, name: 'handicraft', type: 7, levelMaximum: 5, foundOnTalismans: true,
  }, {
    id: 86, name: 'horn-maestro', type: 7, levelMaximum: 1, foundOnTalismans: true,
  }, {
    id: 87, name: 'load-shells', type: 7, levelMaximum: 2, foundOnTalismans: true,
  }, {
    id: 88, name: 'minds-eye', type: 7, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 89, name: 'protective-polish', type: 7, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 90, name: 'rapid-morph', type: 7, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 91, name: 'razor-sharp', type: 7, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 92, name: 'speed-sharpening', type: 7, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 93, name: 'ballistics', type: 8, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 94, name: 'ammo-up', type: 8, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 95, name: 'bow-charge-plus', type: 8, levelMaximum: 1, foundOnTalismans: false,
  }, {
    id: 96, name: 'normal-rapid', type: 8, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 97, name: 'pierce-up', type: 8, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 98, name: 'rapid-fire-up', type: 8, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 99, name: 'recoil-down', type: 8, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 100, name: 'reload-speed', type: 8, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 101, name: 'spare-shot', type: 8, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 102, name: 'special-ammo-boost', type: 8, levelMaximum: 2, foundOnTalismans: true,
  }, {
    id: 103, name: 'spread-up', type: 8, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 104, name: 'steadiness', type: 8, levelMaximum: 2, foundOnTalismans: true,
  }, {
    id: 105, name: 'carving-master', type: 1, levelMaximum: 1, foundOnTalismans: false,
  }, {
    id: 106, name: 'masters-touch', type: 7, levelMaximum: 3, foundOnTalismans: true,
  }, {
    id: 107, name: 'chameleos-blessing', type: 9, levelMaximum: 4, foundOnTalismans: false,
  }, {
    id: 108, name: 'kushala-blessing', type: 9, levelMaximum: 4, foundOnTalismans: false,
  }, {
    id: 109, name: 'teostra-blessing', type: 9, levelMaximum: 4, foundOnTalismans: false,
  }, {
    id: 110, name: 'dragonheart', type: 9, levelMaximum: 5, foundOnTalismans: false,
  }, {
    id: 111, name: 'stormsoul', type: 9, levelMaximum: 5, foundOnTalismans: false,
  }];

export function useSkill() {
  const skills = ref<Skill[]>(allSkills);

  function getSkillsByType(skillType: SkillType): Skill[] {
    return _filter(allSkills, { type: skillType.id });
  }

  function getSkillByName(skillName: string): Skill | undefined {
    return _find(allSkills, (skill: Skill) => searchInLocales(skill.name, skillName));
  }

  const sortedSkills = computed(() => _sortBy(skills.value, [(skill) => translate(skill.name)]));

  function filterSkillByName(needle: string): void {
    if (needle === '') {
      skills.value = allSkills;
    } else {
      skills.value = _filter(allSkills, (skill: Skill) => _lowercase(translate(skill.name)).indexOf(_lowercase(needle)) > -1);
    }
  }

  return {
    skills, sortedSkills, getSkillsByType, getSkillByName, filterSkillByName,
  };
}
