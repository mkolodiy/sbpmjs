export default function testLib(containerId: string) {
  const containerEl = document.getElementById(containerId);
  if (containerEl) {
    containerEl.textContent = 'Test lib';
  }
  console.log('Test lib');
}
