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

        $results = $monsters.filter((monster) => {
            return monster.name.toLowerCase().includes($filter.toLowerCase());
        });
    }
</script>

<section>
    <hgroup>
        <h3>Monster Search</h3>
        <p>Search for creatures and view stats.</p>
    </hgroup>

    <form on:input={async () => search()}>
        <div class="grid">
            <label for="filter">Filter
                <input type="text" id="filter" autocomplete="off" bind:value={$filter} disabled={!$monsters.length}>
            </label>
        </div>
    </form>
</section>

<section>
    <hgroup>
        <h3>Results {$results.length ? `(${$results.length})` : ""}</h3>
        <p>View creatures and details</p>
    </hgroup>

    {#if !$results.length && !$filter}
        <p>Search for something...</p>
    {:else if !$results.length && $filter}
        <p>No results for this search</p>
    {/if}

    <table>
        <thead>
        <tr>
            <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {#each $results as r}
            <tr>
                <td>
                    {r.name}
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</section>
