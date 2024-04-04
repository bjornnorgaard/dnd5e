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
    import OpenGraph from "$lib/components/OpenGraph.svelte";
    import { onMount } from "svelte";
    import { tryPersistWithoutPromptingUser } from "$lib/database/persistence";
    import { goto } from "$app/navigation";
    import { routes } from "$lib/constants/routes";

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
    inject({ mode: dev ? 'development' : 'production' });

    onMount(async () => {
        await initStoragePersistence();
    })

    async function initStoragePersistence() {
        const res = await tryPersistWithoutPromptingUser();
        switch (res) {
            case "never":
                console.log("Not possible to res storage");
                break;
            case "persisted":
                console.log("Successfully persisted storage silently");
                break;
            case "prompt":
                console.log("Not persisted, but we may prompt user when we want to.");
                await goto(routes.persistence())
                break;
        }
    }
</script>

<OpenGraph/>

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
