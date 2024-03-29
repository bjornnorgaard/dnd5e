<script lang="ts">
    import { writable } from "svelte/store";
    import { createEventDispatcher, onMount } from "svelte";
    import type { Creature } from "$lib/types/creature";
    import SearchInput from "$lib/components/SearchInput.svelte";
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableFoot from "$lib/components/TableFoot.svelte";
    import { routes } from "$lib/constants/routes";

    const dispatch = createEventDispatcher();
    const creatures = writable<Creature[]>([]);

    async function searchCreatures(query: string, take: number) {
        const data = await fetch(routes.api_creatures(query, take)).then(r => r.json());
        creatures.set(data);
    }

    function creatureClicked(creature: Creature) {
        dispatch("select", creature);
    }

    onMount(async () => {
        await searchCreatures("", 10);
    })
</script>

<div class="space-y-4">
    <SearchInput label="Search Creatures" on:change={async (e) => await searchCreatures(e.detail.query, e.detail.take)}/>

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
            {#each $creatures as m}
                <tr on:click={() => creatureClicked(m)}>
                    <td>{m.challenge_rating}</td>
                    <td class="anchor" on:click|stopPropagation>
                        <a href={routes.beasts_slug(m.slug)}>{m.name}</a>
                    </td>
                    <td>{m.armor_class}</td>
                    <td>{m.type}</td>
                    <td>{m.size}</td>
                    <td>{m.alignment}</td>
                </tr>
            {/each}
        </TableBody>
        <TableFoot>
            <td colspan="5">Total results</td>
            <td>{($creatures).length}</td>
        </TableFoot>
    </Table>
</div>
