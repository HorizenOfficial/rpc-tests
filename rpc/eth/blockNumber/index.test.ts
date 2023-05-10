import { describe, expect, test, } from '@jest/globals';
import blockNumber from './index';

describe('blockNumber', () => {
  test('blockNumber', async () => {
    expect(await blockNumber()).toBeInstanceOf(Object);
  });
});
