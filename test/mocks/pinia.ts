import { createTestingPinia } from '@pinia/testing';
import { talismans } from 'app/test/mocks/models';
import _cloneDeep from 'lodash/cloneDeep';

const piniaMocked = () => createTestingPinia({
  initialState: {
    talisman: {
      talismans: _cloneDeep(talismans.allTalismans),
    },
  },
  stubActions: false,
});

export { piniaMocked };
