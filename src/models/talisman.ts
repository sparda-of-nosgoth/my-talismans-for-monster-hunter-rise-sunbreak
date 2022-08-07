import { Skill } from 'src/models/skill';
import { Slots, slotsList } from 'src/models/slots';

export interface TalismanConstructor {
  skill1?: Skill | null
  skill1Level?: number
  skill2?: Skill | null
  skill2Level?: number
  slots?: Slots
  forMelting?: boolean
  favorite?: boolean
}

export class Talisman {
  skill1: Skill | null;

  skill1Level: number;

  skill2: Skill | null;

  skill2Level: number | null;

  slots: Slots;

  forMelting: boolean;

  favorite: boolean;

  weight: number;

  constructor({
    skill1, skill1Level, skill2, skill2Level, slots, forMelting, favorite,
  }: TalismanConstructor) {
    this.skill1 = skill1 ?? null;
    this.skill1Level = skill1Level ?? 1;
    this.skill2 = skill2 ?? null;
    this.skill2Level = skill2Level ?? null;
    this.slots = slots ?? slotsList[0];
    this.favorite = favorite ?? false;
    this.forMelting = forMelting ?? false;
    this.weight = 0;
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
