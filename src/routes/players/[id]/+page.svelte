<script lang="ts">
    import { page } from "$app/stores";
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import { db, type Player } from "$lib/utils/database";

    const player = liveQuery(async () => await db.players.get((Number($page.params.id))));

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
        await goto("/players");
    }

    async function deletePlayer() {
        if (!$player?.id) {
            console.error("No player found");
            return;
        }

        await db.players.delete($player.id);
        await goto("/players");
    }
</script>

{#if !$player}
    <p>No player found</p>
{:else}
    <form class="flex flex-col gap-4" on:submit|preventDefault={submitPlayer}>
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
        <div class="flex gap-4">
            <button class="btn variant-filled-primary" type="submit">Submit</button>
            <a class="btn variant-soft-secondary" href="/players">Cancel</a>
            <button class="btn variant-soft-error" on:click={async () => await deletePlayer()}>Delete</button>
        </div>
    </form>
{/if}
