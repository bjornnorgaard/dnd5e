<script lang="ts">
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import { db, type Encounter } from "$lib/utils/database";
    import { flip } from "svelte/animate";

    async function create() {
        const id = await db.encounters.add({
            title: "New Encounter",
            playerIds: [],
            monsters: [],
        });

        await goto(`/encounters/${id}`);
    }

    const encounter = liveQuery(async () => await db.encounters.toArray());

    async function removeEncounter(encounter: Encounter) {
        if (!encounter.id) {
            console.error("No encounter id");
            return;
        }
        await db.encounters.delete(encounter.id);
    }
</script>

<div class="flex flex-col gap-4">
    <div class="table-container">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>Players</th>
                <th>Monsters</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#if !$encounter}
                <p>No encounter found</p>
            {:else}
                {#each $encounter as p (p.id)}
                    <tr animate:flip>
                        <td>{p.title}</td>
                        <td>{p.playerIds.length}</td>
                        <td>{p.monsters.length}</td>
                        <td>
                            <a href={`/encounters/${p.id}`} class="btn btn-sm variant-soft-secondary">View</a>
                            <button class="btn btn-sm variant-soft-error" on:click={() => removeEncounter(p)}>Delete</button>
                        </td>
                    </tr>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>

    <div class="flex">
        <button on:click={async () => await create()} class="btn variant-filled-primary">Add New Encounter</button>
    </div>
</div>
