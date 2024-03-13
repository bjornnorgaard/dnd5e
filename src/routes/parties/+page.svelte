<script lang="ts">
    import { parties } from "$lib/stores/parties";
    import { newUUID } from "$lib/utils/uuid.js";
    import { goto } from "$app/navigation";
    import type { Party } from "$lib/types/party";

    async function createNewParty() {
        const p: Party = {
            id: newUUID(),
            name: "New Party",
            playerIds: [],
        };

        parties.add(p)
        await goto(`/parties/${p.id}`);
    }
</script>

<div class="flex flex-col gap-4">
    <div class="table-container">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>Players</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each $parties as p}
                <tr>
                    <td>{p.name}</td>
                    <td>{p.playerIds?.length ?? 0}</td>
                    <td class="flex items-center gap-4">
                        <a class="anchor" href="/parties/{p.id}">View</a>
                        <button class="btn btn-sm variant-outline-error" on:click={() => parties.remove(p)}>Delete</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>

    <div class="flex">
        <button class="btn variant-filled-primary" on:click={async ()=> await createNewParty()}>Create New Party</button>
    </div>
</div>
