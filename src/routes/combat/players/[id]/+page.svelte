<script lang="ts">
    import { liveQuery } from "dexie";
    import { db, type Player } from "$lib/utils/database";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";

    export let data;
    const player = liveQuery(async () => await db.players.get((Number(data.id))));

    async function submitPlayer(e: any) {
        if (!$player?.id) {
            console.error("No player found");
            return;
        }

        const updated: Player = {
            id: $player.id,
            name: e.target.name.value,
            currentHp: Number(e.target.currentHp.value),
            maxHp: Number(e.target.maxHp.value),
            armorClass: Number(e.target.armorClass.value),
            initiative: Number(e.target.initiative.value),
        }

        await db.players.update($player?.id, updated);
        window.history.back();
    }

    async function deletePlayer() {
        if (!$player?.id) {
            console.error("No player found");
            return;
        }

        await db.players.delete($player.id);
        window.history.back();
    }
</script>

{#if !$player}
    <p>No player found</p>
{:else}
    <PageWrapper title={$player.name}>
        <PageSection title="Details" desc="Edit the details of the player">
            <form class="space-y-4" on:submit|preventDefault={submitPlayer}>
                <label class="label" for="name">
                    <span>Name</span>
                    <input class="input" type="text" id="name" autocomplete="off" value={$player.name} placeholder="John Doe">
                </label>
                <label class="label" for="currentHp">
                    <span>Current HP</span>
                    <input class="input" type="number" id="currentHp" autocomplete="off" value={$player.currentHp}>
                </label>
                <label class="label" for="maxHp">
                    <span>Max HP</span>
                    <input class="input" type="number" id="maxHp" autocomplete="off" value={$player.maxHp}>
                </label>
                <label class="label" for="armorClass">
                    <span>Armor Class</span>
                    <input class="input" type="number" id="armorClass" autocomplete="off" value={$player.armorClass}>
                </label>
                <label class="label" for="initiative">
                    <span>Initiative modifier</span>
                    <input class="input" type="number" id="initiative" autocomplete="off" value={$player.initiative}>
                </label>

                <div class="flex justify-between">
                    <div class="space-x-4">
                        <button class="btn variant-filled-primary" type="submit">Submit</button>
                        <button class="btn variant variant-ringed" type="reset" on:click={() => window.history.back()}>Cancel</button>
                    </div>
                    <button class="btn text-error-500 variant-filled-error" type="button" on:click={async () => await deletePlayer()}>Delete</button>
                </div>
            </form>
        </PageSection>
    </PageWrapper>
{/if}
