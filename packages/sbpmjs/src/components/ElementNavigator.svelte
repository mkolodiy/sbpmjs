<script lang="ts">
  import type { SbpmProcessItem } from '@sbpmjs/shared';
  import Input from './ui/Input.svelte';
  import { elementNavigatorItems, currentlySelectedNavigatorItem, updateCurrentlySelectedNavigatorItem } from '../core/svelte-stores/elementNavigatorItems';
  import { handleOnSelectNavigationItem } from '../core/handlers';

  let value = '';
  let isFocused = false;
  let element: HTMLDivElement;
  let input: HTMLInputElement;

  const compareLabels = (actual: string, expected: string) => {
    return actual.toLowerCase().includes(expected.toLocaleLowerCase());
  };

  const compareIds = (actual: string, expected: string) => {
    return actual === expected;
  };

  $: filteredItems = $elementNavigatorItems?.filter((item) => compareLabels(item.properties.label, value.toLocaleLowerCase()));

  const onFocus = () => (isFocused = true);

  // @ts-ignore
  const onFocusIn = (event) => {
    if (!(element.contains(event.target) || element.contains(event.relatedTarget))) {
      isFocused = false;
      input.blur();
    }
  };

  const onSelectItem = (item: SbpmProcessItem) => () => {
    updateCurrentlySelectedNavigatorItem(item);
    value = '';
    isFocused = false;
    handleOnSelectNavigationItem(item);
  };
</script>

<svelte:window on:focusin={onFocusIn} on:click={onFocusIn} />

<div class="element-navigator" bind:this={element}>
  <Input
    placeholder={`${$currentlySelectedNavigatorItem?.properties.label} (${$currentlySelectedNavigatorItem?.properties.id})`}
    bind:value
    on:focus={onFocus}
    bind:input
  />
  {#if isFocused}
    <div class="select">
      {#if filteredItems.length === 0}
        <div class="not-found-item">No elements found</div>
      {:else}
        {#each filteredItems as item}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="select-item"
            class:select-item-selected={compareIds(item.properties.id, $currentlySelectedNavigatorItem.properties.id)}
            on:click={onSelectItem(item)}
          >
            {item.properties.label} ({item.properties.id})
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .element-navigator {
    position: relative;
    width: min-content;
    z-index: 2;
    flex: 1;
  }

  .select {
    margin-top: 10px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 2px 3px 0 rgb(0, 129, 167, 0.24);
    overflow-y: auto;
    max-height: 400px;
    position: absolute;
    width: 100%;
  }

  .not-found-item {
    height: 33px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .select-item {
    height: 33px;
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .select-item:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .select-item:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .select-item:hover:not(.select-item-selected) {
    background-color: var(--sbpm-shade-color);
  }

  .select-item-selected {
    background-color: var(--sbpm-primary-color);
    color: #fff;
  }
</style>
