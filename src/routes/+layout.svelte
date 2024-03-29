<script lang="ts">
    import "../app.pcss";
    import { AppShell, storePopup } from '@skeletonlabs/skeleton';
    import NavSide from "$lib/components/NavSide.svelte";
    import { statblock } from "$lib/stores/statblock";
    import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
    import { slide } from "svelte/transition";
    import NavBottom from "$lib/components/NavBottom.svelte";
    import { inject } from '@vercel/analytics'
    import { dev } from "$app/environment";
    import CreatureStatblock from "$lib/components/CreatureStatblock.svelte";
    import GlobalSearch from "$lib/components/GlobalSearch.svelte";

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    inject({ mode: dev ? 'development' : 'production' });
</script>

<GlobalSearch/>

<AppShell>
    <svelte:fragment slot="sidebarLeft">
        <div class="hidden h-screen md:block">
            <NavSide/>
        </div>
    </svelte:fragment>

    <main class="h-full">
        <slot/>
    </main>

    <svelte:fragment slot="sidebarRight">
        {#if $statblock.isOpen}
            <div class="w-96 p-4" in:slide={{axis: "x", duration: 300}} out:slide={{axis: "x", duration: 300}}>
                <CreatureStatblock creature={$statblock.creature}/>
            </div>
        {/if}
    </svelte:fragment>

    <svelte:fragment slot="footer">
        <div class="md:hidden">
            <NavBottom/>
        </div>
    </svelte:fragment>
</AppShell>
