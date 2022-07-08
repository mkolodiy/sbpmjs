<script>
  import { restoreView_v1 } from '../graph';
  import { modeler, restoreView_v2 } from '../modeler';

  const addElement = () => {
    // const processNetwork = modeler.addElement('ProcessNetwork', {
    //   id: 'processNetwork01',
    //   label: 'Process network',
    //   position: {
    //     x: 100,
    //     y: 100,
    //   },
    // });

    // const processModel = modeler.addElement('ProcessModel', {
    //   id: 'processModel01',
    //   label: 'Process model',
    //   position: {
    //     x: 400,
    //     y: 100,
    //   },
    // });

    // modeler.addLink('ProcessTransition', {
    //   id: 'processTransition01',
    //   source: processNetwork,
    //   target: processModel,
    // });

    // console.log(modeler.canvas.graph.toJSON());

    restoreView_v2('defaultView');
  };
</script>

<button on:click={addElement}>Test</button>
