<script lang="ts">
    import { parties } from "$lib/stores/parties";
</script>

<table>
    <thead>
    <tr>
        <td>Name</td>
        <td>Players</td>
        <td>Actions</td>
    </tr>
    </thead>
    <tbody>
    {#each $parties as p}
        <tr>
            <td>{p.name}</td>
            <td>{p.playerIds?.length ?? 0}</td>
            <td>
                <a href="/parties/{p.id}">View</a>
                <button on:click={() => parties.remove(p)}>Delete</button>
            </td>
        </tr>
    {/each}
    </tbody>
</table>
