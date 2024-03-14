<script lang="ts">
    import { encounters } from "$lib/stores/encounters";
    import { createEventDispatcher } from "svelte";
    import type { Encounter } from "$lib/types/encounter";

    const dispatcher = createEventDispatcher();

    function encounterClicked(encounter: Encounter) {
        dispatcher("select", encounter);
    }
</script>

<div class="table-container">
    <table class="table table-hover">
        <thead>
        <tr>
            <th>Encounter</th>
            <th>Monsters</th>
            <th>Parties</th>
            <th>Players</th>
        </tr>
        </thead>
        <tbody>
        {#each $encounters as e}
            <tr on:click={() => encounterClicked(e)}>
                <td>{e.name}</td>
                <td>{e.monsters.length}</td>
                <td>{e.partyIds.length}</td>
                <td>{e.playerIds.length}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
