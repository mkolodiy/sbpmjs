<script>
    import Base from './components/Base.svelte';
    import Button from './components/ui/Button.svelte';
    import Frame from './components/ui/Frame.svelte';
    import Input from './components/ui/Input.svelte';

    let testValue;
</script>

<Base>
    <Frame title="Process management">
        <div>
            <Input bind:value={testValue} label="Test" placeholder="Search"/>
            <Input bind:value={testValue} label="Test" placeholder="Search"/>
        </div>
        <br>
        <div>
            <Button>Test Button</Button>
            <Button variant="outline">Test Button</Button>
            <Button disabled>Test Button</Button>
            <Button variant="outline" disabled>Test Button</Button>
        </div>
    </Frame>
    <p>{testValue}</p>
</Base>