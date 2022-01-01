<div class="sbpm-container">
    <slot></slot>
</div>

<style global>
   :root {
    --sbpm-primary-color: #0081A7;
    --sbpm-primary-color-light-variant-1: #009CCC;
    --sbpm-primary-color-light-variant-2: #00ACE0;
    --sbpm-outline-color: #FFFFFF;
    --sbpm-outline-color-dark-variant-1: #F5F5F5;
    --sbpm-outline-color-dark-variant-2: #EBEBEB;
    --sbpm-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-;
    --sbpm-font-size: 16px;
   }

   .sbpm-container {
       font-family: var(--sbpm-font-family);
       font-size: var(--sbpm-font-size);
       height: inherit;
   }

   .sbpm-container * {
       font-family: inherit;
       font-size: inherit;
   }
</style>