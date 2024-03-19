<script lang="ts">
    import MonsterSearch from "./MonsterSearch.svelte";
    import MonsterStats from "./MonsterStats.svelte";
    import EncounterList from "./EncounterList.svelte";
    import EncounterDetails from "./EncounterDetails.svelte";
    import PlayerList from "./PlayerList.svelte";
    import { tracker } from "$lib/stores/tracker";

    function monsterSelected(e: any) {
        tracker.setActiveMonster(e.detail);
    }

    function playerSelected(e: any) {
        tracker.setActivePlayerId(e.detail.id);
    }

    function encounterSelected(e: any) {
        tracker.setActiveEncounterId(e.detail.id);
    }
</script>

<div class="grid w-screen grid-cols-4 grid-rows-1 gap-4 p-4 h-svh">
    <div class="h-full">
        <MonsterSearch on:select={monsterSelected}/>
    </div>

    <div class="col-span-2 space-y-4">
        {#if !$tracker.activeEncounterId}
            <EncounterList on:select={encounterSelected}/>
        {:else}
            <EncounterDetails bind:encounterId={$tracker.activeEncounterId}/>
            <PlayerList on:select={playerSelected}/>
        {/if}
    </div>

    <div class="h-full">
        {#if $tracker.activeMonster}
            <MonsterStats bind:monster={$tracker.activeMonster}/>
        {/if}
    </div>
</div>
