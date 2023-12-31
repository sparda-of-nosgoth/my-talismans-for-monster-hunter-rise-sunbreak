import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { translate, translateInEn, searchInLocales } from 'src/utils/translation';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('utils/translation', () => {
  it('can translate in current locale', () => {
    expect(typeof translate).toBe('function');
    expect(translate('quest')).toBe('Quête');
    expect(translate(null)).toBe('');
  });

  it('can translate in current English', () => {
    expect(typeof translateInEn).toBe('function');
    expect(translateInEn('quest')).toBe('Quest');
    expect(translateInEn(null)).toBe('');
  });

  it('can search if a translation exist in each locales', () => {
    expect(typeof searchInLocales).toBe('function');
    expect(searchInLocales('quest', 'Quête')).toBeTruthy();
    expect(searchInLocales('quest', 'Quest')).toBeTruthy();
    expect(searchInLocales('quest', 'Suche')).toBeFalsy();
    expect(searchInLocales('quest', 'Búsqueda')).toBeFalsy();
  });
});
