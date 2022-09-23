import {
  beforeEach,
  describe, expect, it,
} from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';
import { useSettingsStore } from 'stores/settings';

describe('stores/settings', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('set defaults state values', () => {
    const settings = useSettingsStore();
    expect(settings.$state).toStrictEqual({
      locale: 'fr',
      remoteSave: {
        account: '',
        enabled: false,
        sheetId: '',
      },
    });
  });

  it('enable remote save', () => {
    const settings = useSettingsStore();

    expect(settings.remoteSave).toStrictEqual({
      account: '',
      enabled: false,
      sheetId: '',
    });
    settings.enableRemoteSave({ account: 'test_account@gmail.com', sheetId: '1234567890987654321' });
    expect(settings.remoteSave).toStrictEqual({
      account: 'test_account@gmail.com',
      enabled: true,
      sheetId: '1234567890987654321',
    });
  });

  it('disable remote save', () => {
    const settings = useSettingsStore();

    expect(settings.remoteSave).toStrictEqual({
      account: '',
      enabled: false,
      sheetId: '',
    });
    settings.enableRemoteSave({ account: 'test_account@gmail.com', sheetId: '1234567890987654321' });
    expect(settings.remoteSave).toStrictEqual({
      account: 'test_account@gmail.com',
      enabled: true,
      sheetId: '1234567890987654321',
    });
    settings.disableRemoteSave();
    expect(settings.remoteSave).toStrictEqual({
      account: '',
      enabled: false,
      sheetId: '',
    });
  });

  it('update locale value', () => {
    const settings = useSettingsStore();

    expect(settings.locale).toBe('fr');
    settings.updateLocale('en');
    expect(settings.locale).toBe('en');
  });
});
