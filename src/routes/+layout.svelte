<script lang="ts">
    import "../app.pcss";
    import { AppShell, autoModeWatcher, storePopup } from '@skeletonlabs/skeleton';
    import SideNav from "./SideNav.svelte";
    import { cubicIn } from "svelte/easing";
    import CreatureStats from "$lib/components/CreatureStats.svelte";
    import { statblock } from "$lib/stores/statblock";
    import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
    import { slide } from "svelte/transition";

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<AppShell>
    <svelte:fragment slot="sidebarLeft">
        <SideNav/>
    </svelte:fragment>

    <main class="h-full">
        <slot/>
    </main>

    <svelte:fragment slot="sidebarRight">
        {#if $statblock.isOpen}
            <div class="w-96 p-4" in:slide={{axis: "x", duration: 100}} out:slide={{axis: "x", easing: cubicIn}}>
                <CreatureStats/>
            </div>
        {/if}
    </svelte:fragment>
</AppShell>
