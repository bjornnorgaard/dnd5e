<script lang="ts">
    import { liveQuery } from "dexie";
    import { addAllPlayersToEncounter, addCreatureToEncounter, addPlayerToEncounter, db, deleteEncounter, removeAllPlayersFromEncounter, removeCreatureFromEncounter, updateCreature } from "$lib/utils/database";
    import MonsterSearch from "$lib/components/CreatureSearch.svelte";
    import { goto } from "$app/navigation";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { Accordion, AccordionItem, ProgressBar } from "@skeletonlabs/skeleton";
    import { ArrowLeftCircle, ArrowRightCircle, Dices, PlayCircle, Skull, StopCircle } from "lucide-svelte";
    import { rollDice } from "$lib/utils/diceRoller";
    import { flip } from "svelte/animate";
    import { statblock } from "$lib/stores/statblock";
    import { hitPointsColor } from "$lib/utils/hitPointsColor";
    import PopupInput from "$lib/components/PopupInput.svelte";

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

    async function editCreature(id: string) {
        await goto(`/combat/creatures/${id}`);
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

    async function submitDamage(e: CustomEvent) {
        const creature = $creatures.find(c => c.id === e.detail.id);
        if (!creature) {
            console.error("No creature found")
            return;
        }

        creature.current_hit_points -= e.detail.value;

        if (creature.current_hit_points < 0) {
            creature.current_hit_points = 0;
        }
        if (creature.current_hit_points > creature.hit_points) {
            creature.current_hit_points = creature.hit_points;
        }

        await updateCreature(creature);
    }

    async function submitInitiative(e: CustomEvent) {
        const creature = $creatures.find(c => c.id === e.detail.id);
        if (!creature) {
            console.error("No creature found")
            return;
        }

        creature.initiative = e.detail.value;
        await updateCreature(creature);
    }

</script>

{#if !$encounter}
    <p>No encounter found</p>
{:else}
    {@const e = $encounter}
    <PageWrapper title={e.title} desc="Add players and creature to use initiative tracker">
        <div class="space-y-4">
            <input type="text" class="input" value={$encounter.title} on:input={(e) => titleChanged(e)}>

            {#if !$players}
                <ProgressBar value={undefined}/>
            {:else}
                <div class="space-x-4">
                    {#each $players as p}
                        {@const included = e.creatureIds.includes(p.id)}
                        <button class="chip"
                                class:variant-filled-primary={included}
                                class:variant-outline-primary={!included}
                                on:click={() => togglePlayer(p.id)}
                        >{p.name}</button>
                    {/each}
                    <button class="chip variant-outline-surface hover:variant-filled-success" on:click={async () => await addAllPlayersToEncounter(data.id)}>Everyone</button>
                    <button class="chip variant-outline-surface hover:variant-filled-error" on:click={async () => await removeAllPlayersFromEncounter(data.id)}>None</button>
                </div>
            {/if}
        </div>

        <PageSection title="Combatants" desc="List of combatants added to the encounter. Click HP to apply damage/healing.">
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
                            <tr on:click={() => statblock.open(p)}
                                class="cursor-pointer"
                                class:table-row-checked={activeCombatant === i} animate:flip={{duration: 300}}
                                class:line-through={p.current_hit_points <= 0}
                                class:text-gray-500={p.current_hit_points <= 0}>

                                <td class="flex items-center gap-1">{p.name}</td>

                                <td class:text-warning-500={hitPointsColor(p, 0.25,0.50)}
                                    class:text-error-500={hitPointsColor(p, 0,0.25)}>
                                    <PopupInput label="Apply damage" help="Use negative for healing" id={p.id} on:submit={e => submitDamage(e)}>
                                        {p.current_hit_points}/{p.hit_points}
                                    </PopupInput>
                                </td>

                                <td>{p.armor_class}</td>

                                {#if activeCombatant !== null}
                                    <td>
                                        <PopupInput label="Set initiative" id={p.id} on:submit={e => submitInitiative(e)}>
                                            {p.initiative}
                                        </PopupInput>
                                    </td>
                                {/if}

                                <td class="space-x-4">
                                    <button class="hover:anchor" on:click|stopPropagation={() => editCreature(p.id)}>edit</button>
                                    <button class="hover:anchor" on:click|stopPropagation={() => removeCreatureFromEncounter(data.id, p.id)}>remove</button>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                    </tbody>
                    <tfoot>
                    {#if $creatures}
                        <tr class="font-bold">
                            <td colspan={4}>Total combatants: {$creatures.length}</td>
                        </tr>
                    {/if}
                    </tfoot>
                </table>
            </div>
            <div class="flex gap-4">
                {#if activeCombatant === null}
                    <button on:click={() => startTrigger()} class="btn variant-filled-surface space-x-2">
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
                    <button on:click={() => rollInitiative()} class="btn variant-outline-surface space-x-2" disabled={activeCombatant === null}>
                        <span>Re-roll initiative</span>
                        <Dices/>
                    </button>
                {/if}
            </div>
        </PageSection>
        <PageSection title="Add creatures" desc="Search and click to add creatures to encounter">
            <MonsterSearch on:select={e => addCreatureToEncounter(data.id, e.detail.slug)}/>
        </PageSection>
        <PageSection>
            <Accordion>
                <AccordionItem>
                    <svelte:fragment slot="lead">
                        <Skull/>
                    </svelte:fragment>
                    <svelte:fragment slot="summary">Danger Zone - Ye' be forewarned, here be dragons - mind your step</svelte:fragment>
                    <svelte:fragment slot="content">
                        <button class="btn variant-filled-error" on:click={() => removeEncounter()}>Delete encounter</button>
                    </svelte:fragment>
                </AccordionItem>
            </Accordion>
        </PageSection>
    </PageWrapper>
{/if}
