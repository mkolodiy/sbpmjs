<script>
  import { onMount } from 'svelte';

  import Button from './ui/Button.svelte';
  import Frame from './ui/Frame.svelte';
  import Group from './ui/group/Group.svelte';
  import Input from './ui/Input.svelte';

  const groupEntries = [];

  for (let i = 0; i < 500; i++) {
    groupEntries.push({
      id: i,
      name: `Test ${i}`,
    });
  }
</script>

<Frame title="Process management">
  <div class="layout">
    <Input placeholder="Search" />
    <Button>Create new process group</Button>
    <div><Group {groupEntries} onClick={() => console.log('test')} /></div>
  </div>
</Frame>

<style>
  .layout {
    display: grid;
    gap: 10px;
    grid-template-rows: auto auto 1fr;
    height: 100%;
  }
</style>
