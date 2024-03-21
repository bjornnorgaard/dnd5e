<script lang="ts">
    import { liveQuery } from "dexie";
    import { page } from "$app/stores";
    import { db } from "$lib/utils/database";

    export let data;
    const encounter = liveQuery(async () => await db.encounters.get(data.id));

</script>

{#if $encounter?.title}
    <pre>{JSON.stringify($page.url.searchParams.get("encounter"), null, 2)}</pre>
    <div class="flex flex-col gap-4">
        <h2 class="h2">
            <input type="text" class="input h2 variant-ghost" value={$encounter.title}>
        </h2>

        <div class="table-container">
            <table class="table">
                <thead>
                <tr>
                    <th>Player</th>
                    <th>HP</th>
                    <th>AC</th>
                    <th>Initiative</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

                {#each $encounter.monsters as m, i}
                    <tr>
                        <td>{m.name}</td>
                        <td>{m.hit_points}</td>
                        <td>{m.armor_class}</td>
                        <td>{m.dexterity}</td>
                        <td>
                            <button class="btn btn-sm variant-outline-error" on:click={() => console.log("remove clicked")}>Remove️</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>

{/if}
