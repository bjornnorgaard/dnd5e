<script lang="ts">
    import { liveQuery } from "dexie";
    import { addAllPlayersToEncounter, addCreatureToEncounter, addPlayerToEncounter, db, deleteEncounter, removeAllPlayersFromEncounter, removeCreatureFromEncounter, updateCreature } from "$lib/utils/database";
    import MonsterSearch from "$lib/components/CreatureSearch.svelte";
    import { goto } from "$app/navigation";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { ProgressBar, SlideToggle } from "@skeletonlabs/skeleton";
    import { ArrowLeftCircle, ArrowRightCircle, Dices, PlayCircle, StopCircle } from "lucide-svelte";
    import { rollDice } from "$lib/utils/diceRoller";
    import { flip } from "svelte/animate";

    export let data;
    const encounter = liveQuery(() => db.encounters.get(data.id));
    let activeCombatant: number | null = null;

    const creatures = liveQuery(async () => {
        const encounter = await db.encounters.get(data.id);
        if (!encounter) return [];
        return db.creatures.where("id").anyOf(encounter.creatureIds).toArray();
    });

    const players = liveQuery(() => db.creatures.where("is_player").equals(1).toArray());

    async function titleChanged(e: any) {
        if (!$encounter) {
            console.error("No encounter found");
            return;
        }

        await db.encounters.update(data.id, { title: e.target.value });
    }

    async function togglePlayer(id: string) {
        if (!$encounter) {
            console.error("No encounter found");
            return;
        }

        if ($encounter.creatureIds.includes(id)) {
            await removeCreatureFromEncounter($encounter.id, id);
            return;
        }

        await addPlayerToEncounter($encounter.id, id);
    }

    async function removeEncounter() {
        await deleteEncounter(data.id);
        await goto("/combat/encounters");
    }

    function startTrigger() {
        activeCombatant = 0;
    }

    function stopTrigger() {
        activeCombatant = null;
    }

    function nextTrigger() {
        if (activeCombatant === null) return;
        if (activeCombatant === $creatures.length - 1) activeCombatant = 0;
        else activeCombatant++;
    }

    function previousTrigger() {
        if (activeCombatant === null) return;
        if (activeCombatant === 0) activeCombatant = $creatures.length - 1;
        else activeCombatant--;
    }

    async function rollInitiative() {
        $creatures.forEach(c => {
            c.initiative = rollDice(1, 20) + c.dexterity;
            updateCreature(c);
        });
    }
</script>

{#if !$encounter}
    <p>No encounter found</p>
{:else}
    {@const e = $encounter}
    <PageWrapper title={e.title}>
        <PageSection title="Encounter" desc="Edit encounter details">
            <label class="label">Title
                <input type="text" class="input" value={$encounter.title} on:input={(e) => titleChanged(e)}>
            </label>
        </PageSection>
        <PageSection title="Combatants" desc="List of combatants added to the encounter">
            <div class="table-container">
                <table class="table table-compact table-hover">
                    <thead>
                    <tr>
                        <th>Combatant</th>
                        <th>HP</th>
                        <th>AC</th>
                        {#if activeCombatant !== null}
                            <th>Initiative</th>
                        {/if}
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#if $creatures}
                        {#each $creatures.sort((a, b) => b.initiative - a.initiative) as p, i (p.id)}
                            <tr class:table-row-checked={activeCombatant === i} animate:flip={{duration: 300}}
                                class:line-through={p.current_hit_points <= 0}
                                class:text-gray-500={p.current_hit_points <= 0}>
                                <td class="flex gap-1 items-center">{p.name}</td>
                                <td>{p.current_hit_points}/{p.hit_points}</td>
                                <td>{p.armor_class}</td>
                                {#if activeCombatant !== null}
                                    <td>{p.initiative}</td>
                                {/if}
                                <td class="space-x-4">
                                    <a href={`/combat/creatures/${p.id}`} class="text-secondary-500">edit</a>
                                    <button class="text-error-500" on:click={() => removeCreatureFromEncounter(data.id, p.id)}>remove️</button>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                    </tbody>
                </table>
            </div>
            <div class="flex gap-4">
                {#if activeCombatant === null}
                    <button on:click={() => startTrigger()} class="btn variant-filled-secondary space-x-2">
                        <span>Start</span>
                        <PlayCircle/>
                    </button>
                {:else}
                    <button on:click={() => stopTrigger()} class="btn variant-filled-error space-x-2">
                        <span>Stop</span>
                        <StopCircle/>
                    </button>
                    <button on:click={() => previousTrigger()} class="btn variant-filled-primary space-x-2" disabled={activeCombatant === null}>
                        <ArrowLeftCircle/>
                        <span>Previous</span>
                    </button>
                    <button on:click={() => nextTrigger()} class="btn variant-filled-primary space-x-2" disabled={activeCombatant === null}>
                        <span>Next</span>
                        <ArrowRightCircle/>
                    </button>
                    <button on:click={() => rollInitiative()} class="btn variant-filled-tertiary space-x-2" disabled={activeCombatant === null}>
                        <span>Re-roll initiative</span>
                        <Dices/>
                    </button>
                {/if}
            </div>
        </PageSection>
        <PageSection title="Players" desc="Click to add or remove a player from the encounter">
            {#if !$players}
                <ProgressBar value={undefined}/>
            {:else}
                <div class="space-x-4">
                    {#each $players as p}
                        {@const included = e.creatureIds.includes(p.id)}
                        <SlideToggle name={p.name} size="sm" active="bg-primary-500" checked={included} on:click={() => togglePlayer(p.id)}>{p.name}</SlideToggle>
                    {/each}
                </div>
                <div class="space-x-4">
                    <button class="btn btn-sm variant-filled-surface" on:click={async () => await addAllPlayersToEncounter(data.id)}>Add all</button>
                    <button class="btn btn-sm variant-filled-surface" on:click={async () => await removeAllPlayersFromEncounter(data.id)}>Remove all</button>
                </div>
            {/if}
        </PageSection>
        <PageSection title="Add creatures" desc="Search and click to add creatures to encounter">
            <MonsterSearch on:select={e => addCreatureToEncounter(data.id, e.detail.slug)}/>
        </PageSection>
        <PageSection title="Danger Zone" desc="Ye' be forewarned, here be dragons - mind your step">
            <button class="btn variant-filled-error" on:click={() => removeEncounter()}>Delete encounter</button>
        </PageSection>
    </PageWrapper>
{/if}
