<script lang="ts">
    import { players } from "$lib/stores/players";
</script>

<div class="flex flex-col gap-4">
    <div class="table-container">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>Initiative</th>
                <th>Current/Max HP</th>
                <th>Armor Class</th>
                <th>Actions</th>
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
                        <button class="btn btn-sm variant-outline-error" on:click={() => players.remove(p)}>Delete</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>

    <div class="flex">
        <a class="btn variant-filled-primary" href="/players/new">Add New Player</a>
    </div>
</div>
