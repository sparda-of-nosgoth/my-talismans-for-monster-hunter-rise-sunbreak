import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import ManagerImport from 'components/ManagerImport.vue';
import ManagerImportListError from 'components/ManagerImportListError.vue';
import { Notify, QBtn, QInput } from 'quasar';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';
import { Talisman } from 'src/models/talisman';

installQuasarPlugin({ plugins: { Notify } });

jest
  .setSystemTime(new Date('2022-07-26').getTime());

jest.mock('boot/i18n');

const notifyMocked = jest.fn();
// To test notification, useQuasar needs to be mocked
jest.mock('quasar', () => {
  // Original functions and props, used to get normal use of Quasar, and mock only few functions.
  const original = jest.requireActual('quasar') as Record<string, unknown>;
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
    useQuasar: jest.fn(() => ({
      notify: notifyMocked,
    })),
  };
});

describe('components/ManagerImport', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('sets the correct default data', () => {
    const { vm } = shallowMount(ManagerImport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(vm.talismanList).toBe('');
    expect(vm.submitDisabled).toBe(true);
  });

  it('update talismanList when input change', () => {
    const wrapper = mount(ManagerImport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    textarea.setValue('Affûtage rapide,1,Mise à mort,1,0,0,0');
    expect(vm.talismanList).toBe('Affûtage rapide,1,Mise à mort,1,0,0,0');
  });

  it('can\'t submit with empty data', async () => {
    const wrapper = mount(ManagerImport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue('');
    const submit = wrapper.getComponent(QBtn);
    expect(submit.vm.$el.disabled).toBeTruthy();
    expect(vm.talismanList).toBe('');
    expect(vm.talismansToImport).toStrictEqual([]);
  });

  it('can\'t submit with no valid talismans to import', async () => {
    const wrapper = mount(ManagerImport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue('Affoûtage rapide,1,Mise à mort,1,0,0,0');
    const submit = wrapper.getComponent(QBtn);
    expect(submit.vm.$el.disabled).toBeTruthy();
    expect(vm.talismanList).toBe('Affoûtage rapide,1,Mise à mort,1,0,0,0');
    expect(vm.talismansToImport).toStrictEqual([]);
  });

  it('can submit when talismanList contain valid data', async () => {
    const wrapper = mount(ManagerImport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const { vm } = wrapper;

    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue('Affûtage rapide,1,Mise à mort,1,0,0,0');
    const submit = wrapper.getComponent(QBtn);
    expect(submit.vm.$el.disabled).toBeFalsy();
    expect(vm.talismanList).toBe('Affûtage rapide,1,Mise à mort,1,0,0,0');
    expect(vm.talismansToImport).toHaveLength(1);
  });

  it('display number of talismans to import', async () => {
    const wrapper = mount(ManagerImport, {
      global: {
        plugins: [createTestingPinia()],
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
    const wrapper = mount(ManagerImport, {
      global: {
        plugins: [createTestingPinia()],
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
    const talismanImportListErrors = wrapper.findAllComponents(ManagerImportListError);
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
    const wrapper = mount(ManagerImport, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const { vm } = wrapper;

    expect(vm.talismanStore.talismans).toHaveLength(0);
    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue(''
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
      + 'Agitator,2,,,2,1,0');
    const submit = wrapper.getComponent(QBtn);
    await submit.trigger('click');
    expect(vm.talismansToImport).toStrictEqual([
      new Talisman({
        primarySkillId: 'speed-sharpening',
        primarySkillLevel: 1,
        secondarySkillId: 'weakness-exploit',
        secondarySkillLevel: 1,
        slotsId: '0-0-0',
      }),
      new Talisman({
        primarySkillId: 'master-mounter',
        primarySkillLevel: 1,
        secondarySkillId: 'slugger',
        secondarySkillLevel: 1,
        slotsId: '1-1-0',
      }),
      new Talisman({
        primarySkillId: 'agitator',
        primarySkillLevel: 2,
        slotsId: '2-1-0',
      }),
    ]);
    expect(vm.talismanStore.talismans).toHaveLength(3);
    expect(vm.talismanStore.talismans).toStrictEqual([
      new Talisman({
        primarySkillId: 'speed-sharpening',
        primarySkillLevel: 1,
        secondarySkillId: 'weakness-exploit',
        secondarySkillLevel: 1,
        slotsId: '0-0-0',
      }),
      new Talisman({
        primarySkillId: 'master-mounter',
        primarySkillLevel: 1,
        secondarySkillId: 'slugger',
        secondarySkillLevel: 1,
        slotsId: '1-1-0',
      }),
      new Talisman({
        primarySkillId: 'agitator',
        primarySkillLevel: 2,
        slotsId: '2-1-0',
      }),
    ]);
  });
});
