<script>
    import Base from './components/Base.svelte';
    import Frame from './components/ui/Frame.svelte';
    import Input from './components/ui/Input.svelte';

    let testValue;
</script>

<Base>
    <Frame title="Process management">
        <Input bind:value={testValue} placeholder="Search"/>
    </Frame>
    <Input bind:value={testValue} placeholder="Search"/>
    <p>{testValue}</p>
</Base>