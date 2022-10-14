import {
  afterEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { config } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { i18n } from 'boot/i18n';
import {
  getTalismansFromRemoteStorage,
  initRemoteStorage, synchronizeData,
  updateTalismansFromRemoteStorage,
} from 'src/utils/remote-storage';
import { useSettingsStore } from 'stores/settings';
import { createPinia, setActivePinia } from 'pinia';
import { googleCredentials } from 'boot/google-api';
import { Talisman } from 'src/models/talisman';
import _now from 'lodash/now';
import { Dialog } from 'quasar';
import localforage from 'localforage';
import { useTalismanStore } from 'stores/talismans';

installQuasarPlugin({ plugins: { Dialog } });

jest
  .setSystemTime(new Date('2022-07-26').getTime());

jest.mock('boot/config');
jest.mock('boot/google-api');
jest.mock('boot/google-signin');
jest.mock('boot/i18n');

const onOkMocked = jest.fn((callback) => callback({ talismans: [] }));
// To test Dialog, Dialog.create needs to be mocked
jest.mock('quasar', () => {
  // Original functions and props, used to get normal use of Quasar, and mock only few functions.
  const original = jest.requireActual('quasar') as Record<string, unknown>;
  return {
    __esModule: true,
    ...original,
    Dialog: {
      create: jest.fn(() => ({
        onOk: onOkMocked,
      })),
    },
  };
});

describe('utils/remote-storage', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const settings = useSettingsStore();
  const talismanStore = useTalismanStore();

  afterEach(() => {
    googleCredentials.private_key = 'VITE_GOOGLE_CREDENTIALS_PRIVATE_KEY';
    settings.$reset();
    talismanStore.$reset();
    jest.clearAllMocks();
  });

  it('enable remote storage for a new account', async () => {
    await expect(initRemoteStorage('new_account@gmail.com'))
      .resolves
      .toBeTruthy();
    expect(settings.remoteSave).toStrictEqual({
      account: 'new_account@gmail.com',
      enabled: true,
      sheetId: '654987123',
    });
  });

  it('enable remote storage for a an existing account', async () => {
    await expect(initRemoteStorage('test_account@gmail.com'))
      .resolves
      .toBeTruthy();
    expect(settings.remoteSave).toStrictEqual({
      account: 'test_account@gmail.com',
      enabled: true,
      sheetId: '123456789',
    });
  });

  it('trying to enable remote storage but an error occurred', async () => {
    googleCredentials.private_key = 'WRONG_PRIVATE_KEY';
    await expect(initRemoteStorage('test_account@gmail.com'))
      .rejects
      .toBeFalsy();
    expect(settings.remoteSave).toStrictEqual({
      account: '',
      enabled: false,
      sheetId: '',
    });
  });

  it('get talismans from remote storage', async () => {
    await initRemoteStorage('test_account@gmail.com');
    await expect(getTalismansFromRemoteStorage())
      .resolves
      .toStrictEqual({
        talismans: [
          new Talisman({
            primarySkillId: 'speed-sharpening',
            primarySkillLevel: 2,
            slotsId: '2-0-0',
            favorite: true,
          }),
          new Talisman({
            primarySkillId: 'blast-resistance',
            primarySkillLevel: 2,
            slotsId: '1-1-0',
            forMelding: true,
          }),
          new Talisman({
            primarySkillId: 'bombardier',
            primarySkillLevel: 2,
            secondarySkillId: 'paralysis-resistance',
            secondarySkillLevel: 1,
            slotsId: '1-0-0',
            favorite: true,
          }),
        ],
        updatedAt: _now(),
      });
  });

  it('an error occurred when getting talismans from remote storage', async () => {
    await initRemoteStorage('test_account@gmail.com');
    settings.remoteSave.sheetId = 'bad_sheet_id';
    await expect(getTalismansFromRemoteStorage())
      .resolves
      .toStrictEqual({
        talismans: [],
        updatedAt: null,
      });
  });

  it('update talismans from remote storage', async () => {
    await initRemoteStorage('test_account@gmail.com');
    await expect(updateTalismansFromRemoteStorage(JSON.stringify({
      talismans: [
        new Talisman({
          primarySkillId: 'speed-sharpening',
          primarySkillLevel: 2,
          slotsId: '2-0-0',
          favorite: false,
        }),
        new Talisman({
          primarySkillId: 'blast-resistance',
          primarySkillLevel: 2,
          slotsId: '1-1-0',
          forMelding: true,
        }),
        new Talisman({
          primarySkillId: 'bombardier',
          primarySkillLevel: 2,
          secondarySkillId: 'paralysis-resistance',
          secondarySkillLevel: 1,
          slotsId: '1-0-0',
          favorite: true,
        }),
      ],
      updatedAt: _now(),
    })))
      .resolves
      .toBeTruthy();
  });

  it('synchronizing data with remote storage data where there is no local data', async () => {
    await initRemoteStorage('test_account@gmail.com');
    await synchronizeData();
    expect(talismanStore.talismans).toStrictEqual([
      new Talisman({
        primarySkillId: 'speed-sharpening',
        primarySkillLevel: 2,
        slotsId: '2-0-0',
        favorite: true,
      }),
      new Talisman({
        primarySkillId: 'blast-resistance',
        primarySkillLevel: 2,
        slotsId: '1-1-0',
        forMelding: true,
      }),
      new Talisman({
        primarySkillId: 'bombardier',
        primarySkillLevel: 2,
        secondarySkillId: 'paralysis-resistance',
        secondarySkillLevel: 1,
        slotsId: '1-0-0',
        favorite: true,
      }),
    ]);
  });

  it('synchronizing data with remote storage data is more recent than local', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    localforage.__setMockData__(JSON.stringify({
      talismans: [
        new Talisman({
          primarySkillId: 'speed-sharpening',
          primarySkillLevel: 2,
          slotsId: '2-0-0',
          favorite: true,
        })],
      updatedAt: 7,
    }));
    settings.remoteSave = {
      account: 'test_account@gmail.com',
      enabled: true,
      sheetId: '123456789',
    };
    await synchronizeData();
    expect(talismanStore.talismans).toStrictEqual([
      new Talisman({
        primarySkillId: 'speed-sharpening',
        primarySkillLevel: 2,
        slotsId: '2-0-0',
        favorite: true,
      }),
      new Talisman({
        primarySkillId: 'blast-resistance',
        primarySkillLevel: 2,
        slotsId: '1-1-0',
        forMelding: true,
      }),
      new Talisman({
        primarySkillId: 'bombardier',
        primarySkillLevel: 2,
        secondarySkillId: 'paralysis-resistance',
        secondarySkillLevel: 1,
        slotsId: '1-0-0',
        favorite: true,
      }),
    ]);
  });

  it('synchronizing data with local storage data is more recent than remote', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    localforage.__setMockData__(JSON.stringify({ talismans: [], updatedAt: 1663882657460 }));
    settings.remoteSave = {
      account: 'test_account@gmail.com',
      enabled: true,
      sheetId: '123456789',
    };
    await synchronizeData();
    expect(Dialog.create).toHaveBeenCalledTimes(1);
  });
});
