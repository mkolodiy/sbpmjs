<script>
  import { onMount } from 'svelte';
  import { initModeler } from '../modeler';
  import Test from './Test.svelte';

  onMount(() => {
    initModeler();
  });
</script>

<div class="sbpm-main">
  <div class="sbpm-modeler" />
  <div class="sbpm-controls">
    <div>Other stuff</div>
    <Test />
  </div>
</div>

<style>
  .sbpm-main {
    position: relative;
    height: 100%;
  }

  .sbpm-main > * {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
