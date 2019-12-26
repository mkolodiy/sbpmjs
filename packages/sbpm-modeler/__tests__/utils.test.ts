import { isValidObject } from '../lib/utils';

test('isValidObject', () => {
  const validObj = { test: 'test' };
  const invalidObj = {};

  expect(isValidObject(validObj)).toBeTruthy();
  expect(isValidObject(invalidObj)).toBeFalsy();
  expect(isValidObject(null)).toBeFalsy();
  expect(isValidObject(undefined)).toBeFalsy();
});
