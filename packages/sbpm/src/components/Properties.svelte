<script>
  import { currentlySelectedSbpmShape, uiVisible } from '../manager';
  import Frame from './ui/Frame.svelte';
</script>

{#if $currentlySelectedSbpmShape && $uiVisible}
  <div class="sbpm-properties">
    <Frame title="properties">
      {JSON.stringify($currentlySelectedSbpmShape?.attributes?.id)}
    </Frame>
  </div>
{/if}

<style>
  .sbpm-properties {
    position: relative;
    z-index: 2;
    height: 100%;
  }
</style>
