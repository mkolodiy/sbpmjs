<script>
  import { svelteStores } from '../sbpm';
  import TopControls from './TopControls.svelte';
  import BottomControls from './BottomControls.svelte';
  import Palette from './palette/Palette.svelte';
  import ElementNavigator from './ElementNavigator.svelte';

  const uiVisible = svelteStores.uiVisible;
</script>

<div class="sbpm-layout">
  <div class="sbpm-layout-top">
    <TopControls />
    {#if $uiVisible}<ElementNavigator /> {/if}
  </div>
  <div class="sbpm-layout-left">
    {#if $uiVisible}<Palette /> {/if}
  </div>
  <div class="sbpm-layout-right">
    <!-- {#if $showProperties && $uiVisible}
      <Properties />
    {/if} -->
    Properties
  </div>
  <div class="sbpm-layout-bottom">
    {#if $uiVisible}<BottomControls />{/if}
  </div>
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
    display: flex;
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
