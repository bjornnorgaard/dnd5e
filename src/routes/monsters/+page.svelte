<script lang="ts">
    import { writable } from "svelte/store";
    import type { Monster } from "$lib/types/monster";
    import { onMount } from "svelte";
    import { monsters } from "$lib/stores/monsters";

    const filter = writable<string>("gob");
    const results = writable<Monster[]>([]);

    onMount(async () => {
        await search();
    });

    async function search() {
        if ($filter === "") {
            $results = [];
            return;
        }
        // only take first 100 results after filtering
        $results = $monsters.filter((monster) => {
            return monster.name.toLowerCase().includes($filter.toLowerCase());
        });
    }
</script>

<div class="flex flex-col gap-4">
    <section class="flex flex-col gap-4">
        <hgroup>
            <h2 class="h2">Monsters {$results.length ? `(${$results.length})` : ""}</h2>
            <p class="italic">Search for creatures and view stats.</p>
        </hgroup>

        <form on:input={async () => search()}>
            <div class="grid">
                <label class="label" for="filter">
                    <span>Filter</span>
                    <input class="input" type="text" id="filter" autocomplete="off" bind:value={$filter} disabled={!$monsters.length}>
                </label>
            </div>
        </form>

        {#if !$results.length && !$filter}
            <p>Search for something...</p>
        {:else if !$results.length && $filter}
            <p>No results for this search</p>
        {:else}
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>CR</th>
                        <th>AC</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each $results as r (r.slug)}
                        <tr>
                            <td>{r.name}</td>
                            <td>{r.cr} / {r.challenge_rating}</td>
                            <td>{r.armor_class}</td>
                            <td>{r.type}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </section>
</div>
