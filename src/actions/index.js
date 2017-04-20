export const TEST_STUFF = 'TEST_STUFF';

export function testStuff(testvar) {
  return {
    type: TEST_STUFF,
    testvar
  };
}
