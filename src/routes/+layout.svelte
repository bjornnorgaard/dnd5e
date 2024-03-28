<script lang="ts">
    import "../app.pcss";
    import { AppShell, storePopup } from '@skeletonlabs/skeleton';
    import NavSide from "$lib/components/NavSide.svelte";
    import { cubicIn } from "svelte/easing";
    import CreatureStats from "$lib/components/CreatureStats.svelte";
    import { statblock } from "$lib/stores/statblock";
    import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
    import { slide } from "svelte/transition";
    import NavBottom from "$lib/components/NavBottom.svelte";

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<AppShell>
    <svelte:fragment slot="sidebarLeft">
        <div class="hidden md:block">
            <NavSide/>
        </div>
    </svelte:fragment>

    <main class="h-full">
        <slot/>
    </main>

    <svelte:fragment slot="sidebarRight">
        {#if $statblock.isOpen}
            <div class="w-96 p-4" in:slide={{axis: "x", duration: 100}} out:slide={{axis: "x", easing: cubicIn}}>
                <CreatureStats creature={$statblock.creature}/>
            </div>
        {/if}
    </svelte:fragment>

    <svelte:fragment slot="footer">
        <div class="md:hidden">
            <NavBottom/>
        </div>
    </svelte:fragment>
</AppShell>
