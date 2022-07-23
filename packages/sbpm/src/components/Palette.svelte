<script>
  import { activePaletteItems, uiVisible } from '../manager';
  import Frame from './ui/Frame.svelte';

  const dragStart = (event) => {
    const type = event.target.dataset.type;
    event.dataTransfer.setData('text/plain', type);
  };
</script>

{#if $uiVisible}
  <div class="sbpm-palette">
    <Frame>
      {#each $activePaletteItems as { type, icon, size: { width, height }, title }}
        <img class="sbpm-palette-item" src={icon} alt={title} {title} {width} {height} draggable="true" data-type={type} on:dragstart={dragStart} />
      {/each}
    </Frame>
  </div>
{/if}

<style>
  .sbpm-palette {
    position: relative;
    width: min-content;
    z-index: 2;
  }

  .sbpm-palette-item {
    cursor: grab;
  }

  .sbpm-palette-item:hover {
    background-color: var(--sbpm-shade-color);
  }
</style>
