<script lang="ts">
    import { encounters } from "$lib/stores/encounters";
    import { newUUID } from "$lib/utils/uuid";
    import { goto } from "$app/navigation";
    import type { Encounter } from "$lib/types/encounter";
    import type { Player } from "$lib/types/player";

    async function newEncounter() {
        let e: Encounter = {
            id: newUUID(),
            name: `Encounter ${Date.now().toString()}`,
            monsters: [],
            partyIds: [],
            playerIds: [],
        };
        encounters.addEncounter(e)

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
            {#each $encounters as e}
                <tr>
                    <td>{e.name}</td>
                    <td>{e.monsters.length}</td>
                    <td>{e.partyIds.length}</td>
                    <td>{e.playerIds.length}</td>
                    <td class="flex items-center gap-4">
                        <a class="anchor" href={`/encounters/${e.id}`}>View</a>
                        <button class="btn btn-sm variant-outline-error" on:click={() => encounters.removeEncounter(e)}>Delete</button>
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
