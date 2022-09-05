import {
  describe, expect, it,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import ManagerHelp from 'components/ManagerHelp.vue';

installQuasarPlugin();

describe('components/ManagerHelp', () => {
  it('sets the correct default data', () => {
    const { vm } = shallowMount(ManagerHelp);

    expect(vm.externalLinks).toStrictEqual([
      {
        title: 'manager.help.externals_tools.link_1.title',
        caption: 'manager.help.externals_tools.link_1.caption',
        link: 'https://mhrise.wiki-db.com/sim/?hl=en',
      },
      {
        title: 'manager.help.externals_tools.link_2.title',
        caption: 'manager.help.externals_tools.link_2.caption',
        link: 'https://www.mhrbuilder.com/',
      },
      {
        title: 'manager.help.externals_tools.link_3.title',
        caption: 'manager.help.externals_tools.link_3.caption',
        link: 'https://sites.google.com/site/pingsdex/pingsmhrsdex?authuser=0',
      },
    ]);
  });
});
