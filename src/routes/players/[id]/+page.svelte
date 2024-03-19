<script lang="ts">
    import { page } from "$app/stores";
    import { liveQuery } from "dexie";
    import { db } from "$lib/utils/database";

    const player = liveQuery(() => db.players.get($page.params.id));
</script>

{#if !$player}
    <p>No player found</p>
{:else}
    <form class="flex flex-col gap-4">
        <label class="label" for="name">
            <span>Name</span>
            <input class="input" type="text" id="name" autocomplete="off" bind:value={$player.name} placeholder="John Doe">
        </label>
        <label class="label" for="currentHp">
            <span>Current HP</span>
            <input class="input" type="number" id="currentHp" autocomplete="off" bind:value={$player.currentHp}>
        </label>
        <label class="label" for="maxHp">
            <span>Max HP</span>
            <input class="input" type="number" id="maxHp" autocomplete="off" bind:value={$player.maxHp}>
        </label>
        <label class="label" for="armorClass">
            <span>Armor Class</span>
            <input class="input" type="number" id="armorClass" autocomplete="off" bind:value={$player.armorClass}>
        </label>
        <label class="label" for="initiative">
            <span>Initiative modifier</span>
            <input class="input" type="number" id="initiative" autocomplete="off" bind:value={$player.initiative}>
        </label>

        <div class="flex gap-4">
            <button class="btn variant-filled-primary" type="submit">Submit</button>
            <a class="btn variant-outline" href="/players">Cancel</a>
        </div>
    </form>
{/if}
