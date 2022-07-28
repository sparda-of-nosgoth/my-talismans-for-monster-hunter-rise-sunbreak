import { createTestingPinia } from '@pinia/testing';

const piniaMocked = () => createTestingPinia({
  initialState: {
    talisman: {
      talismans: [
        {
          id: 1658793600000,
          skill1: {
            id: 84,
            name: 'weakness-exploit',
            type: 6,
            levelMaximum: 3,
            foundOnTalismans: true,
          },
          skill1Level: 2,
          skill2: null,
          skill2Level: null,
          slots: {
            id: 6,
            slot1: 2,
            slot2: 1,
            slot3: 0,
          },
          favorite: false,
          forMelting: false,
        },
        {
          id: 1658793600000,
          skill1: {
            id: 36,
            name: 'attack-boost',
            type: 3,
            levelMaximum: 7,
            foundOnTalismans: true,
          },
          skill1Level: 2,
          skill2: {
            id: 82,
            name: 'slugger',
            type: 6,
            levelMaximum: 3,
            foundOnTalismans: true,
          },
          skill2Level: 1,
          slots: {
            id: 3,
            slot1: 1,
            slot2: 1,
            slot3: 0,
          },
          favorite: false,
          forMelting: false,
        },
      ],
    },
  },
  stubActions: false,
});

export { piniaMocked };
