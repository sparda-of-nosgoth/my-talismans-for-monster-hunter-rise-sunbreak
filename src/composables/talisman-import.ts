import {
  isRef, Ref, ref, unref, watchEffect,
} from 'vue';
import { parse } from 'papaparse';
import { useTemporaryTalismanValidator } from 'src/composables/talisman-validator';
import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';
import { Talisman, TalismanConstructor } from 'src/models/talisman';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';

export interface TemporaryTalisman {
  skill1: string | null
  skill1Level: number
  skill2: string | null
  skill2Level: number
  slot1: number
  slot2: number
  slot3: number
}

export interface ImportErrors {
  skill1IsEmpty: TemporaryTalisman[]
  skill1NotFound: TemporaryTalisman[]
  skill1LevelIsEmpty: TemporaryTalisman[]
  skill1LevelExceedsMaximum: TemporaryTalisman[]
  skill2IsEmpty: TemporaryTalisman[]
  skill2NotFound: TemporaryTalisman[]
  skill2LevelIsEmpty: TemporaryTalisman[]
  skill2LevelExceedsMaximum: TemporaryTalisman[]
  slotsNotFound: TemporaryTalisman[]
}

const defaultImportErrors = {
  skill1IsEmpty: [],
  skill1NotFound: [],
  skill1LevelIsEmpty: [],
  skill1LevelExceedsMaximum: [],
  skill2IsEmpty: [],
  skill2NotFound: [],
  skill2LevelIsEmpty: [],
  skill2LevelExceedsMaximum: [],
  slotsNotFound: [],
};

export function useTalismanImport(csvData: Ref<string> | string) {
  const { getSkillByName } = useSkillStore();
  const { getSlotsBySlot } = useSlotsStore();
  const errorsFromImport = ref<ImportErrors>(defaultImportErrors);
  const talismansToImport = ref<Talisman[]>([]);

  function resetRefs() {
    talismansToImport.value = [];
    errorsFromImport.value = _cloneDeep(defaultImportErrors);
  }

  function createTalisman(importedTalisman: TemporaryTalisman): Talisman {
    const values: TalismanConstructor = {};
    if (importedTalisman.skill1) {
      values.skill1 = getSkillByName(importedTalisman.skill1);
    }
    if (importedTalisman.skill1Level) {
      values.skill1Level = importedTalisman.skill1Level;
    }
    if (importedTalisman.skill2) {
      values.skill2 = getSkillByName(importedTalisman.skill2);
    }
    if (importedTalisman.skill2Level) {
      values.skill2Level = importedTalisman.skill2Level;
    }
    const slots = getSlotsBySlot(importedTalisman.slot1, importedTalisman.slot2, importedTalisman.slot3);
    if (slots) {
      values.slots = slots;
    }
    return new Talisman(values);
  }

  function importTalismans() {
    const csv = unref(csvData);
    resetRefs();
    const header = 'skill1,skill1Level,skill2,skill2Level,slot1,slot2,slot3\n';
    const result = parse<TemporaryTalisman>(header + csv, {
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
      delimiter: '',
      newline: '\n',
    });

    _each(result.data, (temporaryTalisman: TemporaryTalisman) => {
      const { errorsFromTalisman, talismanIsValid } = useTemporaryTalismanValidator(temporaryTalisman);

      if (talismanIsValid.value) {
        talismansToImport.value.push(createTalisman(temporaryTalisman));
      } else {
        const {
          skill1, skill1Level, skill2, skill2Level, slots,
        } = errorsFromTalisman.value;
        if (skill1.isEmpty) {
          errorsFromImport.value.skill1IsEmpty.push(temporaryTalisman);
        }
        if (skill1.notFound) {
          errorsFromImport.value.skill1NotFound.push(temporaryTalisman);
        }
        if (skill1Level.isEmpty) {
          errorsFromImport.value.skill1LevelIsEmpty.push(temporaryTalisman);
        }
        if (skill1Level.exceedsMaximum) {
          errorsFromImport.value.skill1LevelExceedsMaximum.push(temporaryTalisman);
        }
        if (skill2.isEmpty) {
          errorsFromImport.value.skill2IsEmpty.push(temporaryTalisman);
        }
        if (skill2.notFound) {
          errorsFromImport.value.skill2NotFound.push(temporaryTalisman);
        }
        if (skill2Level.isEmpty) {
          errorsFromImport.value.skill2LevelIsEmpty.push(temporaryTalisman);
        }
        if (skill2Level.exceedsMaximum) {
          errorsFromImport.value.skill2LevelExceedsMaximum.push(temporaryTalisman);
        }
        if (slots.notFound) {
          errorsFromImport.value.slotsNotFound.push(temporaryTalisman);
        }
      }
    });
  }

  if (isRef(csvData)) {
    watchEffect(importTalismans);
  } else {
    importTalismans();
  }

  return { errorsFromImport, talismansToImport };
}
