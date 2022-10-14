import {
  describe, expect, it, jest,
} from '@jest/globals';
import { useTalismanExport } from 'src/composables/talisman-export';
import { Talisman } from 'src/models/talisman';

jest
  .setSystemTime(new Date('2022-07-26').getTime());

jest.mock('boot/i18n');

describe('composables/talisman-export', () => {
  it('export an empty talisman list', () => {
    const { exportedTalismans } = useTalismanExport([]);
    expect(exportedTalismans.value).toBe('');
  });

  it('export a talismans list', () => {
    const { exportedTalismans } = useTalismanExport([
      new Talisman({
        primarySkillId: 'speed-sharpening',
        primarySkillLevel: 1,
        secondarySkillId: 'weakness-exploit',
        secondarySkillLevel: 1,
      }),
      new Talisman({
        primarySkillId: 'master-mounter',
        primarySkillLevel: 1,
        secondarySkillId: 'slugger',
        secondarySkillLevel: 1,
        slotsId: '1-1-0',
      }),
      new Talisman({
        primarySkillId: 'agitator',
        primarySkillLevel: 2,
        slotsId: '2-1-0',
      }),
      new Talisman({
        primarySkillLevel: 2,
        secondarySkillLevel: 2,
        slotsId: '2-1-0',
      }),
    ]);

    expect(exportedTalismans.value).toBe(''
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
      + 'Agitator,2,,,2,1,0\r\n'
      + ',2,,2,2,1,0');
  });
});
