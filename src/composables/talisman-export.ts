import _map from 'lodash/map';
import { unparse } from 'papaparse';
import { translateInEn } from 'src/utils/translation';
import { computed } from 'vue';
import { Talisman } from 'src/models/talisman';

export function useTalismanExport(talismans: Talisman[]) {
  // Computed value to display talismans in a csv format
  const exportedTalismans = computed(() => unparse(_map(talismans, (talisman) => ({
    primarySkillId: talisman.primarySkill ? translateInEn(talisman.primarySkill?.id) : '',
    primarySkillLevel: talisman.primarySkillLevel,
    secondarySkillId: talisman.secondarySkill ? translateInEn(talisman.secondarySkill?.id) : '',
    secondarySkillLevel: talisman.secondarySkillLevel,
    slot1: talisman.slots?.slot1,
    slot2: talisman.slots?.slot2,
    slot3: talisman.slots?.slot3,
  })), {
    delimiter: ',',
    header: false,
  }));

  return { exportedTalismans };
}
