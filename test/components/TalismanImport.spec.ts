import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import TalismanImport from 'components/TalismanImport.vue';
import TalismanImportListError from 'components/TalismanImportListError.vue';
import { Notify, QBtn, QInput } from 'quasar';
import { TranslateOptions } from '@intlify/core-base';
import { piniaMocked } from 'app/test/mocks/pinia';
import _now from 'lodash/now';
import { i18nMocked } from '../mocks/i18n';

installQuasarPlugin({ plugins: { Notify } });

jest.mock('boot/i18n', () => ({
  i18n: {
    global: {
      locale: 'fr',
      availableLocales: ['en', 'fr'],
      t: jest.fn((key: string, defaultMsg: string, options: TranslateOptions) => i18nMocked.global.t(key, defaultMsg, options)),
    },
  },
}));

jest.mock('localforage', () => ({
  getItem: jest.fn(() => new Promise((resolve, reject) => { reject(null); })),
  setItem: jest.fn((key, value) => new Promise((resolve) => { resolve(value); })),
}));

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-07-26').getTime());

describe('components/TalismanImport', () => {
  config.global.mocks.$t = i18nMocked.global.t;
  config.global.plugins = [...config.global.plugins, i18nMocked];

  it('sets the correct default data', () => {
    const { vm } = shallowMount(TalismanImport, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    expect(vm.talismanList).toStrictEqual('');
    expect(vm.submitDisabled).toStrictEqual(true);
  });

  it('has a function to submitImport', () => {
    const { vm } = shallowMount(TalismanImport, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    expect(typeof vm.submitImport).toBe('function');
  });

  it('update talismanList when input change', () => {
    const wrapper = mount(TalismanImport, {
      global: {
        plugins: [piniaMocked()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    textarea.setValue('Affûtage rapide,1,Mise à mort,1,0,0,0');
    expect(vm.talismanList).toStrictEqual('Affûtage rapide,1,Mise à mort,1,0,0,0');
  });

  it('can\'t submit with empty data', async () => {
    const wrapper = mount(TalismanImport, {
      global: {
        plugins: [piniaMocked()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue('');
    const submit = wrapper.getComponent(QBtn);
    expect(submit.vm.$el.disabled).toBeTruthy();
    expect(vm.talismanList).toStrictEqual('');
    expect(vm.talismansToImport).toStrictEqual([]);
  });

  it('can\'t submit with no valid talismans to import', async () => {
    const wrapper = mount(TalismanImport, {
      global: {
        plugins: [piniaMocked()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue('Affoûtage rapide,1,Mise à mort,1,0,0,0');
    const submit = wrapper.getComponent(QBtn);
    expect(submit.vm.$el.disabled).toBeTruthy();
    expect(vm.talismanList).toStrictEqual('Affoûtage rapide,1,Mise à mort,1,0,0,0');
    expect(vm.talismansToImport).toStrictEqual([]);
  });

  it('can submit when talismanList contain valid data', async () => {
    const wrapper = mount(TalismanImport, {
      global: {
        plugins: [piniaMocked()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue('Affûtage rapide,1,Mise à mort,1,0,0,0');
    const submit = wrapper.getComponent(QBtn);
    expect(submit.vm.$el.disabled).toBeFalsy();
    expect(vm.talismanList).toStrictEqual('Affûtage rapide,1,Mise à mort,1,0,0,0');
    expect(vm.talismansToImport.length).toBe(1);
  });

  it('display number of talismans to import', async () => {
    const wrapper = mount(TalismanImport, {
      global: {
        plugins: [piniaMocked()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue(''
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
      + 'Agitator,2,,,2,1,0');
    expect(vm.$el.textContent).toContain('3 talismans seront importés.');
  });

  it('display errors with invalid talismans', async () => {
    const wrapper = mount(TalismanImport, {
      global: {
        plugins: [piniaMocked()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue(''
      + ',1,Weakness Exploit,1,0,0,0\r\n'
      + 'Speed,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Speed Sharpening,1,,1,0,0,0\r\n'
      + 'Speed Sharpening,1,Exploit,1,0,0,0\r\n'
      + 'Speed Sharpening,1,Weakness Exploit,4,0,0,0\r\n'
      + 'Master Mounter,,Slugger,1,1,1,0\r\n'
      + 'Master Mounter,1,Slugger,,1,1,0\r\n'
      + 'Master Mounter,8,Slugger,1,1,1,0\r\n'
      + 'Agitator,2,,,4,4,4');
    expect(vm.$el.textContent).toContain('Aucun talisman ne sera importé.');
    const talismanImportListErrors = wrapper.findAllComponents(TalismanImportListError);
    expect(talismanImportListErrors[0].vm.$el.textContent).toContain('Le talent principal n\'existe pas pour le talisman suivant :');
    expect(talismanImportListErrors[0].vm.$el.textContent).toContain('Speed,1,Weakness Exploit,1,0,0,0');
    expect(talismanImportListErrors[1].vm.$el.textContent).toContain('Le talent principal ne peut être vide pour le talisman suivant :');
    expect(talismanImportListErrors[1].vm.$el.textContent).toContain(',1,Weakness Exploit,1,0,0,0');
    expect(talismanImportListErrors[2].vm.$el.textContent).toContain('Le niveau du talent principal ne peut être vide ou zéro pour le talisman suivant :');
    expect(talismanImportListErrors[2].vm.$el.textContent).toContain('Master Mounter,,Slugger,1,1,1,0');
    expect(talismanImportListErrors[3].vm.$el.textContent).toContain('Le niveau du talent principal est supérieur au niveau maximum pour ce talent pour le talisman suivant :');
    expect(talismanImportListErrors[3].vm.$el.textContent).toContain('Master Mounter,8,Slugger,1,1,1,0');
    expect(talismanImportListErrors[4].vm.$el.textContent).toContain('Le talent secondaire n\'existe pas pour le talisman suivant :');
    expect(talismanImportListErrors[4].vm.$el.textContent).toContain('Speed Sharpening,1,Exploit,1,0,0,0');
    expect(talismanImportListErrors[5].vm.$el.textContent).toContain('Le talent secondaire ne peut être vide (son niveau étant renseigné) pour le talisman suivant :');
    expect(talismanImportListErrors[5].vm.$el.textContent).toContain('Speed Sharpening,1,,1,0,0,0');
    expect(talismanImportListErrors[6].vm.$el.textContent).toContain('Le niveau du talent secondaire ne peut être vide ou zéro pour le talisman suivant :');
    expect(talismanImportListErrors[6].vm.$el.textContent).toContain('Master Mounter,1,Slugger,,1,1,0');
    expect(talismanImportListErrors[7].vm.$el.textContent).toContain('Le niveau du talent secondaire est supérieur au niveau maximum pour ce talent pour le talisman suivant :');
    expect(talismanImportListErrors[7].vm.$el.textContent).toContain('Speed Sharpening,1,Weakness Exploit,4,0,0,0');
    expect(talismanImportListErrors[8].vm.$el.textContent).toContain('L\'emplacement n\'existe pas pour le talisman suivant :');
    expect(talismanImportListErrors[8].vm.$el.textContent).toContain('Agitator,2,,,4,4,4');
  });

  it('update store when form is submitted', async () => {
    const wrapper = mount(TalismanImport, {
      global: {
        plugins: [piniaMocked()],
      },
    });
    const { vm } = wrapper;

    expect(vm.talismanStore.talismans.length).toBe(2);
    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue(''
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
      + 'Agitator,2,,,2,1,0');
    const submit = wrapper.getComponent(QBtn);
    await submit.trigger('click');
    expect(vm.talismansToImport).toStrictEqual([
      {
        id: _now(),
        skill1: {
          id: 92,
          name: 'speed-sharpening',
          type: 7,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill1Level: 1,
        skill2: {
          id: 84,
          name: 'weakness-exploit',
          type: 6,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill2Level: 1,
        slots: {
          id: 1,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
      {
        id: _now(),
        skill1: {
          id: 73,
          name: 'master-mounter',
          type: 6,
          levelMaximum: 1,
          foundOnTalismans: true,
        },
        skill1Level: 1,
        skill2: {
          id: 82,
          name: 'slugger',
          type: 6,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill2Level: 1,
        slots: {
          id: 3,
          slot1: 1,
          slot2: 1,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
      {
        id: _now(),
        skill1: {
          id: 60,
          name: 'agitator',
          type: 6,
          levelMaximum: 5,
          foundOnTalismans: true,
        },
        skill1Level: 2,
        skill2: null,
        skill2Level: null,
        slots: {
          id: 6,
          slot1: 2,
          slot2: 1,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
    ]);
    expect(vm.talismanStore.talismans.length).toBe(5);
    expect(vm.talismanStore.talismans).toStrictEqual([
      {
        id: _now(),
        skill1: {
          id: 84,
          name: 'weakness-exploit',
          type: 6,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill1Level: 2,
        skill2: null,
        skill2Level: null,
        slots: {
          id: 6,
          slot1: 2,
          slot2: 1,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
      {
        id: _now(),
        skill1: {
          id: 36,
          name: 'attack-boost',
          type: 3,
          levelMaximum: 7,
          foundOnTalismans: true,
        },
        skill1Level: 2,
        skill2: {
          id: 82,
          name: 'slugger',
          type: 6,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill2Level: 1,
        slots: {
          id: 3,
          slot1: 1,
          slot2: 1,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
      {
        id: _now(),
        skill1: {
          id: 92,
          name: 'speed-sharpening',
          type: 7,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill1Level: 1,
        skill2: {
          id: 84,
          name: 'weakness-exploit',
          type: 6,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill2Level: 1,
        slots: {
          id: 1,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
      {
        id: _now(),
        skill1: {
          id: 73,
          name: 'master-mounter',
          type: 6,
          levelMaximum: 1,
          foundOnTalismans: true,
        },
        skill1Level: 1,
        skill2: {
          id: 82,
          name: 'slugger',
          type: 6,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill2Level: 1,
        slots: {
          id: 3,
          slot1: 1,
          slot2: 1,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
      {
        id: _now(),
        skill1: {
          id: 60,
          name: 'agitator',
          type: 6,
          levelMaximum: 5,
          foundOnTalismans: true,
        },
        skill1Level: 2,
        skill2: null,
        skill2Level: null,
        slots: {
          id: 6,
          slot1: 2,
          slot2: 1,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
    ]);
  });
});
