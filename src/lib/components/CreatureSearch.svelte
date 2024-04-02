<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { Creature } from "$lib/types/creature";
    import SearchInput from "$lib/components/SearchInput.svelte";
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import { routes } from "$lib/constants/routes";

    const dispatch = createEventDispatcher();
    let creatures: Creature[] = []

    onMount(async () => await searchCreatures(""))

    async function searchCreatures(query: string) {
        creatures = await fetch(routes.api_creatures(query)).then(r => r.json());
    }

    function creatureClicked(creature: Creature) {
        dispatch("select", creature);
    }
</script>

<div class="space-y-4">
    <SearchInput label="Search Creatures" on:input={async (e) => await searchCreatures(e.detail)}/>

    <Table>
        <TableHead>
            <th>CR</th>
            <th>Name</th>
            <th>AC</th>
            <th>Type</th>
            <th>Size</th>
            <th>Alignment</th>
        </TableHead>
        <TableBody>
            {#each creatures as m}
                <tr on:click={() => creatureClicked(m)} class="cursor-pointer">
                    <td>{m.challenge_rating}</td>
                    <td><a class="anchor" on:click|stopPropagation href={routes.beasts_slug(m.slug)}>{m.name}</a></td>
                    <td>{m.armor_class}</td>
                    <td>{m.type}</td>
                    <td>{m.size}</td>
                    <td>{m.alignment}</td>
                </tr>
            {/each}
        </TableBody>
    </Table>
</div>
