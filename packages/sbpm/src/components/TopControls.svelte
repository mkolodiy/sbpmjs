<script>
  import Button from './ui/Button.svelte';
  import Frame from './ui/Frame.svelte';
  import { handleOnReset } from '../manager';
  import { centerFocusStrong } from '../icons/center_focus_strong';
</script>

<div class="sbpm-top-constrols">
  <Frame>
    <Button size="small" variant="outline" on:click={handleOnReset}>
      <img src={centerFocusStrong} alt="Center canvas" style="color: white;" width="32" height="32" />
    </Button>
  </Frame>
</div>

<style>
  .sbpm-top-constrols {
    position: relative;
    width: 160px;
    z-index: 2;
  }
</style>
