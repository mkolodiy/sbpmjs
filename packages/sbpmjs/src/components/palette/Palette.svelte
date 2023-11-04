<script lang="ts">
  import type { DragEventHandler } from 'svelte/elements';
  import { svelteStores } from '../../sbpm';
  import Frame from '../ui/Frame.svelte';
  import { getPaletteItems } from './paletteItems';

  const viewedSbpmItem = svelteStores.viewedSbpmItem;

  const dragStart: DragEventHandler<HTMLImageElement> = (event) => {
    if (event.dataTransfer) {
      const type = event.currentTarget.dataset.type!;
      event.dataTransfer.setData('text/plain', type);
    }
  };

  $: activePaletteItems = getPaletteItems($viewedSbpmItem.type);
</script>

<div class="sbpm-palette">
  <Frame>
    {#each activePaletteItems as { type, icon, size: { width, height }, title }}
      <img
        class="sbpm-palette-item"
        src={icon}
        alt={title}
        {title}
        {width}
        {height}
        draggable="true"
        data-type={type}
        on:dragstart={dragStart}
      />
    {/each}
  </Frame>
</div>

<style>
  .sbpm-palette {
    position: relative;
    width: min-content;
    z-index: 2;
  }

  .sbpm-palette-item {
    cursor: grab;
  }
</style>
