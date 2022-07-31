<script>
  import { isSbpmLinkType } from '@sbpmjs/shared';
  import { currentlySelectedSbpmShape, uiVisible, handleOnUpdate } from '../manager';
  import Frame from './ui/Frame.svelte';
  import Input from './ui/Input.svelte';

  let id = $currentlySelectedSbpmShape?.attributes?.id;
  let label;
  let position;

  currentlySelectedSbpmShape.subscribe((value) => {
    console.log(value);
    id = value.id;
    label = value.attr('label/textWrap/text');
    if (isSbpmLinkType(value.type)) {
      label = value.label(0).attrs?.text?.textWrap?.text;
    }
    position = { ...value.position() };
    value.on('change', (shape) => {
      position = { ...shape.position() };
    });
  });

  $: handleOnUpdate(label, position);
</script>

<div class="sbpm-properties">
  <Frame title="properties">
    <div class="content">
      <Input label="Id:" disabled={true} value={id} />
      {#if label}
        <br />
        <Input label="Label:" bind:value={label} />
      {/if}
    </div>
  </Frame>
</div>

<style>
  .sbpm-properties {
    position: relative;
    z-index: 2;
    height: 100%;
  }

  .content {
    min-width: 400px;
    height: inherit;
  }
</style>
