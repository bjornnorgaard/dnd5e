<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import type { Spell } from "$lib/types/spell";
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let filter = "";
    let spells: Spell[] = [];

    onMount(async () => {
        await searchSpells();
    });

    async function searchSpells() {
        const res = await fetch(`/api/spells?filter=${filter}`);
        spells = await res.json();
    }
</script>

<PageWrapper title="Spells" desc="Search and view spell details">
    <PageSection>
        <input type="search" class="input" bind:value={filter} on:input={() => searchSpells()} placeholder="Search spells by name">
        <Table>
            <TableHead>
                <th class="table-cell-fit">Level</th>
                <th>Name</th>
                <th class="table-cell-fit">Casting Time</th>
                <th>Duration</th>
                <th class="table-cell-fit">Range</th>
            </TableHead>
            <TableBody>
                {#each spells as s}
                    <tr on:click={async () => await goto(`/spells/${s.slug}`)}>
                        <td class="table-cell-fit">{s.spell_level}</td>
                        <td>{s.name}</td>
                        <td class="table-cell-fit"><span class="line-clamp-1">{s.casting_time}</span></td>
                        <td>{s.duration}</td>
                        <td class="table-cell-fit">{s.range}</td>
                    </tr>
                {/each}
            </TableBody>
        </Table>
    </PageSection>
</PageWrapper>
