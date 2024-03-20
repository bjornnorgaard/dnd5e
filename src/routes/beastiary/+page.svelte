<script lang="ts">
    import type { Monster } from "$lib/types/monster";
    import MonsterStats from "$lib/components/MonsterStats.svelte";
    import MonsterSearch from "$lib/components/MonsterSearch.svelte";
    import { slide } from "svelte/transition";
    import { cubicIn, cubicInOut, cubicOut } from "svelte/easing";

    let selectedMonster: Monster | null = null;

    function search(e: any) {
        console.log("search event", e);
    }

    function monsterSelected(e: CustomEvent<Monster>) {
        selectedMonster = e.detail;
    }
</script>

<div class="flex p-4 gap-4">
    <div class="flex flex-col   grow">
        <h1 class="font-bold h1">D&D 5th SRD Beastiary</h1>
        <MonsterSearch on:select={monsterSelected}/>
    </div>

    {#if selectedMonster}
        <div class="w-96" in:slide={{axis: "x", easing: cubicOut, duration: 100}} out:slide={{axis: "x", easing: cubicIn}}>
            <MonsterStats bind:monster={selectedMonster}/>
        </div>
    {/if}
</div>
