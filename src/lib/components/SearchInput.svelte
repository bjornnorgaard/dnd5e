<script lang="ts">
    import { Search } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let label: string;
    export let takeOptions: number[] = [ 5, 10, 20, 50 ];

    let query: string = "";
    let take: number = 10;

    function emitUpdate() {
        dispatch("change", { query: query, take: take });
    }
</script>

<div class="label">
    <span class="flex justify-between">
        <span>{label}</span>
        <span>Number of Results</span>
    </span>
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="flex gap-2 input-group-shim">
            <Search/>
        </div>

        <input type="search"
               placeholder="Search..."
               bind:value={query}
               on:input={() => emitUpdate()}/>

        <select bind:value={take} on:change={() => emitUpdate()}>
            {#each takeOptions as v}
                <option value={v}>{v}</option>
            {/each}
        </select>
    </div>
</div>
