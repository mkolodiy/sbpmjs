import TestComponent from './TestComponent.svelte';

export default function testLib(containerId: string) {
  const containerEl = document.getElementById(containerId);
  if (containerEl) {
    containerEl.textContent = 'Test lib';
  }
  console.log('Test lib');
  new TestComponent({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target: containerEl,
  });
}
