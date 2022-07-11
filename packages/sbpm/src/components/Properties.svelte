<script>
  import { currentlySelectedSbpmShape } from '../manager';
  import Frame from './ui/Frame.svelte';
  $: console.log($currentlySelectedSbpmShape?.attributes);
</script>

{#if $currentlySelectedSbpmShape}
  <Frame title="properties">
    {JSON.stringify($currentlySelectedSbpmShape?.attributes)}
  </Frame>
{/if}
