<script>
  import { activePaletteItems } from '../manager';
  import Frame from './ui/Frame.svelte';
  import { processModelIcon } from '../icons/processModel';

  const dragStart = (event) => {
    const type = event.target.dataset.type;
    event.dataTransfer.setData('text/plain', type);
  };
</script>

<div class="sbpm-palette">
  <Frame>
    {#each $activePaletteItems as paletteItem}
      <!-- <div draggable="true" data-type={paletteItem} on:dragstart={dragStart}>Process model</div> -->
      <img
        class="sbpm-palette-item"
        src={processModelIcon}
        alt="Process Model"
        width="130"
        height="70"
        draggable="true"
        data-type={paletteItem}
        on:dragstart={dragStart}
      />
    {/each}
  </Frame>
</div>

<style>
  .sbpm-palette {
    position: relative;
    width: 160px;
    z-index: 2;
  }

  .sbpm-palette-item {
    cursor: grab;
  }
</style>
