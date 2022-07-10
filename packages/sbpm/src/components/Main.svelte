<script>
  import { onMount } from 'svelte';
  import { initModeler } from '../modeler';
  import Controls from './Controls.svelte';

  onMount(() => {
    initModeler();
  });
</script>

<div class="sbpm-main">
  <div class="sbpm-modeler" />
  <Controls />
</div>

<style global>
  :root {
    --sbpm-primary-color: #0081a7;
    --sbpm-primary-color-light-variant-1: #009ccc;
    --sbpm-primary-color-light-variant-2: #00ace0;
    --sbpm-secondary-color: #00afb9;
    --sbpm-outline-color: #ffffff;
    --sbpm-outline-color-dark-variant-1: #f5f5f5;
    --sbpm-outline-color-dark-variant-2: #ebebeb;
    --sbpm-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-;
    --sbpm-font-size: 16px;
  }

  .sbpm-main {
    position: relative;
    height: 100%;
    font-family: var(--sbpm-font-family);
    font-size: var(--sbpm-font-size);
  }

  .sbpm-main * {
    font-family: inherit;
    font-size: inherit;
  }

  .sbpm-main > * {
    position: absolute;
    top: 0;
    left: 0;
  }

  .sbpm-modeler {
    z-index: 1  
  }
</style>
