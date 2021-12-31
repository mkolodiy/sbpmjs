<script>
    export let placeholder = '';
    export let value = '';
</script>

<span class="container">
    <input class="input" bind:value={value} placeholder={placeholder}>
</span>

<style>
    .container {
        display: flex;
    }

    .input {
        padding: 10px;
        flex: 1;
    }
</style>