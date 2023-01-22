<script>
  import Frame from './ui/Frame.svelte';
  import { handleOnReset, handleOnClear, handleOnZoomIn, handleOnZoomOut } from '../core/handlers';
  import { centerFocusStrongIcon, clearIcon, zoomInIcon, zoomOutIcon } from '../icons';
  import IconButton from './ui/IconButton.svelte';
</script>

<div class="sbpm-bottom-constrols">
  <Frame padded={false}>
    <div class="frame-content">
      <IconButton src={clearIcon} title="Clear canvas" on:click={handleOnClear} />
      <IconButton src={centerFocusStrongIcon} title="Center canvas" on:click={handleOnReset} />
      <IconButton src={zoomInIcon} title="Zoom in canvas" on:click={handleOnZoomIn}/>
      <IconButton src={zoomOutIcon} title="Zoom out canvas" on:click={handleOnZoomOut}/>
    </div>
  </Frame>
</div>

<style>
  .sbpm-bottom-constrols {
    position: relative;
    width: min-content;
    z-index: 2;
  }

  .frame-content {
    display: flex;
    padding: 5px;
  }
</style>
