<script>
  export let src;
  export let title;
</script>

<div class="icon-button" {title} on:click {...$$restProps}>
  <img {src} alt={title} width="32" height="32" />
</div>

<style>
  .icon-button {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
</style>
