import testLib from '../src/lib';

test('Container element contains text', () => {
  const testDiv = document.createElement('div');
  testDiv.id = 'app';
  document.body.appendChild(testDiv);

  testLib('app');
  expect(testDiv.textContent).toBe('Test lib');
});
