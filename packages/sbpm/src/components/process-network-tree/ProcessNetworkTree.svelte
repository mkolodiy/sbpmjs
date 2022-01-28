<script lang="ts">
  import { SbpmContainerElement } from '../../common/types';
  import Button from '../ui/Button.svelte';
  import DeleteSvg from '../../assets/icons/delete.svg';
  import AddSvg from '../../assets/icons/add.svg';
  import ArrowDromDownSvg from '../../assets/icons/arrow_drop_down.svg';
  import ProcessGroupSvg from '../../assets/symbols/process_group.svg';
  import ProcessModelSvg from '../../assets/symbols/process_model.svg';
  import StandardLayerSvg from '../../assets/symbols/standard_layer.svg';
  import { selectedSbpmElement } from '../../stores/sbpmElement';

  export let sbpmElement: SbpmContainerElement;
  export let onSelect: (sbpmElement: SbpmContainerElement) => void;
  export let onDelete: (sbpmElement: SbpmContainerElement) => void;
  export let onAdd: (sbpmElement: SbpmContainerElement) => void;
  export let onOpen: (sbpmElement: SbpmContainerElement) => void;

  $: selected = $selectedSbpmElement.id === sbpmElement.id;

  const handleOnSelect = () => {
    onSelect(sbpmElement);
  };
</script>

<div class="node" class:node-no-children={!sbpmElement?.children}>
  <div class="symbol-wrapper" class:symbol-active={selected} on:click={handleOnSelect}>
    <div class="symbol">
      {#if sbpmElement.type === 'SBPM_PROCESS_GROUP'}
        <ProcessGroupSvg width="150" height="150" />
      {:else if sbpmElement.type === 'SBPM_PROCESS_MODEL'}
        <ProcessModelSvg width="150" height="150" />
      {:else if sbpmElement.type === 'SBPM_STANDARD_LAYER'}
        <StandardLayerSvg width="150" height="150" />
      {:else}
        todo
      {/if}
    </div>
    <div class="symbol-selection" class:symbol-selection-active={selected} />
  </div>
  <div>
    <div class="actions">
      <Button size="small"><DeleteSvg fill="#fff" /></Button>
      <Button size="small"><AddSvg fill="#fff" /></Button>
    </div>
    <div>{sbpmElement.label}</div>
  </div>
  <div class="expand-action">
    <Button size="small"><ArrowDromDownSvg fill="#fff" /></Button>
  </div>
  {#if sbpmElement?.children}
    <div class="children">
      {#each sbpmElement?.children as child}
        <svelte:self sbpmElement={child} {onSelect} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .node {
    display: grid;
    grid-template: 'a b' 'c d';
    gap: 10px;
    height: fit-content;
    width: fit-content;
  }

  .node-no-children {
    margin-bottom: 36px;
  }

  .symbol-wrapper {
    width: 155px;
    height: 155px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .symbol-selection {
    width: 152px;
    height: 152px;
    position: absolute;
    pointer-events: none;
  }

  .symbol-selection-active {
    border-color: var(--sbpm-primary-color);
    border-style: dashed;
    border-width: 3px;
    border-radius: 3px;
  }

  .symbol {
    cursor: pointer;
    width: 150px;
    height: 150px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .symbol-active {
    pointer-events: none;
  }

  .actions {
    border-color: var(--sbpm-primary-color);
    margin-bottom: 10px;
  }

  .expand-action {
    text-align: center;
  }

  .children {
    margin-top: 36px;
  }
</style>
