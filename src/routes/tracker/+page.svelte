<script lang="ts">
    import { db, type Encounter } from "$lib/utils/database";
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";

    const encounters = liveQuery(async () => await db.encounters.toArray());

    async function encounterClicked(encounter: Encounter) {
        await goto(`/encounters/${encounter.id}`);
    }

    async function newEncounter() {
        const createdId = await db.encounters.add({ title: "New Encounter", monsters: [], playerIds: [] });
        await goto(`/encounters/${createdId}`)
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
        {#if $encounters}
            {#each $encounters as e}
                <tr on:click={() => encounterClicked(e)} class="cursor-pointer">
                    <td>{e.title}</td>
                    <td>{e.monsters.length}</td>
                    <td>{e.playerIds.length}</td>
                </tr>
            {/each}
        {/if}
        </tbody>
    </table>
</div>

<button class="btn btn-sm variant-filled-primary" on:click={async () => await newEncounter()}>New</button>
