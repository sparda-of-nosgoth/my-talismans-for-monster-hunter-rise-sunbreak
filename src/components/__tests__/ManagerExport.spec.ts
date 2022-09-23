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
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';

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

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  let talismans: Talisman[] = [];

  beforeEach(() => {
    talismans = [
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
