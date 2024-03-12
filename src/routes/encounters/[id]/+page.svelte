<script lang="ts">
    import { encounters } from "$lib/stores/encounters";

    export let data;
</script>

{#if data.id}
    {@const encounter = $encounters.find(p => p.id === data.id)}

    <h1>{encounter?.name}</h1>

    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Monsters</th>
            <th>Party</th>
            <th>Players</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{encounter?.name}</td>
            <td>{encounter?.monsters.length ?? 0}</td>
            <td>{encounter?.partyIds.length ?? 0}</td>
            <td>{encounter?.playerIds.length ?? 0}</td>
        </tr>
        </tbody>
    </table>
{/if}
