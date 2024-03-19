<script lang="ts">
    import { encounterStore } from "$lib/stores/encounterStore";
    import { newUUID } from "$lib/utils/uuid";
    import { goto } from "$app/navigation";
    import type { Player } from "$lib/types/player";
    import type { Encounter } from "$lib/types/tracker";

    async function newEncounter() {
        let e: Encounter = {
            id: newUUID(),
            title: `Encounter ${Date.now().toString()}`,
            monsters: [],
            playerIds: [],
        };
        encounterStore.addEncounter(e)

        await goto(`/encounters/${e.id}`);
    }

</script>

<div class="flex-col flex gap-4">
    <div class="table-container">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>Monsters</th>
                <th>Players</th>
                <th>Parties</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each $encounterStore as e}
                <tr>
                    <td>{e.name}</td>
                    <td>{e.monsters.length}</td>
                    <td>{e.playerIds.length}</td>
                    <td class="flex items-center gap-4">
                        <a class="anchor" href={`/encounters/${e.id}`}>View</a>
                        <button class="btn btn-sm variant-outline-error" on:click={() => encounterStore.removeEncounter(e)}>Delete</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>

    <div class="flex">
        <button class="btn variant-filled-primary" on:click={ async () => await newEncounter()}>New Encounter</button>
    </div>
</div>
