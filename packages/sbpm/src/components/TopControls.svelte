<script>
  import Button from './ui/Button.svelte';
  import Frame from './ui/Frame.svelte';
  import { handleGoHome, handleGoBack, handleOnReset, uiVisible } from '../manager';
  import { arrowBackIcon, centerFocusStrongIcon, homeIcon, visibilityIcon, visibilityOffIcon } from '../icons';
  import IconButton from './ui/IconButton.svelte';

  const toggleVisibility = () => {
    uiVisible.update((prevUiVisible) => !prevUiVisible);
  };
</script>

<div class="sbpm-top-constrols">
  {#if $uiVisible}
    <Frame padded={false}>
      <div class="frame-content">
        <IconButton src={visibilityIcon} title="Show ui elements" on:click={toggleVisibility} />
        <IconButton src={homeIcon} title="Return to process network" on:click={handleGoHome} />
        <IconButton src={arrowBackIcon} title="Go back to previous view" on:click={handleGoBack} />
      </div>
    </Frame>
  {:else}
    <Frame padded={false}>
      <div class="frame-content">
        <IconButton src={visibilityOffIcon} title="Show ui elements" on:click={toggleVisibility} />
      </div>
    </Frame>
  {/if}
</div>

<style>
  .sbpm-top-constrols {
    position: relative;
    width: min-content;
    z-index: 2;
  }

  .frame-content {
    display: flex;
    padding: 0 5px;
  }
</style>
