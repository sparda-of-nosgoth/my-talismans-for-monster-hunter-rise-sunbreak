import {
  isRef, Ref, ref, unref, watchEffect,
} from 'vue';
import { useSkill } from 'src/composables/skill';
import { parse } from 'papaparse';
import { now } from 'lodash';
import { Talisman } from 'src/composables/talisman';
import { useSlots } from 'src/composables/slots';
import { useTemporaryTalismanValidator } from 'src/composables/talisman-validator';
import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';

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
  const { findSkillByName } = useSkill();
  const { findSlotsBySlot } = useSlots();
  const errorsFromImport = ref<ImportErrors>(defaultImportErrors);
  const talismansToImport = ref<Talisman[]>([]);

  function resetRefs() {
    talismansToImport.value = [];
    errorsFromImport.value = _cloneDeep(defaultImportErrors);
  }

  function createTalisman(importedTalisman: TemporaryTalisman): Talisman {
    return {
      id: now(),
      skill1: findSkillByName(importedTalisman.skill1 ?? '') ?? null,
      skill1Level: importedTalisman.skill1Level,
      skill2: findSkillByName(importedTalisman.skill2 ?? '') ?? null,
      skill2Level: importedTalisman.skill2Level ?? null,
      slots: findSlotsBySlot(importedTalisman.slot1, importedTalisman.slot2, importedTalisman.slot3) ?? { slot1: 0, slot2: 0, slot3: 0 },
      favorite: false,
      forMelting: false,
    };
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

    try {
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
    } catch (e) {
      // @TODO-post-v1.0: find a better error to throw
      throw new Error('An error occured during import');
    }
  }

  if (isRef(csvData)) {
    watchEffect(importTalismans);
  } else {
    importTalismans();
  }

  return { errorsFromImport, talismansToImport };
}
