<script>
  import BottomControls from './BottomControls.svelte';
  import Palette from './Palette.svelte';
  import Properties from './Properties.svelte';
  import TopControls from './TopControls.svelte';
  import Frame from './ui/Frame.svelte';
</script>

<div class="sbpm-layout">
  <div class="sbpm-layout-top"><TopControls /></div>
  <div class="sbpm-layout-left"><Palette /></div>
  <div class="sbpm-layout-right"><Properties /></div>
  <div class="sbpm-layout-bottom"><BottomControls /></div>
</div>

<style>
  .sbpm-layout {
    display: grid;
    height: 100%;
    width: 100%;
    grid-template:
      'a a c' auto
      'b b c' 1fr
      'd d c' auto;
    gap: 10px;
  }

  .sbpm-layout-top {
    grid-area: a;
  }

  .sbpm-layout-left {
    grid-area: b;
  }

  .sbpm-layout-right {
    grid-area: c;
    display: flex;
    justify-content: flex-end;
  }

  .sbpm-layout-bottom {
    grid-area: d;
  }
</style>
