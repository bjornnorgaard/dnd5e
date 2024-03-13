<script lang="ts">
    import { parties } from "$lib/stores/parties";
    import { players } from "$lib/stores/players";

    export let data;
</script>

{#if data.id}
    {@const party = $parties.find(p => p.id === data.id)}
    {@const players = $players?.filter(p => party?.playerIds?.includes(p.id))}

    <h3 class="h3">{party?.name}</h3>

    <div class="table-container">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>HP</th>
                <th>AC</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each players ?? [] as player}
                <tr>
                    <td>{player.name}</td>
                    <td>{player.currentHp}/{player.maxHp}</td>
                    <td>{player.armorClass}</td>
                    <td>
                        <button on:click={() => parties.removePlayer(data.id, player.id)}>Remove</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
{/if}

<h3 class="h3">Add other players</h3>
<div class="flex gap-4">
    {#each $players as p}
        <button class="badge variant-filled-primary" on:click={() => parties.addPlayer(data.id, p.id)}>{p.name}</button>
    {/each}
</div>
