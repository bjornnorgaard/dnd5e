<script lang="ts">
    import { liveQuery } from "dexie";
    import { db } from "$lib/utils/database";
    import { Accordion, AccordionItem, ProgressBar } from "@skeletonlabs/skeleton";
    import { PersonStanding, Rabbit } from "lucide-svelte";
    import MonsterSearch from "$lib/components/MonsterSearch.svelte";
    import type { Monster } from "$lib/types/monster";
    import { goto } from "$app/navigation";
    import PageWrapper from "$lib/components/PageWrapper.svelte";

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

    async function addPlayer(id: any) {
        const updated = $encounter;
        if (!id || !updated) {
            console.error("No player or encounter found", id, updated);
            return;
        }

        if (updated.playerIds.includes(id)) {
            console.log("Player already in encounter");
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
        await goto("/tracker/encounters");
    }
</script>

{#if !$encounter}
    <p>No encounter found</p>
{:else}
    <PageWrapper bind:title={$encounter.title}>
        <div class="flex flex-col gap-4">
            <h2 class="flex gap-4 h2 w-fit">
                <input type="text" class="input h2 variant-ghost" value={$encounter.title} on:input={(e) => titleChanged(e)}>
            </h2>

            <div class="table-container">
                <table class="table table-compact table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th>HP</th>
                        <th>AC</th>
                        <th>Initiative</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#if $players}
                        {#each $players.filter(p => $encounter?.playerIds.includes(p.id)) as p, i (p.id)}
                            <tr>
                                <td>{p.name}</td>
                                <td>{p.currentHp}/{p.maxHp}</td>
                                <td>{p.armorClass}</td>
                                <td>{p.initiative}</td>
                                <td class="space-x-4">
                                    <a href={`/tracker/players/${p.id}`} class="text-secondary-500">edit</a>
                                    <button class="text-error-500" on:click={() => removePlayer(p.id)}>remove️</button>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                    {#each $encounter.monsters as m, i}
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

            <Accordion spacing="space-y-4">
                <div class="card">
                    <AccordionItem open>
                        <svelte:fragment slot="lead">
                            <PersonStanding/>
                        </svelte:fragment>
                        <svelte:fragment slot="summary">Players</svelte:fragment>
                        <svelte:fragment slot="content">
                            {#if !$players}
                                <ProgressBar value={undefined}/>
                            {:else}
                                <div class="flex gap-4 p-2">
                                    <button class="chip variant-soft-primary" on:click={() => addAllPlayers()}>Everyone</button>
                                    {#each $players as p}
                                        <button class="chip"
                                                class:variant-soft-secondary={!$encounter.playerIds.includes(p.id)}
                                                class:hover:variant-filled-primary={!$encounter.playerIds.includes(p.id)}
                                                class:chip-disabled={$encounter.playerIds.includes(p.id)}
                                                disabled={$encounter.playerIds.includes(p.id)}
                                                on:click={() => addPlayer(p.id)}>
                                            <span>{p.name}</span>
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </svelte:fragment>
                    </AccordionItem>
                </div>
                <div class="card">
                    <AccordionItem>
                        <svelte:fragment slot="lead">
                            <Rabbit/>
                        </svelte:fragment>
                        <svelte:fragment slot="summary">Monsters</svelte:fragment>
                        <svelte:fragment slot="content">
                            <MonsterSearch on:select={e => addMonster(e)}/>
                        </svelte:fragment>
                    </AccordionItem>
                </div>
            </Accordion>

            <button class="btn btn-lg text-error-500 hover:variant-filled-error" on:click={() => deleteEncounter()}>Delete Encounter</button>
        </div>
    </PageWrapper>
{/if}
