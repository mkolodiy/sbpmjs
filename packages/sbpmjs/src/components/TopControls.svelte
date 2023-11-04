<script>
  import { homeIcon } from '../icons/ui/home';
  import { visibilityOnIcon } from '../icons/ui/visibilityOn';
  import { visibilityOffIcon } from '../icons/ui/visibilityOff';
  import { handlers, svelteStores } from '../sbpm';
  import Frame from './ui/Frame.svelte';
  import IconButton from './ui/IconButton.svelte';

  const uiVisible = svelteStores.uiVisible;
</script>

<div class="sbpm-top-constrols">
  {#if $uiVisible}
    <Frame padded={false}>
      <div class="frame-content">
        <IconButton
          src={visibilityOnIcon}
          title="Show ui elements"
          on:click={svelteStores.toggleUiVisible}
        />
        <IconButton
          src={homeIcon}
          title="Return to process network"
          on:click={handlers.goHome}
        />
      </div>
    </Frame>
  {:else}
    <Frame padded={false}>
      <div class="frame-content">
        <IconButton
          src={visibilityOffIcon}
          title="Show ui elements"
          on:click={svelteStores.toggleUiVisible}
        />
      </div>
    </Frame>
  {/if}
</div>

<style>
  .sbpm-top-constrols {
    position: relative;
    width: min-content;
    z-index: 2;
    flex: auto;
  }

  .frame-content {
    display: flex;
    padding: 5px;
  }
</style>
