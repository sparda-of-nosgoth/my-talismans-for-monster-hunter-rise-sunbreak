import {
  beforeEach,
  describe, expect, it,
} from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';
import { useManagerStore } from 'stores/manager';

describe('stores/manager', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('toggle settings drawer', () => {
    const { toggleSettings, drawers } = useManagerStore();
    expect(drawers.showSettings).toBeFalsy();
    toggleSettings();
    expect(drawers.showSettings).toBeTruthy();
  });

  it('toggle help dialog', () => {
    const { toggleHelp, dialogs } = useManagerStore();
    expect(dialogs.showHelp).toBeFalsy();
    toggleHelp();
    expect(dialogs.showHelp).toBeTruthy();
  });

  it('toggle import export dialog', () => {
    const { toggleImportExport, dialogs } = useManagerStore();
    expect(dialogs.showImportExport).toBeFalsy();
    toggleImportExport();
    expect(dialogs.showImportExport).toBeTruthy();
  });

  it('toggle talisman\'s form dialog', () => {
    const { toggleTalismanForm, dialogs } = useManagerStore();
    expect(dialogs.showTalismanForm).toBeFalsy();
    toggleTalismanForm();
    expect(dialogs.showTalismanForm).toBeTruthy();
  });
});
