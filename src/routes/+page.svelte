<script lang="ts">
    import MonsterSearch from "./MonsterSearch.svelte";
    import type { Monster } from "$lib/types/monster";
    import MonsterStats from "./MonsterStats.svelte";
    import type { Encounter } from "$lib/types/encounter";
    import EncounterList from "./EncounterList.svelte";
    import EncounterDetails from "./EncounterDetails.svelte";
    import { encounters } from "$lib/stores/encounters";
    import PlayerList from "./PlayerList.svelte";

    let openMonster: Monster;
    let openEncounter: Encounter;

    function monsterSelected(e: any) {
        openMonster = e.detail;

        // TODO: Update this to use new encounter store.
        if (openEncounter) {
            openEncounter.monsters.push(openMonster);
            encounters.updateEncounter(openEncounter);
        }
    }

    function playerSelected(e: any) {
        if (openEncounter) {
            openEncounter.playerIds.push(e.detail.id);
            encounters.updateEncounter(openEncounter);
        }
    }

    function encounterSelected(e: any) {
        openEncounter = e.detail;
    }
</script>

<div class="grid w-screen grid-cols-4 grid-rows-1 gap-4 p-4 h-svh">
    <div class="h-full">
        <MonsterSearch on:select={monsterSelected}/>
    </div>

    <div class="col-span-2 space-y-4">
        {#if !openEncounter?.name}
            <EncounterList on:select={encounterSelected}/>
        {:else}
            <EncounterDetails bind:encounter={openEncounter}/>
            <PlayerList on:select={playerSelected}/>
        {/if}
    </div>

    <div class="h-full">
        <MonsterStats bind:monster={openMonster}/>
    </div>
</div>
