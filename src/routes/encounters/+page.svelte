<script lang="ts">
    import { encounters } from "$lib/stores/encounters";
</script>

<div class="flex-col flex gap-4">
    {#each $encounters as e}
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
                <tr>
                    <td>{e.name}</td>
                    <td>{e.monsters.length}</td>
                    <td>{e.partyIds.length}</td>
                    <td>{e.playerIds.length}</td>
                    <td class="flex items-center gap-4">
                        <a class="anchor" href={`/encounters/${e.id}`}>View</a>
                        <button class="btn btn-sm variant-outline-error" on:click={() => encounters.remove(e)}>Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    {/each}

    <div class="flex">
        <a class="btn variant-filled-primary" href="/encounters/new">New Encounter</a>
    </div>
</div>
