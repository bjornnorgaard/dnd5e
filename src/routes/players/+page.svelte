<script lang="ts">
    import { players } from "$lib/stores/players";
</script>

<table>
    <thead>
    <tr>
        <td>Name</td>
        <td>Initiative</td>
        <td>Current/Max HP</td>
        <td>Armor Class</td>
        <td>Actions</td>
    </tr>
    </thead>
    <tbody>
    {#each $players as p}
        <tr>
            <td>{p.name}</td>
            <td>{p.initiative}</td>
            <td>{p.currentHp}/{p.maxHp}</td>
            <td>{p.armorClass}</td>
            <td>
                <button on:click={() => players.remove(p)}>Delete</button>
            </td>
        </tr>
    {/each}
    </tbody>
</table>
