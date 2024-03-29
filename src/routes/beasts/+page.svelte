<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import type { Creature } from "$lib/types/creature";
    import { onMount } from "svelte";
    import SearchInput from "$lib/components/SearchInput.svelte";
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import { routes } from "$lib/constants/routes";

    let creatures: Creature[] = [];

    onMount(async () => {
        await searchCreatures("", 10);
    });

    async function searchCreatures(query: string, take: number) {
        creatures = await fetch(routes.api_creatures(query, take)).then(async r => await r.json());
    }
</script>

<PageWrapper title="Creatures" desc="Search and view creatures">
    <PageSection>
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
                {#each creatures as c}
                    <tr>
                        <td>{c.challenge_rating}</td>
                        <td><a class="anchor" href={routes.beasts_slug(c.slug)}>{c.name}</a></td>
                        <td>{c.armor_class}</td>
                        <td>{c.type}</td>
                        <td>{c.size}</td>
                        <td>{c.alignment}</td>
                    </tr>
                {/each}
            </TableBody>
        </Table>
    </PageSection>
</PageWrapper>
