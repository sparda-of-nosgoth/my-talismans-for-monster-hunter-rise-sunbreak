import { defineStore } from 'pinia';
import _sortBy from 'lodash/sortBy';
import { searchInLocales, translate } from 'src/utils/translation';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import { Skill, skillList } from 'src/models/skill';
import { SkillType, skillTypeList } from 'src/models/skill-type';
import _cloneDeep from 'lodash/cloneDeep';

export const useSkillStore = defineStore('skills', {
  state: () => ({
    skills: skillList,
    skillTypes: skillTypeList,
  }),

  getters: {
    // To get one skill by his id
    getSkillById: (state) => (id: string): Skill | undefined => _cloneDeep(_find(state.skills, { id })),
    // To get one skill by his translated name
    getSkillByName: (state) => (skillName: string) => _cloneDeep(_find(state.skills, (skill: Skill) => searchInLocales(skill.id, skillName))),
    // To filter skillList by SkillType
    filterByType: (state) => (skillType: SkillType) => _filter(state.skills, { type: skillType.id }),
    // Sorted skillList by translated names
    sortedSkills: (state) => _sortBy(state.skills, [(skill) => translate(skill.id)]),
  },
});
