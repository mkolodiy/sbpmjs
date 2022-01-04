<script lang="ts">
    export let variant: 'primary' | 'outline' = 'primary';    
    const {disabled = false, ...restProps} = $$restProps;
</script>

<button 
    class="button" 
    class:primary={variant === 'primary'} 
    class:outline={variant === 'outline'}
    class:disabled={disabled}
    disabled={disabled}
    on:click
    {...restProps}
>
        <slot></slot>
</button>

<style>
    .button {
        padding: 10px;
        border-style: solid;
        border-width: 1px;
        border-radius: 3px;
        cursor: pointer;
    }

    .primary {
        background-color: var(--sbpm-primary-color);
        border-color: var(--sbpm-primary-color);
        color: #fff;
    }

    .primary:hover {
        background-color: var(--sbpm-primary-color-light-variant-1);
        border-color: var(--sbpm-primary-color-light-variant-1);
    }

    .primary:focus {
        background-color: var(--sbpm-primary-color-light-variant-2);
        border-color: var(--sbpm-primary-color-light-variant-2);
    }

    .outline {
        background-color: var(--sbpm-outline-color);
        border-color: var(--sbpm-primary-color);
        color: #000;
    }

    .outline:hover {
        background-color: var(--sbpm-outline-color-dark-variant-1);
    }

    .outline:focus {
        background-color: var(--sbpm-outline-color-dark-variant-2);
    }

    .disabled {
        cursor: auto;
        background-color: #d3d3d3;
        color: #000;
        border-color: #d3d3d3;
    }

    .disabled:hover {
        background-color: #d3d3d3; 
        border-color: #d3d3d3;
    }

    .disabled:focus {
        background-color: #d3d3d3; 
        border-color: #d3d3d3;
    }
</style>