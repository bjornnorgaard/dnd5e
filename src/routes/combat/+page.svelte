<script lang="ts">
    import { db } from "$lib/utils/database";
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { newPlayer } from "$lib/utils/typeConstructors";
    import { newEncounter } from "$lib/utils/typeConstructors.js";

    const encounters = liveQuery(async () => await db.encounters.toArray());
    const players = liveQuery(async () => await db.creatures.where({ is_player: 1 }).toArray());

    async function createEncounter() {
        const e = newEncounter({ title: "Unnamed Encounter" });
        const createdId = await db.encounters.add(e);
        await goto(`/combat/encounters/${createdId}`)
    }

    async function createPlayer() {
        const player = newPlayer({ name: "Unnamed Player", armorClass: 10, hitPoints: 10, dexterity: 0 })
        await db.creatures.add(player, player.id);
        await goto(`/combat/creatures/${player.id}`)
    }
</script>

<PageWrapper title="Combat">
    <PageSection title="Encounters" desc="Encounters are a collection of monsters and players">
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Encounter</th>
                    <th>Creatures</th>
                </tr>
                </thead>
                <tbody>
                {#if $encounters}
                    {#each $encounters as e}
                        <tr on:click={async () => await goto(`/combat/encounters/${e.id}`)} class="cursor-pointer">
                            <td>{e.title}</td>
                            <td>{e.creatureIds.length}</td>
                        </tr>
                    {/each}
                {/if}
                </tbody>
                <tfoot>
                {#if $encounters}
                    <tr class="font-bold">
                        <td class="space-x-2">
                            <span>Total Encounters</span>
                            <span class="badge variant-filled-surface">{$encounters.length}</span>
                        </td>
                    </tr>
                {/if}
                </tfoot>
            </table>
        </div>
        <div>
            <button on:click={async () => await createEncounter()} class="btn variant-filled-primary">New Encounter</button>
        </div>
    </PageSection>

    <PageSection title="Players" desc="Players are characters that can be added to encounters">
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Player</th>
                    <th>HP</th>
                    <th>AC</th>
                    <th>Initiative</th>
                </tr>
                </thead>
                <tbody>
                {#if $players}
                    {#each $players as p}
                        <tr on:click={async () => await goto(`/combat/creatures/${p.id}`)} class="cursor-pointer">
                            <td>{p.name}</td>
                            <td>{p.current_hit_points}/{p.hit_points}</td>
                            <td>{p.armor_class}</td>
                            <td>{p.dexterity}</td>
                        </tr>
                    {/each}
                {/if}
                </tbody>
                <tfoot>
                {#if $players}
                    <tr class="font-bold">
                        <td class="space-x-2">
                            <span>Total Players</span>
                            <span class="badge variant-filled-surface">{$players.length}</span>
                        </td>
                    </tr>
                {/if}
                </tfoot>
            </table>
        </div>
        <div>
            <button on:click={async () => await createPlayer()} class="btn variant-filled-primary">New Player</button>
        </div>
    </PageSection>

</PageWrapper>
