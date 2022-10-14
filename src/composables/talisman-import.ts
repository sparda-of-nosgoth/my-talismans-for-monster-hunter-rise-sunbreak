import {
  isRef, Ref, ref, unref, watchEffect,
} from 'vue';
import { parse } from 'papaparse';
import { useTemporaryTalismanValidator } from 'src/composables/talisman-validator';
import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';
import { Talisman, TalismanConstructor, TemporaryTalisman } from 'src/models/talisman';
import { getSkillByName } from 'src/models/skill';
import { getSlotsBySlot } from 'src/models/slots';

export interface ImportErrors {
  primarySkillIsEmpty: TemporaryTalisman[]
  primarySkillNotFound: TemporaryTalisman[]
  primarySkillLevelIsEmpty: TemporaryTalisman[]
  primarySkillLevelExceedsMaximum: TemporaryTalisman[]
  secondarySkillIsEmpty: TemporaryTalisman[]
  secondarySkillNotFound: TemporaryTalisman[]
  secondarySkillLevelIsEmpty: TemporaryTalisman[]
  secondarySkillLevelExceedsMaximum: TemporaryTalisman[]
  slotsNotFound: TemporaryTalisman[]
}

const defaultImportErrors = {
  primarySkillIsEmpty: [],
  primarySkillNotFound: [],
  primarySkillLevelIsEmpty: [],
  primarySkillLevelExceedsMaximum: [],
  secondarySkillIsEmpty: [],
  secondarySkillNotFound: [],
  secondarySkillLevelIsEmpty: [],
  secondarySkillLevelExceedsMaximum: [],
  slotsNotFound: [],
};

export function useTalismanImport(csvData: Ref<string> | string) {
  const errorsFromImport = ref<ImportErrors>(defaultImportErrors);
  const talismansToImport = ref<Talisman[]>([]);

  function resetRefs() {
    talismansToImport.value = [];
    errorsFromImport.value = _cloneDeep(defaultImportErrors);
  }

  function createTalisman(importedTalisman: TemporaryTalisman): Talisman {
    const values: TalismanConstructor = {};
    if (importedTalisman.primarySkillName) {
      values.primarySkillId = getSkillByName(importedTalisman.primarySkillName)?.id;
    }
    if (importedTalisman.primarySkillLevel) {
      values.primarySkillLevel = importedTalisman.primarySkillLevel;
    }
    if (importedTalisman.secondarySkillName) {
      values.secondarySkillId = getSkillByName(importedTalisman.secondarySkillName)?.id;
    }
    if (importedTalisman.secondarySkillLevel) {
      values.secondarySkillLevel = importedTalisman.secondarySkillLevel;
    }
    const slots = getSlotsBySlot(importedTalisman.slot1, importedTalisman.slot2, importedTalisman.slot3);
    if (slots) {
      values.slotsId = slots.id;
    }
    return new Talisman(values);
  }

  function importTalismans() {
    const csv = unref(csvData);
    resetRefs();
    const header = 'primarySkillName,primarySkillLevel,secondarySkillName,secondarySkillLevel,slot1,slot2,slot3\n';
    const result = parse<TemporaryTalisman>(header + csv, {
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
      delimiter: '',
      newline: '\n',
    });

    _each(result.data, (temporaryTalisman: TemporaryTalisman) => {
      const { errors, isValid } = useTemporaryTalismanValidator(temporaryTalisman);

      if (isValid.value) {
        talismansToImport.value.push(createTalisman(temporaryTalisman));
      } else {
        const {
          primarySkill, primarySkillLevel, secondarySkill, secondarySkillLevel, slots,
        } = errors.value;
        if (primarySkill.isEmpty) {
          errorsFromImport.value.primarySkillIsEmpty.push(temporaryTalisman);
        }
        if (primarySkill.notFound) {
          errorsFromImport.value.primarySkillNotFound.push(temporaryTalisman);
        }
        if (primarySkillLevel.isEmpty) {
          errorsFromImport.value.primarySkillLevelIsEmpty.push(temporaryTalisman);
        }
        if (primarySkillLevel.exceedsMaximum) {
          errorsFromImport.value.primarySkillLevelExceedsMaximum.push(temporaryTalisman);
        }
        if (secondarySkill.isEmpty) {
          errorsFromImport.value.secondarySkillIsEmpty.push(temporaryTalisman);
        }
        if (secondarySkill.notFound) {
          errorsFromImport.value.secondarySkillNotFound.push(temporaryTalisman);
        }
        if (secondarySkillLevel.isEmpty) {
          errorsFromImport.value.secondarySkillLevelIsEmpty.push(temporaryTalisman);
        }
        if (secondarySkillLevel.exceedsMaximum) {
          errorsFromImport.value.secondarySkillLevelExceedsMaximum.push(temporaryTalisman);
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
