import { config } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

export function useMockPinia() {
  config.global.plugins = [...config.global.plugins, createTestingPinia()];
}
