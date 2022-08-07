import _map from 'lodash/map';
import { unparse } from 'papaparse';
import { translateInEn } from 'src/utils/translation';
import { computed } from 'vue';
import { Talisman } from 'src/models/talisman';

export function useTalismanExport(talismans: Talisman[]) {
  // Computed value to display talismans in a csv format
  const exportedTalismans = computed(() => unparse(_map(talismans, (talisman) => ({
    skill1: talisman.skill1 ? translateInEn(talisman.skill1?.id) : '',
    skill1Level: talisman.skill1Level,
    skill2: talisman.skill2 ? translateInEn(talisman.skill2?.id) : '',
    skill2Level: talisman.skill2Level,
    slot1: talisman.slots?.slot1,
    slot2: talisman.slots?.slot2,
    slot3: talisman.slots?.slot3,
  })), {
    delimiter: ',',
    header: false,
  }));

  return { exportedTalismans };
}
