import { getSkillById, Skill } from 'src/models/skill';
import { getSlotsById, Slots } from 'src/models/slots';

export interface TalismanConstructor {
  primarySkillId?: string
  primarySkillLevel?: number
  secondarySkillId?: string | null
  secondarySkillLevel?: number
  slotsId?: string
  forMelding?: boolean
  favorite?: boolean
}

export class Talisman {
  primarySkillId: string | null;

  primarySkillLevel: number;

  secondarySkillId: string | null;

  secondarySkillLevel: number | null;

  slotsId: string;

  forMelding: boolean;

  favorite: boolean;

  weight: number;

  constructor({
    primarySkillId, primarySkillLevel, secondarySkillId, secondarySkillLevel, slotsId, forMelding, favorite,
  }: TalismanConstructor) {
    this.primarySkillId = primarySkillId ?? null;
    this.primarySkillLevel = primarySkillLevel ?? 1;
    this.secondarySkillId = secondarySkillId ?? null;
    this.secondarySkillLevel = secondarySkillLevel ?? null;
    this.slotsId = slotsId ?? '0-0-0';
    this.favorite = favorite ?? false;
    this.forMelding = forMelding ?? false;
    this.weight = 0;
  }

  get primarySkill(): Skill | null {
    return getSkillById(this.primarySkillId ?? '') ?? null;
  }

  set primarySkill(primarySkill: Skill | null) {
    this.primarySkillId = primarySkill ? primarySkill.id : null;
  }

  get secondarySkill(): Skill | null {
    return getSkillById(this.secondarySkillId ?? '') ?? null;
  }

  set secondarySkill(secondarySkill: Skill | null) {
    this.secondarySkillId = secondarySkill ? secondarySkill.id : null;
  }

  get slots(): Slots | null {
    return getSlotsById(this.slotsId) ?? null;
  }

  set slots(slots: Slots | null) {
    this.slotsId = slots ? slots.id : '';
  }

  resetWeight(): Talisman {
    this.weight = 0;

    return this;
  }

  updateWeight(weight: number): Talisman {
    this.weight += weight;

    return this;
  }
}

export interface TemporaryTalisman {
  primarySkillName: string | null
  primarySkillLevel: number
  secondarySkillName: string | null
  secondarySkillLevel: number
  slot1: number
  slot2: number
  slot3: number
}
