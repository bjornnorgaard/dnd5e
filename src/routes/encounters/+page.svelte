<script lang="ts">
    import { encounters } from "$lib/stores/encounters";
</script>

{#each $encounters as e}
    <table>
        <thead>
        <tr>
            <td>Name</td>
            <td>Monsters</td>
            <td>Players</td>
            <td>Actions</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{e.name}</td>
            <td>{e.monsters.length}</td>
            <td>{e.playerIds.length}</td>
            <td>
                <a href={`/encounters/${e.id}`}>View</a>
                <button on:click={() => encounters.remove(e)}>Delete</button>
            </td>
        </tr>
        </tbody>
    </table>
{/each}
