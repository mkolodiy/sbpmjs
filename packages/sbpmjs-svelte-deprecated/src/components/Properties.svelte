<script>
  import { isSbpmLinkType } from '@sbpmjs/shared';
  import { optionsMapping } from '../core/options-mapping';
  import Frame from './ui/Frame.svelte';
  import Input from './ui/Input.svelte';
  import { currentlySelectedSbpmShape } from '../core/svelte-stores/currentlySelectedSbpmShape';
  import { currentlySelectedNavigatorItem } from '../core/svelte-stores/elementNavigatorItems';
  import { optionsContainer } from '../core/svelte-stores/optionsContainer';
  import { handleOnUpdate } from '../core/handlers';
  import { getItemById } from '../core/store';
  import Select from './ui/Select.svelte';

  import { getSenderTransitions, getReceiveTransitions, getSenderSubjects, getReceiverSubjects } from '../core/manager';

  $: type = $currentlySelectedSbpmShape.type;

  // $: console.log($currentlySelectedNavigatorItem);
  // $: console.log(getSenderTransitions($currentlySelectedNavigatorItem.properties.id, String($currentlySelectedSbpmShape.id)));
  // $: console.log(getReceiveTransitions($currentlySelectedNavigatorItem.properties.id, String($currentlySelectedSbpmShape.id)));
  // $: console.log(getSenderSubjects(getSenderTransitions($currentlySelectedNavigatorItem.properties.id, String($currentlySelectedSbpmShape.id))));
  // $: console.log(getReceiverSubjects(getReceiveTransitions($currentlySelectedNavigatorItem.properties.id, String($currentlySelectedSbpmShape.id))));

  currentlySelectedSbpmShape.subscribe((value) => {
    const properties = structuredClone(getItemById(value.id).properties);
    optionsContainer.update(() => properties);

    value.on('change', (shape) => {
      optionsContainer.update((prevOptionsContainer) => ({
        ...prevOptionsContainer,
        position: { ...shape.position() },
      }));
    });
  });

  $: handleOnUpdate($optionsContainer);
</script>

<div class="sbpm-properties">
  <Frame title="properties">
    <div class="content">
      {#each Object.entries(optionsMapping[type]) as option}
        {#if option[1].type === 'input'}
          <Input label={option[1].label} disabled={option[1].disabled} bind:value={$optionsContainer[option[0]]} />
        {:else if option[1].type === 'select' && Array.isArray(option[1].selectOptions)}
          <Select label={option[1].label} options={option[1].selectOptions} bind:value={$optionsContainer[option[0]]} />
        {:else if option[1].type === 'select'}
          <Select
            label={option[1].label}
            options={option[1].selectOptions($optionsContainer[option[1].dependency])}
            bind:value={$optionsContainer[option[0]]}
          />
        {/if}
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
