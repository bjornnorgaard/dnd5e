<script lang="ts">
    import { Search } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let label: string;

    let query: string = "";

    function emitUpdate() {
        dispatch("input", query );
    }
</script>

<div class="label">
    <span>{label}</span>
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="flex gap-2 input-group-shim">
            <Search/>
        </div>

        <input type="search"
               placeholder="Search..."
               bind:value={query}
               on:input={() => emitUpdate()}/>
    </div>
</div>
