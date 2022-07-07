<script>
  import Button from './ui/Button.svelte';
  import DeleteSvg from '../assets/icons/delete.svg';
  import AddSvg from '../assets/icons/add.svg';
  import ArrowDromDownSvg from '../assets/icons/arrow_drop_down.svg';

  let selected = false;

  const selectNode = () => (selected = true);
</script>

<div class="node">
  <div class="symbol-wrapper" on:click={selectNode}>
    <div class="symbol" />
    <div class="symbol-selection" class:symbol-selection-active={selected} />
  </div>
  <div>
    <div class="actions">
      <Button size="small"><DeleteSvg fill="#fff" /></Button>
      <Button size="small"><AddSvg fill="#fff" /></Button>
    </div>
    <div>Process group 1</div>
  </div>
  <div class="expand-action">
    <Button size="small"><ArrowDromDownSvg fill="#fff" /></Button>
  </div>
  <div class="children">Children</div>
</div>

<style>
  .node {
    display: grid;
    grid-template: 'a b' 'c d';
    gap: 10px;
    height: fit-content;
    width: fit-content;
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
    background-image: url('../assets/symbols/process_group.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .actions {
    border-color: var(--sbpm-primary-color);
    margin-bottom: 10px;
  }

  .expand-action {
    text-align: center;
  }

  .children {
  }
</style>
