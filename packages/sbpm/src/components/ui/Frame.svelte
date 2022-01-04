<script>
  export let title;
</script>

<div class="frame">
  <div class="title">{title}</div>
  <div class="content"><slot /></div>
</div>

<style>
  .frame {
    border-color: var(--sbpm-primary-color);
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    max-width: 400px;
    height: inherit;
    display: flex;
    flex-direction: column;
  }

  .title {
    background-color: var(--sbpm-primary-color);
    color: #fff;
    padding: 10px;
  }

  .content {
    padding: 10px;
    flex: 1;
  }
</style>
