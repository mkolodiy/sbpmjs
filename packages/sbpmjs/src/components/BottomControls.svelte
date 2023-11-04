<script>
  import Frame from './ui/Frame.svelte';
  import { handlers } from '../sbpm';
  import IconButton from './ui/IconButton.svelte';
  import { centerFocusStrongIcon } from '../icons/ui/centerFocusWeak';
  import { clearIcon } from '../icons/ui/clear';
  import { zoomInIcon } from '../icons/ui/zoomIn';
  import { zoomOutIcon } from '../icons/ui/zoomOut';
</script>

<div class="sbpm-bottom-constrols">
  <Frame padded={false}>
    <div class="frame-content">
      <IconButton
        src={clearIcon}
        title="Clear canvas"
        on:click={handlers.clear}
      />
      <IconButton
        src={centerFocusStrongIcon}
        title="Center canvas"
        on:click={handlers.reset}
      />
      <IconButton
        src={zoomInIcon}
        title="Zoom in canvas"
        on:click={handlers.zoomIn}
      />
      <IconButton
        src={zoomOutIcon}
        title="Zoom out canvas"
        on:click={handlers.zoomOut}
      />
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
