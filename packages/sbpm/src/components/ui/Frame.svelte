<script lang="ts">
    export let title: string;
</script>

<div class="frame">
    {#if title}
        <div class="title">{title}</div>
    {/if} 
    <div class="content"><slot></slot></div>
</div>

<style>
    .frame {
        border-color: var(--sbpm-primary-color);
        border-style: solid;
        border-width: 1px;
        border-radius: 3px;
        max-width: 400px;
        height: inherit;
    }

    .title {
        padding: 10px;
        background-color: var(--sbpm-primary-color);
        color: #fff;
    }

    .content {
        padding: 10px;
    }
</style>