<script lang="ts">
  import { onMount } from 'svelte';
  import { handlers, modeler, state, svelteStores } from '../sbpm';
  import Layout from './Layout.svelte';
  import type { DragEventHandler } from 'svelte/elements';
  import type { SbpmElementType } from '@sbpmjs/shared';
  import { get } from 'svelte/store';

  onMount(() => {
    const container = document.getElementById('sbpm-modeler')!;
    modeler.initModelerWithDefaults(container);
  });

  const drop: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.dataTransfer) {
      const type = event.dataTransfer.getData('text/plain');
      handlers.drop(type as SbpmElementType, { x: event.x, y: event.y });
    }
  };

  const log = () => {
    console.log('state', state.getItems());
    console.log('viewedSbpmItem', get(svelteStores.viewedSbpmItem));
    console.log('selectedSbpmItem', get(svelteStores.selectedSbpmItem));
    console.log('uiVisible', get(svelteStores.uiVisible));
  };
</script>

<button on:click={log}>Log</button>
<div class="sbpm-main">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    id="sbpm-modeler"
    on:drop={drop}
    on:dragover={(event) => {
      event.preventDefault();
    }}
  />
  <Layout />
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
    --sbpm-shade-color: #ebfaff;
    --sbpm-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-;
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

  #sbpm-modeler {
    z-index: 1;
  }
</style>
