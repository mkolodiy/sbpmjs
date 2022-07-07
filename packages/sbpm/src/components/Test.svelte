<script>
  import { modeler } from '../modeler';

  const addElement = () => {
    modeler.addElement('ProcessNetwork', {
      label: 'test',
      position: {
        x: 100,
        y: 100,
      },
    });
  };
</script>

<button on:click={addElement}>Test</button>
