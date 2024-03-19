<script lang="ts">
    import { page } from "$app/stores";
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import { db, type Encounter } from "$lib/utils/database";

    const encounter = liveQuery(async () => await db.encounters.get((Number($page.params.id))));

    async function submitEncounter(e: any) {
        if (!$encounter?.id) {
            console.error("No encounter found");
            return;
        }

        // TODO: Do the update and finished migration to indexedDB.

        await db.encounters.update($encounter?.id, updated);
        await goto("/encounters");
    }

    async function deleteEncounter() {
        if (!$encounter?.id) {
            console.error("No encounter found");
            return;
        }

        await db.encounters.delete($encounter.id);
        await goto("/encounters");
    }
</script>

{#if !$encounter}
    <p>No encounter found</p>
{:else}
    <form class="flex flex-col gap-4" on:submit|preventDefault={submitEncounter}>
        <label class="label" for="name">
            <span>Name</span>
            <input class="input" type="text" id="name" autocomplete="off" value={$encounter.title} placeholder="The Battle of...">
        </label>

        <div class="table-container">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>HP</th>
                    <th>AC</th>
                    <th>Mod</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {#each $playerStore.filter(p => $encounter.playerIds.includes(p.id)) as player}
                    <tr>
                        <td class="flex items-center gap-4">
                            <span>{player.name}</span>
                            <span class="badge variant-outline-success">Encounter</span>
                        </td>
                        <td>{player.currentHp}/{player.maxHp}</td>
                        <td>{player.armorClass}</td>
                        <td>{player.initiative}</td>
                        <td>
                            <button class="btn btn-sm variant-filled-error" on:click={() => removeEncounter(player)}>Remove</button>
                        </td>
                    </tr>
                {/each}
                {#each $encounter.monsters as m}
                    <tr>
                        <td class="flex items-center gap-4">
                            <span>{m.name}</span>
                            <span class="badge variant-outline-error">Monster</span>
                        </td>
                        <td>{m.hit_points}</td>
                        <td>{m.armor_class}</td>
                        <td></td>
                        <td>
                            <button class="btn btn-sm variant-filled-error" on:click={() => removeMonster(m)}>Remove</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>

        <div class="flex gap-4">
            <button class="btn variant-filled-primary" type="submit">Submit</button>
            <a class="btn variant-soft-secondary" href="/encounters">Cancel</a>
            <button class="btn variant-soft-error" on:click={async () => await deleteEncounter()}>Delete</button>
        </div>
    </form>
{/if}
