<script>
  import { isSbpmLinkType } from '@sbpmjs/shared';
  import { currentlySelectedSbpmShape, uiVisible, handleOnUpdate, optionsContainer } from '../manager';
  import { optionsMapping } from '../manager/options-mapping';
  import Frame from './ui/Frame.svelte';
  import Input from './ui/Input.svelte';

  const type = $currentlySelectedSbpmShape.type;

  currentlySelectedSbpmShape.subscribe((value) => {
    const updatableOptions = value.getUpdatableOptions();

    for (const key of Object.keys($optionsContainer)) {
      $optionsContainer[key] = updatableOptions[key];
    }

    $optionsContainer.id = value.id;

    value.on('change', (shape) => {
      $optionsContainer.position = { ...shape.position() };
    });
  });

  $: handleOnUpdate($optionsContainer);
</script>

<div class="sbpm-properties">
  <Frame title="properties">
    <div class="content">
      {#each Object.entries(optionsMapping[type]) as option}
        <Input label={option[1].label} disabled={option[1].disabled} bind:value={$optionsContainer[option[0]]} />
      {/each}
    </div>
  </Frame>
</div>

<style>
  .sbpm-properties {
    position: relative;
    z-index: 2;
    height: 100%;
  }

  .content {
    min-width: 400px;
    height: inherit;
  }
</style>
