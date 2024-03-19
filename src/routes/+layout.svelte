<script lang="ts">
    import "../app.pcss";
    import { autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<slot/>
