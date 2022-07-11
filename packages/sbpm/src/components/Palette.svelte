<script>
  import { activePaletteItems } from '../manager';
  import Frame from './ui/Frame.svelte';

  const dragStart = (event) => {
    const type = event.target.dataset.type;
    event.dataTransfer.setData('text/plain', type);
  };
</script>

<div class="sbpm-palette">
  <Frame>
    {#each $activePaletteItems as paletteItem}
      <div draggable="true" data-type={paletteItem} on:dragstart={dragStart}>Process model</div>
    {/each}
  </Frame>
</div>

<style>
  .sbpm-palette {
    position: absolute;
    width: 150px;
    z-index: 2;
  }
</style>
