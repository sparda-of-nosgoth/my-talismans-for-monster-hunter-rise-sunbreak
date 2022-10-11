import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import { i18n } from 'boot/i18n';
import SettingsRemoteSaveConflictDialog from 'components/SettingsRemoteSaveConflictDialog.vue';
import { createTestingPinia } from '@pinia/testing';
import _now from 'lodash/now';
import { Talisman } from 'src/models/talisman';
import { Dialog } from 'quasar';

installQuasarPlugin({ plugins: { Dialog } });

jest.mock('boot/i18n');

jest
  .setSystemTime(new Date('2022-07-26').getTime());

describe('components/SettingsRemoteSaveConflictDialog', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  const talismans = [
    new Talisman({
      primarySkillId: 'weakness-exploit',
      primarySkillLevel: 2,
      slotsId: '2-1-0',
    }),
    new Talisman({
      primarySkillId: 'attack-boost',
      primarySkillLevel: 2,
      secondarySkillId: 'slugger',
      secondarySkillLevel: 1,
      slotsId: '1-1-0',
    }),
    new Talisman({
      primarySkillId: 'speed-sharpening',
      primarySkillLevel: 1,
      secondarySkillId: 'weakness-exploit',
      secondarySkillLevel: 1,
      slotsId: '0-0-0',
      favorite: true,
    }),
    new Talisman({
      primarySkillId: 'master-shallowMounter',
      primarySkillLevel: 1,
      secondarySkillId: 'slugger',
      secondarySkillLevel: 1,
      slotsId: '1-1-0',
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
        name: 'primarySkill',
        required: true,
        field: 'primarySkill',
      },
      {
        name: 'secondarySkill',
        field: 'secondarySkill',
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
