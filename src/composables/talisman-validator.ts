import {
  isRef, Ref, ref, unref, watchEffect,
} from 'vue';
import _cloneDeep from 'lodash/cloneDeep';
import { Talisman, TemporaryTalisman } from 'src/models/talisman';
import { getSkillByName, Skill } from 'src/models/skill';
import { getSlotsById } from 'src/models/slots';

export interface TalismanValidator {
  primarySkill: {
    isEmpty: boolean
    notFound: boolean
  },
  primarySkillLevel: {
    isEmpty: boolean
    exceedsMaximum: boolean
  },
  secondarySkill: {
    isEmpty: boolean
    notFound: boolean
  },
  secondarySkillLevel: {
    isEmpty: boolean
    exceedsMaximum: boolean
  },
  slots: {
    notFound: boolean
  },
}

const defaultErrors = {
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
};

export function useTalismanValidator(talisman: Ref<Talisman> | Talisman) {
  const isValid = ref(true);
  const errors = ref<TalismanValidator>(defaultErrors);

  function resetRefs() {
    isValid.value = true;
    errors.value = _cloneDeep(defaultErrors);
  }

  function validate() {
    const talismanValue = unref(talisman);
    resetRefs();

    if (!talismanValue.primarySkill) {
      // Not valid if primarySkill is empty or undefined
      errors.value.primarySkill.isEmpty = true;
      isValid.value = false;
    }

    if (!talismanValue.primarySkillLevel) {
      // Not valid if primarySkillLevel is empty or undefined
      errors.value.primarySkillLevel.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.primarySkill && talismanValue.primarySkillLevel > talismanValue.primarySkill.levelMaximum) {
      // Not valid if primarySkillLevel is greater than primarySkill.levelMaximum
      errors.value.primarySkillLevel.exceedsMaximum = true;
      isValid.value = false;
    }

    if (!talismanValue.secondarySkill && talismanValue.secondarySkillLevel) {
      // Not valid if secondarySkill is empty or undefined when secondarySkillLevel is not empty
      errors.value.secondarySkill.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.secondarySkill && !talismanValue.secondarySkillLevel) {
      // Not valid if secondarySkillLevel is empty or undefined when secondarySkill is not empty
      errors.value.secondarySkillLevel.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.secondarySkill && talismanValue.secondarySkillLevel && talismanValue.secondarySkillLevel > talismanValue.secondarySkill.levelMaximum) {
      // Not valid if secondarySkillLevel is greater than secondarySkill.levelMaximum
      errors.value.secondarySkillLevel.exceedsMaximum = true;
      isValid.value = false;
    }

    if (!talismanValue.slots) {
      // Not valid if slots doesn't exist
      errors.value.slots.notFound = true;
      isValid.value = false;
    }
  }

  if (isRef(talisman)) {
    watchEffect(validate);
  } else {
    validate();
  }

  return { isValid, errors };
}

export function useTemporaryTalismanValidator(talisman: Ref<TemporaryTalisman> | TemporaryTalisman) {
  const isValid = ref(true);
  const errors = ref<TalismanValidator>(_cloneDeep(defaultErrors));

  function resetRefs() {
    isValid.value = true;
    errors.value = _cloneDeep(defaultErrors);
  }

  function validate() {
    const talismanValue = unref(talisman);
    const primarySkill = ref<Skill|undefined>(undefined);
    const secondarySkill = ref<Skill|undefined>(undefined);
    resetRefs();

    if (!talismanValue.primarySkillName) {
      // Not valid if primarySkill is empty or undefined
      errors.value.primarySkill.isEmpty = true;
      isValid.value = false;
    } else {
      primarySkill.value = getSkillByName(talismanValue.primarySkillName);
      if (!primarySkill.value) {
        // Not valid if primarySkill is not found during import
        errors.value.primarySkill.notFound = true;
        isValid.value = false;
      }
    }

    if (!talismanValue.primarySkillLevel) {
      // Not valid if primarySkillLevel is empty or undefined
      errors.value.primarySkillLevel.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.primarySkillName
      && primarySkill.value
      && talismanValue.primarySkillLevel > primarySkill.value.levelMaximum
    ) {
      // Not valid if primarySkillLevel is greater than primarySkill.levelMaximum
      errors.value.primarySkillLevel.exceedsMaximum = true;
      isValid.value = false;
    }

    if (talismanValue.secondarySkillName) {
      secondarySkill.value = getSkillByName(talismanValue.secondarySkillName);
      if (!secondarySkill.value) {
        // Not valid if secondarySkill is not found during import
        errors.value.secondarySkill.notFound = true;
        isValid.value = false;
      }
    }

    if (!talismanValue.secondarySkillName && talismanValue.secondarySkillLevel) {
      // Not valid if secondarySkill is empty or undefined when secondarySkillLevel is not empty
      errors.value.secondarySkill.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.secondarySkillName && !talismanValue.secondarySkillLevel) {
      // Not valid if secondarySkillLevel is empty or undefined when secondarySkill is not empty
      errors.value.secondarySkillLevel.isEmpty = true;
      isValid.value = false;
    } else if (secondarySkill.value
      && talismanValue.secondarySkillLevel > secondarySkill.value.levelMaximum
    ) {
      // Not valid if secondarySkillLevel is greater than secondarySkill.levelMaximum
      errors.value.secondarySkillLevel.exceedsMaximum = true;
      isValid.value = false;
    }

    if (!getSlotsById(`${talismanValue.slot1}-${talismanValue.slot2}-${talismanValue.slot3}`)) {
      // Not valid if slots doesn't exist
      errors.value.slots.notFound = true;
      isValid.value = false;
    }
  }

  if (isRef(talisman)) {
    watchEffect(validate);
  } else {
    validate();
  }

  return { isValid, errors };
}
