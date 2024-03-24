<script lang="ts">
    import { liveQuery } from "dexie";
    import { db } from "$lib/utils/database";
    import { ProgressBar } from "@skeletonlabs/skeleton";
    import MonsterSearch from "$lib/components/MonsterSearch.svelte";
    import type { Monster } from "$lib/types/monster";
    import { goto } from "$app/navigation";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";

    export let data;
    const encounter = liveQuery(() => db.encounters.get(Number(data.id)));
    const players = liveQuery(() => db.players.toArray());

    async function titleChanged(e: any) {
        if (!$encounter) {
            console.error("No encounter found");
            return;
        }
        const updated = $encounter;
        updated.title = e.target.value;
        await db.encounters.put(updated, updated.id);
    }

    async function togglePlayer(id: any) {
        const updated = $encounter;
        if (!id || !updated) {
            console.error("No player or encounter found", id, updated);
            return;
        }

        if (updated.playerIds.includes(id)) {
            await removePlayer(id);
            return;
        }

        await addPlayer(id);
    }

    async function addPlayer(id: any) {
        const updated = $encounter;
        if (!id || !updated) {
            console.error("No player or encounter found", id, updated);
            return;
        }

        updated.playerIds.push(id);
        await db.encounters.put(updated, updated.id);
    }

    async function removePlayer(id: any) {
        const updated = $encounter;
        if (!id || !updated) {
            console.error("No player or encounter found", id, updated);
            return;
        }

        updated.playerIds = updated.playerIds.filter(p => p !== id);
        await db.encounters.put(updated, updated.id);
    }

    async function addAllPlayers() {
        $players.forEach(p => addPlayer(p.id));
    }

    function removeEveryone() {
        $players.forEach(p => removePlayer(p.id));
    }

    async function addMonster(monster: CustomEvent<Monster>) {
        const updated = $encounter;
        if (!monster.detail || !updated) {
            console.error("No monster or encounter found", monster, updated);
            return;
        }

        updated.monsters.push(monster.detail);
        await db.encounters.put(updated, updated.id);
    }

    async function removeMonster(index: number) {
        const updated = $encounter;
        if (!updated) {
            console.error("No encounter found", updated);
            return;
        }

        updated.monsters.splice(index, 1);
        await db.encounters.put(updated, updated.id);
    }

    async function deleteEncounter() {
        if (!$encounter) {
            console.error("No encounter found");
            return;
        }

        await db.encounters.delete($encounter.id);
        await goto("/combat/encounters");
    }
</script>

{#if !$encounter}
    <p>No encounter found</p>
{:else}
    {@const e = $encounter}
    <PageWrapper title={e.title}>
        <div class="flex flex-col gap-4">

            <PageSection title="Encounter" desc="Edit encounter details">
                <label class="label">Title
                    <input type="text" class="input" value={$encounter.title} on:input={(e) => titleChanged(e)}>
                </label>
            </PageSection>

            <PageSection title="Players" desc="Click to add or remove a player from the encounter">
                {#if !$players}
                    <ProgressBar value={undefined}/>
                {:else}
                    <div class="space-x-4">
                        <button class="chip variant-filled-primary" on:click={() => addAllPlayers()}>Add all</button>
                        {#each $players as p}
                            {@const included = e.playerIds.includes(p.id)}
                            <button class="chip"
                                    class:variant-filled-secondary={!included}
                                    class:variant-filled-warning={included}
                                    on:click={() => togglePlayer(p.id)}>
                                <span>{p.name}</span>
                            </button>
                        {/each}
                        <button class="chip variant-filled-error" on:click={() => removeEveryone()}>Remove all</button>
                    </div>
                {/if}
            </PageSection>

            <PageSection title="Combatants" desc="List of combatants added to the encounter">
                <div class="table-container">
                    <table class="table table-compact table-hover">
                        <thead>
                        <tr>
                            <th>Combatant</th>
                            <th>HP</th>
                            <th>AC</th>
                            <th>Initiative</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#if $players}
                            {#each $players.filter(p => e?.playerIds.includes(p.id)) as p, i (p.id)}
                                <tr>
                                    <td>{p.name}</td>
                                    <td>{p.currentHp}/{p.maxHp}</td>
                                    <td>{p.armorClass}</td>
                                    <td>{p.initiative}</td>
                                    <td class="space-x-4">
                                        <a href={`/combat/players/${p.id}`} class="text-secondary-500">edit</a>
                                        <button class="text-error-500" on:click={() => removePlayer(p.id)}>remove️</button>
                                    </td>
                                </tr>
                            {/each}
                        {/if}
                        {#each e.monsters as m, i}
                            <tr>
                                <td>{m.name}</td>
                                <td>{m.hit_points}</td>
                                <td>{m.armor_class}</td>
                                <td>{m.dexterity}</td>
                                <td class="space-x-2">
                                    <button class="text-error-500" on:click={() => removeMonster(i)}>remove</button>
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </PageSection>

            <PageSection title="Add monsters" desc="Search and click to add monsters to encounter">
                <MonsterSearch on:select={e => addMonster(e)}/>
            </PageSection>

            <PageSection title="Actions" desc="Danger zone - mind your step">
                <button class="btn btn-lg text-error-500 hover:variant-filled-error" on:click={() => deleteEncounter()}>Delete Encounter</button>
            </PageSection>
        </div>
    </PageWrapper>
{/if}
