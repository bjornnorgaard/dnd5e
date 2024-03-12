<script lang="ts">
    import { parties } from "$lib/stores/parties";
    import { players } from "$lib/stores/players";

    export let data;
</script>

{#if data.id}
    {@const party = $parties.find(p => p.id === data.id)}
    {@const players = $players?.filter(p => party?.playerIds?.includes(p.id))}

    <h1>{party?.name}</h1>

    <table>
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

{/if}

<hr>

<div class="grid">
    {#each $players as p}
        <button on:click={() => parties.addPlayer(data.id, p.id)}>{p.name}</button>
    {/each}
</div>
