import { Talisman } from 'src/models/talisman';

export interface TalismansStorage {
  talismans: Talisman[],
  updatedAt: number | null,
}
