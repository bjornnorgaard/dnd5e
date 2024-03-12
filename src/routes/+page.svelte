<script lang="ts">
    import { writable } from "svelte/store";
    import type { Monster } from "$lib/monster";
    import { onMount } from "svelte";

    const filter = writable<string>("");
    const monsters = writable<Monster[]>([]);
    const results = writable<Monster[]>([]);

    onMount(async () => {
        const response = await fetch("/api/monsters", { method: "GET" });
        $monsters = await response.json();
    });

    async function search() {
        if ($filter === "") {
            $results = [];
            return;
        }

        $results = $monsters.filter((monster) => {
            return monster.name.toLowerCase().includes($filter.toLowerCase());
        });
    }

</script>

<section>
    <form on:input={async () => search()}>
        <input type="text" bind:value={$filter}>
    </form>

    {#each $results as r}
        <p>{r.name}</p>
    {/each}
</section>
