import { GoogleSheets } from 'src/utils/google-sheets';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import { useSettingsStore } from 'stores/settings';
import { TalismansStorage } from 'src/utils/data-storage';
import { googleCredentials } from 'boot/google-api';
import { remoteSaveSpreadsheetId } from 'boot/config';
import { useTalismanStore } from 'stores/talismans';
import localforage from 'localforage';
import { Dialog } from 'quasar';
import SettingsRemoteSaveDiffDialog from 'components/SettingsRemoteSaveConflictDialog.vue';
import { Talisman } from 'src/models/talisman';
import _map from 'lodash/map';

const TALISMANS_INDEX = 'mhrs-talismans';

export async function getTalismansFromRemoteStorage(): Promise<TalismansStorage> {
  const { remoteSave } = useSettingsStore();
  const googleSheetsApi = new GoogleSheets({
    serviceAccountCredentials: googleCredentials,
    spreadSheetId: remoteSaveSpreadsheetId,
  });

  try {
    const [[, data]] = await googleSheetsApi.getSheetValues(remoteSave.sheetId);

    return new Promise((resolve) => {
      const remoteStorage = JSON.parse(data);
      resolve({
        talismans: _map(remoteStorage.talismans, (talisman) => new Talisman(talisman)),
        updatedAt: remoteStorage.updatedAt,
      });
    });
  } catch {
    return new Promise((resolve) => {
      resolve({
        talismans: [],
        updatedAt: null,
      });
    });
  }
}

export async function updateTalismansFromRemoteStorage(values: string): Promise<boolean> {
  const { remoteSave } = useSettingsStore();
  const googleSheetsApi = new GoogleSheets({
    serviceAccountCredentials: googleCredentials,
    spreadSheetId: remoteSaveSpreadsheetId,
  });

  const response = await googleSheetsApi.updateSheetValues(remoteSave.sheetId, [[TALISMANS_INDEX, values]]);

  return new Promise((resolve) => { resolve(response.updatedRows); });
}

export async function synchronizeData() {
  const talismanStore = useTalismanStore();

  const localStorage = JSON.parse(await localforage.getItem<string>('mhrs-talismans') || '{ "talismans": [] }');

  const remoteStorage = await getTalismansFromRemoteStorage();

  // If remoteStorage data is more recent, then remoteStorage erase localStorage
  if (remoteStorage.updatedAt && (!localStorage.updatedAt || remoteStorage.updatedAt > localStorage.updatedAt)) {
    talismanStore.loadTalismans(remoteStorage.talismans);
    // If localStorage data is more recent, then a diff is done to merge data, and update remote
  } else if (localStorage.updatedAt && (!remoteStorage.updatedAt || remoteStorage.updatedAt < localStorage.updatedAt)) {
    Dialog.create({
      component: SettingsRemoteSaveDiffDialog,
      componentProps: {
        remoteStorage, localStorage,
      },
    }).onOk((storage) => {
      talismanStore.loadTalismans(storage.talismans);
    });
  }
}

export async function initRemoteStorage(account: string): Promise<boolean> {
  const settings = useSettingsStore();

  const googleSheetsApi = new GoogleSheets({
    serviceAccountCredentials: googleCredentials,
    spreadSheetId: remoteSaveSpreadsheetId,
  });

  let sheetId = '';
  let enabled = false;
  try {
    const response = await googleSheetsApi.getSpreadsheet();
    // find if account's sheet already exists
    const [accountSheet] = _filter(response.sheets, (sheet) => sheet.properties.title === account);
    // if no sheet was found, we create a new sheet with account as sheet's title
    if (_isEmpty(accountSheet)) {
      const sheetResponse = await googleSheetsApi.createSheet(account);
      sheetId = sheetResponse.sheetId;
    } else {
      // else we get sheet id
      sheetId = accountSheet.properties.sheetId;
    }

    // Remote saving can be enabled
    settings.enableRemoteSave({ account, sheetId });
    enabled = true;
    // finally we synchronize data between local and remote saves
    await synchronizeData();
  } catch (e) {
    // if an error occur, remote save is disabled
    settings.disableRemoteSave();
    enabled = false;
  }

  return new Promise((resolve, reject) => {
    if (enabled) {
      resolve(enabled);
    } else {
      reject(enabled);
    }
  });
}
