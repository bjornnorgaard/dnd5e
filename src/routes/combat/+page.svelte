<script lang="ts">
    import { db } from "$lib/utils/database";
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";

    const encounters = liveQuery(async () => await db.encounters.toArray());
    const players = liveQuery(async () => await db.players.toArray());

    async function newEncounter() {
        const createdId = await db.encounters.add({ title: "New Encounter", monsters: [], playerIds: [] });
        await goto(`/combat/encounters/${createdId}`)
    }

    async function newPlayer() {
        const createdId = await db.players.add({ name: "Unnamed Player", currentHp: 10, maxHp: 10, armorClass: 10, initiative: 0 });
        await goto(`/combat/players/${createdId}`)
    }
</script>

<PageWrapper title="Combat">
    <PageSection title="Encounters" desc="Encounters are a collection of monsters and players">
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Encounter</th>
                    <th>Monsters</th>
                    <th>Players</th>
                </tr>
                </thead>
                <tbody>
                {#if $encounters}
                    {#each $encounters as e}
                        <tr on:click={async () => await goto(`/combat/encounters/${e.id}`)} class="cursor-pointer">
                            <td>{e.title}</td>
                            <td>{e.monsters.length}</td>
                            <td>{e.playerIds.length}</td>
                        </tr>
                    {/each}
                {/if}
                </tbody>
            </table>
        </div>
        <div>
            <button on:click={async () => await newEncounter()} class="btn variant-ringed-primary">Create Encounter</button>
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
                        <tr on:click={async () => await goto(`/combat/players/${p.id}`)} class="cursor-pointer">
                            <td>{p.name}</td>
                            <td>{p.currentHp}/{p.maxHp}</td>
                            <td>{p.armorClass}</td>
                            <td>{p.initiative}</td>
                        </tr>
                    {/each}
                {/if}
                </tbody>
            </table>
        </div>
        <div>
            <button on:click={async () => await newPlayer()} class="btn variant-ringed-primary">New Player</button>
        </div>
    </PageSection>
</PageWrapper>
