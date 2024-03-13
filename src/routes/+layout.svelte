<script lang="ts">
    import "../app.pcss";
    import { autoModeWatcher } from '@skeletonlabs/skeleton';

    const routes = [
        { label: "Monsters", route: "/monsters" },
        { label: "Players", route: "/players" },
        { label: "Parties", route: "/parties" },
        { label: "Encounters", route: "/encounters" },
    ];
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<div class="mx-auto flex flex-col gap-4 p-4">
    <header class="flex flex-col gap-4 p-4">
        <hgroup>
            <h1 class="font-bold tracking-wide h1">D&amp;D by Bear</h1>
            <p class="italic">Collection of somewhat useful tools</p>
        </hgroup>

        <nav>
            <ul class="flex justify-end gap-4">
                {#each routes as r}
                    <li><a class="anchor" href="{r.route}">{r.label}</a></li>
                {/each}
            </ul>
        </nav>
    </header>

    <main>
        <slot/>
    </main>

</div>
