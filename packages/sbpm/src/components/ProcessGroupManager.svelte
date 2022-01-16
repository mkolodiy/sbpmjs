<script>
  import { groupEntries } from '../dummyData';
  import Button from './ui/Button.svelte';
  import Frame from './ui/Frame.svelte';
  import Input from './ui/Input.svelte';
  import Group from './ui/Group.svelte';
  import NodeTree from './NodeTree.svelte';
  import Node from './Node.svelte';

  let searchTerm;

  $: filteredGroupEntries = groupEntries.filter((groupEntry) => {
    return groupEntry.name.toLowerCase().includes(searchTerm);
  });
</script>

<div class="wrapper">
  <Frame title="Process group management">
    <div class="layout">
      <Button>Create a new process group</Button>
      <Input placeholder="Search process groups" bind:value={searchTerm} />
      <Group groupEntries={filteredGroupEntries} onClick={() => console.log('test')} />
    </div>
  </Frame>
  <!-- <NodeTree /> -->
  <Node />
</div>

<style>
  .wrapper {
    display: grid;
    gap: 50px;
    grid-template-columns: 400px 1fr;
    height: 100%;
  }

  .layout {
    display: grid;
    gap: 10px;
    grid-template-rows: auto auto 1fr;
    height: 100%;
  }
</style>
