<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import type { Encounter } from "$lib/types/tracker";
    import { tracker } from "$lib/stores/tracker";

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
            <th>Players</th>
        </tr>
        </thead>
        <tbody>
        {#each $tracker.encounters.entries() as [ k, e ]}
            <tr on:click={() => encounterClicked(e)}>
                <td>{e.title}</td>
                <td>{e.monsters.length}</td>
                <td>{e.playerIds.length}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<button class="btn btn-sm variant-filled-primary">New</button>
