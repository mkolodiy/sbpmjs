<script>
  export let groupEntries;
  export let onClick;

  let selectedGroupEntry;

  const handleOnclick = (groupEntry) => () => {
    onClick(groupEntry);
    selectedGroupEntry = groupEntry;
  };
</script>

<div class="group">
  <div class="inner-group">
    {#each groupEntries as groupEntry, index (groupEntry.id)}
      <div class="group-entry" class:selected={selectedGroupEntry?.id === groupEntry.id} on:click={handleOnclick(groupEntry)}>
        {groupEntry.label}
      </div>
    {/each}
  </div>
</div>

<style>
  .group {
    border-color: var(--sbpm-primary-color);
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .inner-group {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  .group-entry {
    padding: 10px;
    background-color: var(--sbpm-outline-color);
    color: #000;
    cursor: pointer;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--sbpm-primary-color);
  }

  .group-entry:hover {
    background-color: var(--sbpm-outline-color-dark-variant-1);
  }

  .selected {
    background-color: var(--sbpm-outline-color-dark-variant-2);
  }
</style>
