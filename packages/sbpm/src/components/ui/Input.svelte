<script lang="ts">
    export let value = '';
    export let label: string;

    const {name, ...restProps} = $$restProps;
</script>

<span class="container">
    {#if label}
        <label class="label" for={name}>{label}</label>
    {/if} 
    <input class="input" bind:value={value} name={name} {...restProps}>
</span>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    .label {
        margin-bottom: 10px;
    }

    .input {
        padding: 10px;
        flex: 1;
        border-color: var(--sbpm-primary-color);
        border-style: solid;
        border-width: 1px;
        border-radius: 3px;
    }

    .input:focus-visible {
       outline-color: var(--sbpm-primary-color);
    }
</style>