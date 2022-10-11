import {
  beforeEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import ManagerExport from 'components/ManagerExport.vue';
import { Notify, QInput } from 'quasar';
import _now from 'lodash/now';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';
import { Talisman } from 'src/models/talisman';

installQuasarPlugin({ plugins: { Notify } });

jest
  .setSystemTime(new Date('2022-07-26').getTime());

jest.mock('boot/i18n');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exportFileMocked = jest.fn((...args) => false);
const notifyMocked = jest.fn();
// To test export to file and notification, exportFile and useQuasar needs to be mocked
jest.mock('quasar', () => {
  // Original functions and props, used to get normal use of Quasar, and mock only few functions.
  const original = jest.requireActual('quasar') as Record<string, unknown>;
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
    exportFile: (fileName: string, rawData: string, opts: string) => exportFileMocked(fileName, rawData, opts),
    useQuasar: jest.fn(() => ({
      notify: notifyMocked,
    })),
  };
});

describe('components/ManagerExport', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  let talismans: Talisman[] = [];

  beforeEach(() => {
    talismans = [
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
    ];
  });

  it('can download a csv file', async () => {
    const { vm } = shallowMount(ManagerExport, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: { talismans },
          },
        })],
      },
    });

    await vm.$nextTick();
    expect(typeof vm.exportTable).toBe('function');
    await vm.exportTable();
    expect(exportFileMocked)
      .toHaveBeenCalledWith(
        `mhrs_talismans-${_now()}.csv`,
        'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
        + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
        + 'Agitator,2,,,2,1,0',
        'text/csv',
      );
    // Test notify return when exportFile return is false
    expect(notifyMocked).toHaveBeenCalledTimes(1);
  });

  it('display all talismans formatted to csv', () => {
    const wrapper = shallowMount(ManagerExport, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: { talismans },
          },
        })],
      },
    });

    const input = wrapper.getComponent(QInput);
    expect(input.vm.modelValue).toStrictEqual(''
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
      + 'Agitator,2,,,2,1,0');
  });
});
