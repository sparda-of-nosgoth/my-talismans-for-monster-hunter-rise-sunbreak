import { Talisman } from 'src/models/talisman';

interface TalismansStorage {
  talismans: Talisman[],
  updatedAt: number | null,
}

export type { TalismansStorage };
