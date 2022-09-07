import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import { i18n } from 'boot/i18n';
import SettingsRemoteSaveConflictDialog from 'components/SettingsRemoteSaveConflictDialog.vue';
import { createTestingPinia } from '@pinia/testing';
import _now from 'lodash/now';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';
import { Talisman } from 'src/models/talisman';
import { Dialog } from 'quasar';

installQuasarPlugin({ plugins: { Dialog } });

jest.mock('boot/i18n');

jest
  .setSystemTime(new Date('2022-07-26').getTime());

describe('components/SettingsRemoteSaveConflictDialog', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  const talismans = [
    new Talisman({
      skill1: getSkillById('weakness-exploit'),
      skill1Level: 2,
      slots: getSlotsById('2-1-0'),
    }),
    new Talisman({
      skill1: getSkillById('attack-boost'),
      skill1Level: 2,
      skill2: getSkillById('slugger'),
      skill2Level: 1,
      slots: getSlotsById('1-1-0'),
    }),
    new Talisman({
      skill1: getSkillById('speed-sharpening'),
      skill1Level: 1,
      skill2: getSkillById('weakness-exploit'),
      skill2Level: 1,
      slots: getSlotsById('0-0-0'),
      favorite: true,
    }),
    new Talisman({
      skill1: getSkillById('master-shallowMounter'),
      skill1Level: 1,
      skill2: getSkillById('slugger'),
      skill2Level: 1,
      slots: getSlotsById('1-1-0'),
      forMelding: true,
    }),
  ];

  it('set defaults column values', () => {
    const { vm } = shallowMount(SettingsRemoteSaveConflictDialog, {
      props: {
        remoteStorage: {
          talismans: [],
          updatedAt: _now(),
        },
        localStorage: {
          talismans: [],
          updatedAt: _now(),
        },
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(vm.columns).toStrictEqual([
      {
        name: 'actions_prefix',
      },
      {
        name: 'skill1',
        required: true,
        field: 'skill1',
      },
      {
        name: 'skill2',
        field: 'skill2',
      },
      {
        name: 'slots',
        align: 'center',
        field: 'slots',
      },
    ]);
  });

  it('display diff of local storage from remote storage', () => {
    const { vm } = shallowMount(SettingsRemoteSaveConflictDialog, {
      props: {
        remoteStorage: {
          talismans,
          updatedAt: _now(),
        },
        localStorage: {
          talismans: [talismans[1], talismans[2]],
          updatedAt: _now(),
        },
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(vm.remoteTalismans).toStrictEqual([talismans[0], talismans[3]]);
  });

  it('display diff of remote storage from local storage', () => {
    const { vm } = shallowMount(SettingsRemoteSaveConflictDialog, {
      props: {
        remoteStorage: {
          talismans: [talismans[0], talismans[3]],
          updatedAt: _now(),
        },
        localStorage: {
          talismans,
          updatedAt: _now(),
        },
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(vm.localTalismans).toStrictEqual([talismans[1], talismans[2]]);
  });
});
