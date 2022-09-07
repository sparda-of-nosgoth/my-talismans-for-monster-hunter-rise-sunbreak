import {
  afterEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { config } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { i18n } from 'boot/i18n';
import { GoogleSheets } from 'src/utils/google-sheets';
import { remoteSaveSpreadsheetId } from 'boot/config';
import { googleCredentials } from 'boot/google-api';
import { Talisman } from 'src/models/talisman';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';
import _now from 'lodash/now';

installQuasarPlugin();

jest.mock('boot/config');
jest.mock('boot/google-api');
jest.mock('boot/i18n');

describe('utils/remote-storage', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  afterEach(() => {
    googleCredentials.private_key = 'VITE_GOOGLE_CREDENTIALS_PRIVATE_KEY';
    jest.clearAllMocks();
  });

  it('wrong credentials', async () => {
    googleCredentials.private_key = 'WRONG_PRIVATE_KEY';
    const googleSheets = new GoogleSheets({
      serviceAccountCredentials: googleCredentials,
      spreadSheetId: remoteSaveSpreadsheetId,
    });

    expect.assertions(2);
    try {
      await googleSheets.getSpreadsheet();
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect((e as Error).name).toBe('AxiosError');
      // eslint-disable-next-line jest/no-conditional-expect
      expect((e as Error).message).toBe('Request failed with status code 400');
    }
  });

  it('has a function to get spreadsheet data', async () => {
    const googleSheets = new GoogleSheets({
      serviceAccountCredentials: googleCredentials,
      spreadSheetId: remoteSaveSpreadsheetId,
    });
    await expect(googleSheets.getSpreadsheet())
      .resolves
      .toStrictEqual({
        sheets: [
          {
            properties: {
              sheetId: '123456789',
              title: 'test_account@gmail.com',
            },
          },
          {
            properties: {
              sheetId: '987654321',
              title: 'another_test_account@gmail.com',
            },
          },
        ],
      });
  });

  it('has a function to create a new sheet', async () => {
    const googleSheets = new GoogleSheets({
      serviceAccountCredentials: googleCredentials,
      spreadSheetId: remoteSaveSpreadsheetId,
    });
    await expect(googleSheets.createSheet('new_account@gmail.com'))
      .resolves
      .toStrictEqual({
        title: 'new_account@gmail.com',
        sheetId: '654987123',
      });
  });

  it('has a function to get sheet values', async () => {
    const googleSheets = new GoogleSheets({
      serviceAccountCredentials: googleCredentials,
      spreadSheetId: remoteSaveSpreadsheetId,
    });
    const values = JSON.stringify({
      talismans: [
        new Talisman({
          skill1: getSkillById('speed-sharpening'),
          skill1Level: 2,
          slots: getSlotsById('2-0-0'),
          favorite: true,
        }),
        new Talisman({
          skill1: getSkillById('blast-resistance'),
          skill1Level: 2,
          slots: getSlotsById('1-1-0'),
          forMelding: true,
        }),
        new Talisman({
          skill1: getSkillById('bombardier'),
          skill1Level: 2,
          skill2: getSkillById('paralysis-resistance'),
          skill2Level: 1,
          slots: getSlotsById('1-0-0'),
          favorite: true,
        }),
      ],
      updatedAt: _now(),
    });
    await expect(googleSheets.getSheetValues('123456789'))
      .resolves
      .toStrictEqual([['mhrs-talismans', values]]);
  });

  it('has a function to update sheet values', async () => {
    const googleSheets = new GoogleSheets({
      serviceAccountCredentials: googleCredentials,
      spreadSheetId: remoteSaveSpreadsheetId,
    });
    const values = JSON.stringify({
      talismans: [
        new Talisman({
          skill1: getSkillById('speed-sharpening'),
          skill1Level: 2,
          slots: getSlotsById('2-0-0'),
          favorite: false,
        }),
        new Talisman({
          skill1: getSkillById('blast-resistance'),
          skill1Level: 2,
          slots: getSlotsById('1-1-0'),
          forMelding: true,
        }),
        new Talisman({
          skill1: getSkillById('bombardier'),
          skill1Level: 2,
          skill2: getSkillById('paralysis-resistance'),
          skill2Level: 1,
          slots: getSlotsById('1-0-0'),
          favorite: true,
        }),
      ],
      updatedAt: _now(),
    });
    await expect(googleSheets.updateSheetValues('123456789', [['mhrs-talismans', values]]))
      .resolves
      .toStrictEqual({
        dataFilter: {
          gridRange: { sheetId: 123456789 },
        },
        updatedCells: 2,
        updatedColumns: 2,
        updatedRange: "'test_account@gmail.com'!A1:B1",
        updatedRows: 1,
      });
    expect(true).toBeTruthy();
  });
});
