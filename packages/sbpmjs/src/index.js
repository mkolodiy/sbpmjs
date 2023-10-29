import App from './App.svelte';
export class Sbpm {
    constructor(options) {
        if (!options.container) {
            throw new Error('container is required');
        }
        new App({
            target: options.container,
        });
    }
}
//# sourceMappingURL=index.js.map