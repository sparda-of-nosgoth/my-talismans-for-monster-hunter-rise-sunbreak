import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import {
  useTalismanValidator,
  useTemporaryTalismanValidator,
} from 'src/composables/talisman-validator';
import { ref } from 'vue';
import { now } from 'lodash';
import type { Talisman } from 'src/composables/talisman';
import { Skill } from 'src/composables/skill';
import { Slots } from 'src/composables/slots';
import { TranslateOptions } from '@intlify/core-base';
import type { TemporaryTalisman } from 'src/composables/talisman-import';

interface UpdateTalisman {
  skill1?: Skill | null
  skill1Level?: number
  skill2?: Skill | null
  skill2Level?: number
  slots?: Slots
}
interface UpdateTemporaryTalisman {
  skill1?: string;
  skill1Level?: number;
  skill2?: string | null;
  skill2Level?: number | null;
  slot1?: number
  slot2?: number
  slot3?: number
}

jest.mock('boot/i18n', () => ({
  i18n: {
    global: {
      locale: 'fr',
      availableLocales: ['en', 'fr'],
      t: jest.fn((key: string, defaultMsg: string, options: TranslateOptions) => {
        switch (key) {
          case 'capture-master':
            return options.locale === 'fr' ? 'Maître capture' : 'Capture Master';
          case 'hunger-resistance':
            return options.locale === 'fr' ? 'Spartiate' : 'Hunger Resistance';
          default:
            return defaultMsg;
        }
      }),
    },
  },
}));

