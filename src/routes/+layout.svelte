<script lang="ts">
    import "../app.pcss";
    import { autoModeWatcher } from '@skeletonlabs/skeleton';

    // const routes = [
    //     { label: "Monsters", route: "/monsters" },
    //     { label: "Players", route: "/players" },
    //     { label: "Parties", route: "/parties" },
    //     { label: "Encounters", route: "/encounters" },
    //     { label: "Overview", route: "/" },
    // ];
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<main>
    <slot/>
</main>
