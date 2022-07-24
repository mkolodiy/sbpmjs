<script>
  export let title = undefined;
  export let padded = true;
</script>

<div class="frame">
  {#if title}
    <div class="title" class:title-padded={padded}>{title}</div>
  {/if}
  <div class="content" class:content-padded={padded}><slot /></div>
</div>

<style>
  .frame {
    background-color: #fff;
    border-color: var(--sbpm-primary-color);
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    width: fit-content;
    height: inherit;
    display: flex;
    flex-direction: column;
    height: fit-content;
  }

  .title {
    background-color: var(--sbpm-primary-color);
    color: #fff;
  }

  .title-padded {
    padding: 10px;
  }

  .content {
    flex: 1;
  }

  .content-padded {
    padding: 10px;
  }
</style>
