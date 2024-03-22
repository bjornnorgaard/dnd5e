<script lang="ts">
    import type { Monster } from "$lib/types/monster";
    import MonsterStats from "$lib/components/MonsterStats.svelte";
    import MonsterSearch from "$lib/components/MonsterSearch.svelte";
    import { slide } from "svelte/transition";
    import { cubicIn, cubicOut } from "svelte/easing";
    import PageWrapper from "$lib/components/PageWrapper.svelte";

    let selectedMonster: Monster | null = null;

    function monsterSelected(e: CustomEvent<Monster>) {
        selectedMonster = e.detail;
    }
</script>

<PageWrapper title="D&D 5th SRD Beastiary">
    <div class="flex gap-4">
        <div class="grow space-y-4">
            <MonsterSearch on:select={monsterSelected}/>
        </div>
        {#if selectedMonster}
            <div class="w-96" in:slide={{axis: "x", easing: cubicOut, duration: 100}} out:slide={{axis: "x", easing: cubicIn}}>
                <MonsterStats bind:monster={selectedMonster}/>
            </div>
        {/if}
    </div>
</PageWrapper>
