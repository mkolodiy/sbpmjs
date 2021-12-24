import Main from './Main.svelte';

export default function testLib(containerId: string) {
  const containerEl = document.getElementById(containerId);

  new Main({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target: containerEl,
  });
}
