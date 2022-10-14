import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import {
  useTalismanValidator,
  useTemporaryTalismanValidator,
} from 'src/composables/talisman-validator';
import { ref } from 'vue';
import { Talisman, TemporaryTalisman } from 'src/models/talisman';

interface UpdateTalisman {
  primarySkillId?: string
  primarySkillLevel?: number
  secondarySkillId?: string | null
  secondarySkillLevel?: number
  slotsId?: string
}
interface UpdateTemporaryTalisman {
  primarySkillName?: string;
  primarySkillLevel?: number;
  secondarySkillName?: string | null;
  secondarySkillLevel?: number | null;
  slot1?: number
  slot2?: number
  slot3?: number
}

jest.mock('boot/i18n');

describe('composables/talisman-validator', () => {
  describe('useTalismanValidator', () => {
    describe('with ref', () => {
      const talisman = ref<Talisman>(new Talisman({}));

      async function updateTalisman({
        primarySkillId, primarySkillLevel, secondarySkillId, secondarySkillLevel, slotsId,
      }: UpdateTalisman) {
        talisman.value.primarySkillId = primarySkillId ?? null;
        talisman.value.primarySkillLevel = primarySkillLevel ?? 0;
        talisman.value.secondarySkillId = secondarySkillId ?? null;
        talisman.value.secondarySkillLevel = secondarySkillLevel ?? 0;
        talisman.value.slotsId = slotsId ?? '0-0-0';
      }

      beforeEach(() => {
        talisman.value.primarySkillId = null;
        talisman.value.primarySkillLevel = 0;
        talisman.value.secondarySkillId = null;
        talisman.value.secondarySkillLevel = 0;
        talisman.value.slotsId = '0-0-0';
      });

      const { isValid, errors } = useTalismanValidator(talisman);

      it('can invalidate empty talisman', () => {
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for primarySkillLevel, secondarySkill, secondarySkillLevel', async () => {
        await updateTalisman({
          primarySkillId: 'capture-master',
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can validate talisman with null values for secondarySkill, secondarySkillLevel', async () => {
        await updateTalisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 1,
        });
        expect(isValid.value).toBeTruthy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for secondarySkillLevel', async () => {
        await updateTalisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 1,
          secondarySkillId: 'hunger-resistance',
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for secondarySkill', async () => {
        await updateTalisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 1,
          secondarySkillLevel: 2,
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: true,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman which primarySkillLevel greater than primarySkill.levelMaximum', async () => {
        await updateTalisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 2,
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: true,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman which secondarySkillLevel greater than secondarySkill.levelMaximum', async () => {
        await updateTalisman({
          secondarySkillId: 'hunger-resistance',
          secondarySkillLevel: 4,
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
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
          slotsId: '4-2-0',
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
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
          primarySkillId: 'capture-master',
          primarySkillLevel: 1,
          secondarySkillId: 'hunger-resistance',
          secondarySkillLevel: 2,
          slotsId: '3-2-1',
        });
        expect(isValid.value).toBeTruthy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });
    });

    describe('without ref', () => {
      it('can invalidate empty talisman', () => {
        const talisman = new Talisman({
          primarySkillLevel: 0,
        });
        const { isValid, errors } = useTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for primarySkillLevel, secondarySkill, secondarySkillLevel', async () => {
        const talisman = new Talisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 0,
        });
        const { isValid, errors } = useTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can validate talisman with null values for secondarySkill, secondarySkillLevel', async () => {
        const talisman = new Talisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 1,
        });
        const { isValid, errors } = useTalismanValidator(talisman);
        expect(isValid.value).toBeTruthy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for secondarySkillLevel', async () => {
        const talisman = new Talisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 1,
          secondarySkillId: 'hunger-resistance',
        });
        const { isValid, errors } = useTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for secondarySkill', async () => {
        const talisman = new Talisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 1,
          secondarySkillLevel: 2,
        });
        const { isValid, errors } = useTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: true,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman which primarySkillLevel greater than primarySkill.levelMaximum', async () => {
        const talisman = new Talisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 2,
        });
        const { isValid, errors } = useTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: true,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman which secondarySkillLevel greater than secondarySkill.levelMaximum', async () => {
        const talisman = new Talisman({
          primarySkillLevel: 0,
          secondarySkillId: 'hunger-resistance',
          secondarySkillLevel: 4,
        });
        const { isValid, errors } = useTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: true,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with unknown slots', async () => {
        const talisman = new Talisman({
          primarySkillLevel: 0,
          slotsId: '4-4-4',
        });
        const { isValid, errors } = useTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: true,
          },
        });
      });

      it('can validate talisman', async () => {
        const talisman = new Talisman({
          primarySkillId: 'capture-master',
          primarySkillLevel: 1,
          secondarySkillId: 'hunger-resistance',
          secondarySkillLevel: 2,
          slotsId: '3-2-1',
        });
        const { isValid, errors } = useTalismanValidator(talisman);
        expect(isValid.value).toBeTruthy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
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

  describe('useTemporaryTalismanValidator', () => {
    describe('with ref', () => {
      const talisman = ref<TemporaryTalisman>({
        primarySkillName: null,
        primarySkillLevel: 0,
        secondarySkillName: null,
        secondarySkillLevel: 0,
        slot1: 0,
        slot2: 0,
        slot3: 0,
      });

      async function updateTalisman({
        primarySkillName, primarySkillLevel, secondarySkillName, secondarySkillLevel, slot1, slot2, slot3,
      }: UpdateTemporaryTalisman) {
        talisman.value.primarySkillName = primarySkillName ?? null;
        talisman.value.primarySkillLevel = primarySkillLevel ?? 0;
        talisman.value.secondarySkillName = secondarySkillName ?? null;
        talisman.value.secondarySkillLevel = secondarySkillLevel ?? 0;
        talisman.value.slot1 = slot1 ?? 0;
        talisman.value.slot2 = slot2 ?? 0;
        talisman.value.slot3 = slot3 ?? 0;
      }

      beforeEach(() => {
        talisman.value.primarySkillName = null;
        talisman.value.primarySkillLevel = 0;
        talisman.value.secondarySkillName = null;
        talisman.value.secondarySkillLevel = 0;
        talisman.value.slot1 = 0;
        talisman.value.slot2 = 0;
        talisman.value.slot3 = 0;
      });

      const { isValid, errors } = useTemporaryTalismanValidator(talisman);

      it('can invalidate empty talisman', () => {
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for primarySkillLevel, secondarySkill, secondarySkillLevel', async () => {
        await updateTalisman({
          primarySkillName: 'Capture Master',
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can validate talisman with null values for secondarySkill, secondarySkillLevel', async () => {
        await updateTalisman({
          primarySkillName: 'Capture Master',
          primarySkillLevel: 1,
        });
        expect(isValid.value).toBeTruthy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for secondarySkill', async () => {
        await updateTalisman({
          primarySkillName: 'Capture Master',
          primarySkillLevel: 1,
          secondarySkillLevel: 3,
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: true,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for secondarySkillLevel', async () => {
        await updateTalisman({
          primarySkillName: 'Capture Master',
          primarySkillLevel: 1,
          secondarySkillName: 'Spartiate',
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman which primarySkillLevel greater than primarySkill.levelMaximum', async () => {
        await updateTalisman({
          primarySkillName: 'Capture Master',
          primarySkillLevel: 2,
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: true,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman which secondarySkillLevel greater than secondarySkill.levelMaximum', async () => {
        await updateTalisman({
          secondarySkillName: 'Spartiate',
          secondarySkillLevel: 4,
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: true,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with unknown primarySkill', async () => {
        await updateTalisman({
          primarySkillName: 'unknown-name',
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: true,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with unknown secondarySkill', async () => {
        await updateTalisman({
          secondarySkillName: 'unknown-name',
        });
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: true,
          },
          secondarySkillLevel: {
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
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
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
          primarySkillName: 'Capture Master',
          primarySkillLevel: 1,
          secondarySkillName: 'Spartiate',
          secondarySkillLevel: 2,
          slot1: 2,
          slot2: 1,
          slot3: 0,
        });
        expect(isValid.value).toBeTruthy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });
    });

    describe('without ref', () => {
      it('can invalidate empty talisman', () => {
        const talisman = {
          primarySkillName: null,
          primarySkillLevel: 0,
          secondarySkillName: null,
          secondarySkillLevel: 0,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        };

        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for primarySkillLevel, secondarySkill, secondarySkillLevel', async () => {
        const talisman = {
          primarySkillName: 'Capture Master',
          primarySkillLevel: 0,
          secondarySkillName: null,
          secondarySkillLevel: 0,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can validate talisman with null values for secondarySkill, secondarySkillLevel', async () => {
        const talisman = {
          primarySkillName: 'Capture Master',
          primarySkillLevel: 1,
          secondarySkillName: null,
          secondarySkillLevel: 0,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeTruthy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for secondarySkill', async () => {
        const talisman = {
          primarySkillName: 'Capture Master',
          primarySkillLevel: 1,
          secondarySkillName: null,
          secondarySkillLevel: 3,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: true,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with null values for secondarySkillLevel', async () => {
        const talisman = {
          primarySkillName: 'Capture Master',
          primarySkillLevel: 1,
          secondarySkillName: 'Spartiate',
          secondarySkillLevel: 0,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman which primarySkillLevel greater than primarySkill.levelMaximum', async () => {
        const talisman = {
          primarySkillName: 'Capture Master',
          primarySkillLevel: 2,
          secondarySkillName: null,
          secondarySkillLevel: 0,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: true,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman which secondarySkillLevel greater than secondarySkill.levelMaximum', async () => {
        const talisman = {
          primarySkillName: null,
          primarySkillLevel: 0,
          secondarySkillName: 'Spartiate',
          secondarySkillLevel: 4,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: true,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with unknown primarySkill', async () => {
        const talisman = {
          primarySkillName: 'unknown-name',
          primarySkillLevel: 0,
          secondarySkillName: null,
          secondarySkillLevel: 0,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: true,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with unknown secondarySkill', async () => {
        const talisman = {
          primarySkillName: null,
          primarySkillLevel: 0,
          secondarySkillName: 'unknown-name',
          secondarySkillLevel: 0,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: true,
          },
          secondarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          slots: {
            notFound: false,
          },
        });
      });

      it('can invalidate talisman with unknown slots', async () => {
        const talisman = {
          primarySkillName: null,
          primarySkillLevel: 0,
          secondarySkillName: null,
          secondarySkillLevel: 0,
          slot1: 4,
          slot2: 4,
          slot3: 4,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeFalsy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: true,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: true,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          slots: {
            notFound: true,
          },
        });
      });

      it('can validate talisman', async () => {
        const talisman = {
          primarySkillName: 'Capture Master',
          primarySkillLevel: 1,
          secondarySkillName: 'Spartiate',
          secondarySkillLevel: 2,
          slot1: 2,
          slot2: 1,
          slot3: 0,
        };
        const { isValid, errors } = useTemporaryTalismanValidator(talisman);
        expect(isValid.value).toBeTruthy();
        expect(errors.value).toStrictEqual({
          primarySkill: {
            isEmpty: false,
            notFound: false,
          },
          primarySkillLevel: {
            isEmpty: false,
            exceedsMaximum: false,
          },
          secondarySkill: {
            isEmpty: false,
            notFound: false,
          },
          secondarySkillLevel: {
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
});
