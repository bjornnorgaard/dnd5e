<script lang="ts">
    import "../app.pcss";
    import { AppShell, autoModeWatcher } from '@skeletonlabs/skeleton';
    import SideNav from "./SideNav.svelte";
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<AppShell>
    <svelte:fragment slot="sidebarLeft">
        <SideNav/>
    </svelte:fragment>

    <main class="h-full">
        <slot/>
    </main>
</AppShell>


