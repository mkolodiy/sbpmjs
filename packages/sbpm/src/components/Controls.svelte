<script>
  import Palette from './Palette.svelte';
  import Frame from './ui/Frame.svelte';
</script>

<!-- <div>
  <br />
  <div>TEst</div>
</div> -->

<div class="sbpm-controls">
  <div class="sbpm-controls-top">Top</div>
  <div class="sbpm-controls-left"><Palette /></div>
  <div class="sbpm-controls-right">Right</div>
  <div class="sbpm-controls-bottom">Bottom</div>
</div>

<style>
  .sbpm-controls {
    display: grid;
    height: 100%;
    width: 100%;
    grid-template:
      'a a a' auto
      'b b c' 1fr
      'd d d' auto;
  }

  .sbpm-controls-top {
    grid-area: a;
  }

  .sbpm-controls-left {
    grid-area: b;
  }

  .sbpm-controls-right {
    grid-area: c;
  }

  .sbpm-controls-bottom {
    grid-area: d;
  }
</style>