describe('talisman-validator', () => {
  describe('useTalismanValidator', () => {
    const talisman = ref<Talisman>({
      id: now(),
      skill1: null,
      skill1Level: 1,
      skill2: null,
      skill2Level: 0,
      slots: {
        slot1: 0,
        slot2: 0,
        slot3: 0,
      },
      favorite: false,
      forMelting: false,
    });

    async function updateTalisman({
      skill1, skill1Level, skill2, skill2Level, slots,
    }: UpdateTalisman) {
      talisman.value.skill1 = skill1 ?? null;
      talisman.value.skill1Level = skill1Level ?? 0;
      talisman.value.skill2 = skill2 ?? null;
      talisman.value.skill2Level = skill2Level ?? 0;
      talisman.value.slots = slots ?? { slot1: 0, slot2: 0, slot3: 0 };
    }

    beforeEach(() => {
      talisman.value.skill1 = null;
      talisman.value.skill1Level = 0;
      talisman.value.skill2 = null;
      talisman.value.skill2Level = 0;
      talisman.value.slots = { slot1: 0, slot2: 0, slot3: 0 };
    });

    const { isValid, errors } = useTalismanValidator(talisman);

    it('can invalidate empty talisman', () => {
      expect(isValid.value).toBeFalsy();
      expect(errors.value).toStrictEqual({
        skill1: {
          isEmpty: true,
          notFound: false,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with null values for skill1Level, skill2, skill2Level', async () => {
      await updateTalisman({
        skill1: {
          id: 3,
          name: 'capture-master',
          type: 1,
          levelMaximum: 1,
          foundOnTalismans: false,
        },
      });
      expect(isValid.value).toBeFalsy();
      expect(errors.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can validate talisman with null values for skill2, skill2Level', async () => {
      await updateTalisman({
        skill1: {
          id: 3,
          name: 'capture-master',
          type: 1,
          levelMaximum: 1,
          foundOnTalismans: false,
        },
        skill1Level: 1,
      });
      expect(isValid.value).toBeTruthy();
      expect(errors.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with null values for skill2Level', async () => {
      await updateTalisman({
        skill1: {
          id: 3,
          name: 'capture-master',
          type: 1,
          levelMaximum: 1,
          foundOnTalismans: false,
        },
        skill1Level: 1,
        skill2: {
          id: 8,
          name: 'hunger-resistance',
          type: 1,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
      });
      expect(isValid.value).toBeFalsy();
      expect(errors.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with null values for skill2', async () => {
      await updateTalisman({
        skill1: {
          id: 3,
          name: 'capture-master',
          type: 1,
          levelMaximum: 1,
          foundOnTalismans: false,
        },
        skill1Level: 1,
        skill2Level: 2,
      });
      expect(isValid.value).toBeFalsy();
      expect(errors.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: true,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman which skill1Level greater than skill1.levelMaximum', async () => {
      await updateTalisman({
        skill1: {
          id: 3,
          name: 'capture-master',
          type: 1,
          levelMaximum: 1,
          foundOnTalismans: false,
        },
        skill1Level: 2,
      });
      expect(isValid.value).toBeFalsy();
      expect(errors.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: true,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman which skill2Level greater than skill2.levelMaximum', async () => {
      await updateTalisman({
        skill2: {
          id: 8,
          name: 'hunger-resistance',
          type: 1,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill2Level: 4,
      });
      expect(isValid.value).toBeFalsy();
      expect(errors.value).toStrictEqual({
        skill1: {
          isEmpty: true,
          notFound: false,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: true,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with unknown slots', async () => {
      await updateTalisman({
        slots: {
          slot1: 4,
          slot2: 4,
          slot3: 4,
        },
      });
      expect(isValid.value).toBeFalsy();
      expect(errors.value).toStrictEqual({
        skill1: {
          isEmpty: true,
          notFound: false,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: true,
        },
      });
    });

    it('can validate talisman', async () => {
      await updateTalisman({
        skill1: {
          id: 3,
          name: 'Capture Master',
          type: 1,
          levelMaximum: 1,
          foundOnTalismans: false,
        },
        skill1Level: 1,
        skill2: {
          id: 8,
          name: 'Spartiate',
          type: 1,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill2Level: 2,
        slots: {
          id: 6,
          slot1: 2,
          slot2: 1,
          slot3: 0,
        },
      });
      expect(isValid.value).toBeTruthy();
      expect(errors.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });
  });

  describe('useTemporaryTalismanValidator', () => {
    const talisman = ref<TemporaryTalisman>({
      skill1: null,
      skill1Level: 0,
      skill2: null,
      skill2Level: 0,
      slot1: 0,
      slot2: 0,
      slot3: 0,
    });

    async function updateTalisman({
      skill1, skill1Level, skill2, skill2Level, slot1, slot2, slot3,
    }: UpdateTemporaryTalisman) {
      talisman.value.skill1 = skill1 ?? null;
      talisman.value.skill1Level = skill1Level ?? 0;
      talisman.value.skill2 = skill2 ?? null;
      talisman.value.skill2Level = skill2Level ?? 0;
      talisman.value.slot1 = slot1 ?? 0;
      talisman.value.slot2 = slot2 ?? 0;
      talisman.value.slot3 = slot3 ?? 0;
    }

    beforeEach(() => {
      talisman.value.skill1 = null;
      talisman.value.skill1Level = 0;
      talisman.value.skill2 = null;
      talisman.value.skill2Level = 0;
      talisman.value.slot1 = 0;
      talisman.value.slot2 = 0;
      talisman.value.slot3 = 0;
    });

    const { talismanIsValid, errorsFromTalisman } = useTemporaryTalismanValidator(talisman);

    it('can invalidate empty talisman', () => {
      expect(talismanIsValid.value).toBeFalsy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: true,
          notFound: false,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with null values for skill1Level, skill2, skill2Level', async () => {
      await updateTalisman({
        skill1: 'Capture Master',
      });
      expect(talismanIsValid.value).toBeFalsy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can validate talisman with null values for skill2, skill2Level', async () => {
      await updateTalisman({
        skill1: 'Capture Master',
        skill1Level: 1,
      });
      expect(talismanIsValid.value).toBeTruthy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with null values for skill2', async () => {
      await updateTalisman({
        skill1: 'Capture Master',
        skill1Level: 1,
        skill2Level: 3,
      });
      expect(talismanIsValid.value).toBeFalsy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: true,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with null values for skill2Level', async () => {
      await updateTalisman({
        skill1: 'Capture Master',
        skill1Level: 1,
        skill2: 'Spartiate',
      });
      expect(talismanIsValid.value).toBeFalsy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman which skill1Level greater than skill1.levelMaximum', async () => {
      await updateTalisman({
        skill1: 'Capture Master',
        skill1Level: 2,
      });
      expect(talismanIsValid.value).toBeFalsy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: true,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman which skill2Level greater than skill2.levelMaximum', async () => {
      await updateTalisman({
        skill2: 'Spartiate',
        skill2Level: 4,
      });
      expect(talismanIsValid.value).toBeFalsy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: true,
          notFound: false,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: true,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with unknown skill1', async () => {
      await updateTalisman({
        skill1: 'unknown-name',
      });
      expect(talismanIsValid.value).toBeFalsy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: true,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with unknown skill2', async () => {
      await updateTalisman({
        skill2: 'unknown-name',
      });
      expect(talismanIsValid.value).toBeFalsy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: true,
          notFound: false,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: true,
        },
        skill2Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });

    it('can invalidate talisman with unknown slots', async () => {
      await updateTalisman({
        slot1: 4,
        slot2: 4,
        slot3: 4,
      });
      expect(talismanIsValid.value).toBeFalsy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: true,
          notFound: false,
        },
        skill1Level: {
          isEmpty: true,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: true,
        },
      });
    });

    it('can validate talisman', async () => {
      await updateTalisman({
        skill1: 'Capture Master',
        skill1Level: 1,
        skill2: 'Spartiate',
        skill2Level: 2,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      });
      expect(talismanIsValid.value).toBeTruthy();
      expect(errorsFromTalisman.value).toStrictEqual({
        skill1: {
          isEmpty: false,
          notFound: false,
        },
        skill1Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        skill2: {
          isEmpty: false,
          notFound: false,
        },
        skill2Level: {
          isEmpty: false,
          exceedsMaximum: false,
        },
        slots: {
          notFound: false,
        },
      });
    });
  });
});
