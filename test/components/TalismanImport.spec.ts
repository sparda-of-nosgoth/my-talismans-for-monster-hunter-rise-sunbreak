import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import TalismanImport from 'components/TalismanImport.vue';
import TalismanImportListError from 'components/TalismanImportListError.vue';
import { Notify, QBtn, QInput } from 'quasar';
import { i18n } from 'boot/i18n';
import { initFakeTimers } from 'app/test/mocks';
import { createTestingPinia } from '@pinia/testing';
import { Talisman } from 'src/models/talisman';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';

installQuasarPlugin({ plugins: { Notify } });
initFakeTimers();

jest.mock('boot/i18n');

const notifyMocked = jest.fn();
// To test export to file and notification, exportFile and useQuasar needs to be mocked
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

describe('components/TalismanImport', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  it('sets the correct default data', () => {
    const { vm } = shallowMount(TalismanImport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(vm.talismanList).toStrictEqual('');
    expect(vm.submitDisabled).toStrictEqual(true);
  });

  it('has a function to submitImport', () => {
    const { vm } = shallowMount(TalismanImport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(typeof vm.submitImport).toBe('function');
  });

  it('update talismanList when input change', () => {
    const wrapper = mount(TalismanImport, {
      global: {
        plugins: [createTestingPinia()],
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
        plugins: [createTestingPinia()],
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
        plugins: [createTestingPinia()],
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
        plugins: [createTestingPinia()],
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
    const wrapper = mount(TalismanImport, {
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
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const { vm } = wrapper;

    expect(vm.talismanStore.talismans.length).toBe(0);
    const textarea = wrapper.getComponent(QInput);
    await textarea.setValue(''
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
      + 'Agitator,2,,,2,1,0');
    const submit = wrapper.getComponent(QBtn);
    await submit.trigger('click');
    expect(vm.talismansToImport).toStrictEqual([
      new Talisman({
        skill1: getSkillById('speed-sharpening'),
        skill1Level: 1,
        skill2: getSkillById('weakness-exploit'),
        skill2Level: 1,
        slots: getSlotsById('0-0-0'),
      }),
      new Talisman({
        skill1: getSkillById('master-mounter'),
        skill1Level: 1,
        skill2: getSkillById('slugger'),
        skill2Level: 1,
        slots: getSlotsById('1-1-0'),
      }),
      new Talisman({
        skill1: getSkillById('agitator'),
        skill1Level: 2,
        slots: getSlotsById('2-1-0'),
      }),
    ]);
    expect(vm.talismanStore.talismans.length).toBe(3);
    expect(vm.talismanStore.talismans).toStrictEqual([
      new Talisman({
        skill1: getSkillById('speed-sharpening'),
        skill1Level: 1,
        skill2: getSkillById('weakness-exploit'),
        skill2Level: 1,
        slots: getSlotsById('0-0-0'),
      }),
      new Talisman({
        skill1: getSkillById('master-mounter'),
        skill1Level: 1,
        skill2: getSkillById('slugger'),
        skill2Level: 1,
        slots: getSlotsById('1-1-0'),
      }),
      new Talisman({
        skill1: getSkillById('agitator'),
        skill1Level: 2,
        slots: getSlotsById('2-1-0'),
      }),
    ]);
  });
});
