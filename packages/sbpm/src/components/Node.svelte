<script>
  let selected = false;

  const selectNode = () => (selected = true);
</script>

<div class="node">
  <div class="symbol-wrapper" on:click={selectNode}>
    <div class="symbol" />
    <div class="symbol-selection" class:symbol-selection-active={selected} />
  </div>
  <div class="actions">Actions</div>
  <div class="expand-action">Expand action</div>
  <div class="children">Children</div>
</div>

<style>
  .node {
    display: grid;
    grid-template: 'a b' 'c d';
    gap: 10px;
    height: min-content;
    width: min-content;
  }

  .symbol-wrapper {
    grid-area: 'a';
    width: 155px;
    height: 155px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .symbol-selection {
    width: 155px;
    height: 155px;
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
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .actions {
    grid-area: 'b';
  }

  .expand-action {
    grid-area: 'c';
  }

  .children {
    grid-area: 'd';
  }
</style>
