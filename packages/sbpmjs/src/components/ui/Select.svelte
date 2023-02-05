<script>
  export let options = [];
  export let label = undefined;
  export let value = '';

  const { name, disabled = false, ...restProps } = $$restProps;
</script>

<span class="container">
  {#if label}
    <label class="label" for={name}>{label}</label>
  {/if}
  <select class="select" bind:value {name} {...restProps}>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</span>

<style>
  .container {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .label {
    margin-bottom: 10px;
  }

  .select {
    padding: 10px;
    flex: 1;
    border-color: var(--sbpm-primary-color);
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
  }

  .select-disabled {
    cursor: not-allowed;
  }

  .select:focus-visible {
    outline-color: var(--sbpm-primary-color);
  }
</style>
