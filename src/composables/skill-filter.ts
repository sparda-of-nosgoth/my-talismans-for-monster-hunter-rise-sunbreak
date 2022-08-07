import { ref } from 'vue';
import _filter from 'lodash/filter';
import _lowercase from 'lodash/lowerCase';
import { translate } from 'src/utils/translation';
import { Skill } from 'src/models/skill';

export function useSkillFilter(skills: Skill[]) {
  const filteredSkills = ref<Skill[]>(skills);

  function filterSkillByName(needle: string): void {
    if (needle === '') {
      filteredSkills.value = skills;
    } else {
      filteredSkills.value = _filter(skills, (skill: Skill) => _lowercase(translate(skill.id)).indexOf(_lowercase(needle)) > -1);
    }
  }

  return {
    filteredSkills, /* sortedSkills, getSkillsByType, getSkillByName , */ filterSkillByName,
  };
}
