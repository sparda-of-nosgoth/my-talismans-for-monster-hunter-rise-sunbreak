import {
  describe, expect, it, jest,
} from '@jest/globals';
import { useTalismanExport } from 'src/composables/talisman-export';
import { initFakeTimers } from 'app/test/mocks';
import { Talisman } from 'src/models/talisman';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';
import { createPinia, setActivePinia } from 'pinia';

initFakeTimers();

jest.mock('boot/i18n');

describe('composables/talisman-export', () => {
  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  it('export an empty talisman list', () => {
    const { exportedTalismans } = useTalismanExport([]);
    expect(exportedTalismans.value).toBe('');
  });

  it('export a talismans list', () => {
    const { exportedTalismans } = useTalismanExport([
      new Talisman({
        skill1: getSkillById('speed-sharpening'),
        skill1Level: 1,
        skill2: getSkillById('weakness-exploit'),
        skill2Level: 1,
      }),
      new Talisman({
        skill1: getSkillById('master-mounter'),
        skill1Level: 1,
        skill2: getSkillById('slugger'),
        skill2Level: 1,
        slots: getSlotsById('1-1-0'),
      }),
      new Talisman({
        skill1: getSkillById('agitator'),
        skill1Level: 2,
        slots: getSlotsById('2-1-0'),
      }),
      new Talisman({
        skill1Level: 2,
        skill2Level: 2,
        slots: getSlotsById('2-1-0'),
      }),
    ]);

    expect(exportedTalismans.value).toBe(''
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
      + 'Agitator,2,,,2,1,0\r\n'
      + ',2,,2,2,1,0');
  });
});
