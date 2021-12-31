<div class="sbpm-container">
    <slot></slot>
</div>

<style global>
   :root {
    --sbpm-main-color: #0081A7;
    --sbpm-secondary-color: #00AFB9;  
    --sbpm-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-
   }

   .sbpm-container {
       font-family: var(--sbpm-font-family);
       height: inherit;
   }

   .sbpm-container * {
       font-family: inherit;
   }
</style>