<script>
  import { processGroups } from '../stores/processGroup';
  import Button from './ui/Button.svelte';
  import Frame from './ui/Frame.svelte';
  import Input from './ui/Input.svelte';
  import Group from './ui/Group.svelte';
  import NodeTree from './NodeTree.svelte';
  import Node from './Node.svelte';
  import ProcessNetworkTree from './process-network-tree/ProcessNetworkTree.svelte';
  import Properties from './Properties.svelte';
  import { selectedSbpmElement } from '../stores/sbpmElement';
  import { processes } from '../stores/processes';

  let searchTerm;
  let selectedProcessGroup;

  $: filteredProcessGroups = $processGroups.filter((processGroup) => {
    return processGroup.label.toLowerCase().includes(searchTerm);
  });

  const handleSelectProcessGroup = (processGroup) => {
    console.log(processGroup);
    // selectedProcessGroup.update((prevSelectedProcessGroup) => {
    //   console.log('test');
    //   console.log(prevSelectedProcessGroup);
    //   return processGroup;
    // });
    selectedProcessGroup = processGroup;
    selectedSbpmElement.update((prevSelectedSbpmElement) => {
      console.log('test');
      console.log(prevSelectedSbpmElement);
      return processGroup;
    });
  };

  const onSelect = (value) => {
    console.log(value);
    selectedSbpmElement.update(() => value);
  };
</script>

<div class="wrapper">
  <Frame title="Process group management">
    <div class="layout">
      <Button>Create a new process group</Button>
      <Input placeholder="Search process groups" bind:value={searchTerm} />
      <Group groupEntries={filteredProcessGroups} onClick={handleSelectProcessGroup} />
    </div>
  </Frame>
  <!-- <NodeTree /> -->
  <!-- <Node /> -->
  {#if selectedProcessGroup}
    <ProcessNetworkTree sbpmElement={selectedProcessGroup} {onSelect} />
  {/if}
  <Properties />
</div>
{JSON.stringify($processes)}

<style>
  .wrapper {
    display: grid;
    gap: 50px;
    grid-template-columns: 400px 1fr 400px;
    height: 100%;
  }

  .layout {
    display: grid;
    gap: 10px;
    grid-template-rows: auto auto 1fr;
    height: 100%;
  }
</style>
