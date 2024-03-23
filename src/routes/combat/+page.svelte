<script lang="ts">
    import { db } from "$lib/utils/database";
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import PageWrapper from "$lib/components/PageWrapper.svelte";

    const encounters = liveQuery(async () => await db.encounters.toArray());

    async function newEncounter() {
        const createdId = await db.encounters.add({ title: "New Encounter", monsters: [], playerIds: [] });
        await goto(`/combat/encounters/${createdId}`)
    }
</script>

<PageWrapper title="Encounters">
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
                    <tr on:click={async () => await goto(`/combat/encounters/${e.id}`)} class="cursor-pointer">
                        <td>{e.title}</td>
                        <td>{e.monsters.length}</td>
                        <td>{e.playerIds.length}</td>
                    </tr>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>
    <div>
        <button on:click={async () => await newEncounter()} class="btn variant-filled-primary">Create new encounter</button>
    </div>
</PageWrapper>
