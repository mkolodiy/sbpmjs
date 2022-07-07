<script lang="ts">
  import { selectedSbpmElement } from '../stores/sbpmElement';
  import Frame from './ui/Frame.svelte';
</script>

{#if $selectedSbpmElement}
  <Frame title="properties">
    {JSON.stringify($selectedSbpmElement)}
  </Frame>
{/if}
