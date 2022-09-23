import {
  isRef, Ref, ref, unref, watchEffect,
} from 'vue';
import _cloneDeep from 'lodash/cloneDeep';
import { Talisman, TemporaryTalisman } from 'src/models/talisman';
import { useSlotsStore } from 'stores/slots';
import { useSkillStore } from 'stores/skills';
import { Skill } from 'src/models/skill';

export interface TalismanValidator {
  skill1: {
    isEmpty: boolean
    notFound: boolean
  },
  skill1Level: {
    isEmpty: boolean
    exceedsMaximum: boolean
  },
  skill2: {
    isEmpty: boolean
    notFound: boolean
  },
  skill2Level: {
    isEmpty: boolean
    exceedsMaximum: boolean
  },
  slots: {
    notFound: boolean
  },
}

const defaultErrors = {
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
};

export function useTalismanValidator(talisman: Ref<Talisman> | Talisman) {
  const { getSlotsById } = useSlotsStore();
  const isValid = ref(true);
  const errors = ref<TalismanValidator>(defaultErrors);

  function resetRefs() {
    isValid.value = true;
    errors.value = _cloneDeep(defaultErrors);
  }

  function validate() {
    const talismanValue = unref(talisman);
    resetRefs();

    if (!talismanValue.skill1) {
      // Not valid if skill1 is empty or undefined
      errors.value.skill1.isEmpty = true;
      isValid.value = false;
    }

    if (!talismanValue.skill1Level) {
      // Not valid if skill1Level is empty or undefined
      errors.value.skill1Level.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.skill1 && talismanValue.skill1Level > talismanValue.skill1.levelMaximum) {
      // Not valid if skill1Level is greater than skill1.levelMaximum
      errors.value.skill1Level.exceedsMaximum = true;
      isValid.value = false;
    }

    if (!talismanValue.skill2 && talismanValue.skill2Level) {
      // Not valid if skill2 is empty or undefined when skill2Level is not empty
      errors.value.skill2.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.skill2 && !talismanValue.skill2Level) {
      // Not valid if skill2Level is empty or undefined when skill2 is not empty
      errors.value.skill2Level.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.skill2 && talismanValue.skill2Level && talismanValue.skill2Level > talismanValue.skill2.levelMaximum) {
      // Not valid if skill2Level is greater than skill2.levelMaximum
      errors.value.skill2Level.exceedsMaximum = true;
      isValid.value = false;
    }

    if (!getSlotsById(`${talismanValue.slots.slot1}-${talismanValue.slots.slot2}-${talismanValue.slots.slot3}`)) {
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
  const { getSkillByName } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  const isValid = ref(true);
  const errors = ref<TalismanValidator>(_cloneDeep(defaultErrors));

  function resetRefs() {
    isValid.value = true;
    errors.value = _cloneDeep(defaultErrors);
  }

  function validate() {
    const talismanValue = unref(talisman);
    const skill1 = ref<Skill|undefined>(undefined);
    const skill2 = ref<Skill|undefined>(undefined);
    resetRefs();

    if (!talismanValue.skill1) {
      // Not valid if skill1 is empty or undefined
      errors.value.skill1.isEmpty = true;
      isValid.value = false;
    } else {
      skill1.value = getSkillByName(talismanValue.skill1);
      if (!skill1.value) {
        // Not valid if skill1 is not found during import
        errors.value.skill1.notFound = true;
        isValid.value = false;
      }
    }

    if (!talismanValue.skill1Level) {
      // Not valid if skill1Level is empty or undefined
      errors.value.skill1Level.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.skill1
      && skill1.value
      && talismanValue.skill1Level > skill1.value.levelMaximum
    ) {
      // Not valid if skill1Level is greater than skill1.levelMaximum
      errors.value.skill1Level.exceedsMaximum = true;
      isValid.value = false;
    }

    if (talismanValue.skill2) {
      skill2.value = getSkillByName(talismanValue.skill2);
      if (!skill2.value) {
        // Not valid if skill2 is not found during import
        errors.value.skill2.notFound = true;
        isValid.value = false;
      }
    }

    if (!talismanValue.skill2 && talismanValue.skill2Level) {
      // Not valid if skill2 is empty or undefined when skill2Level is not empty
      errors.value.skill2.isEmpty = true;
      isValid.value = false;
    } else if (talismanValue.skill2 && !talismanValue.skill2Level) {
      // Not valid if skill2Level is empty or undefined when skill2 is not empty
      errors.value.skill2Level.isEmpty = true;
      isValid.value = false;
    } else if (skill2.value
      && talismanValue.skill2Level > skill2.value.levelMaximum
    ) {
      // Not valid if skill2Level is greater than skill2.levelMaximum
      errors.value.skill2Level.exceedsMaximum = true;
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
