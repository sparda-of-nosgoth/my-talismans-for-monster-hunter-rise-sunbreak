import { jest } from '@jest/globals';

export function initFakeTimers() {
  jest
    .useFakeTimers('modern')
    .setSystemTime(new Date('2022-07-26').getTime());
}
