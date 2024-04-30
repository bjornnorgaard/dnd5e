<script lang="ts">
    import PageSection from "$lib/components/PageSection.svelte";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    onMount(() => {});
</script>

<PageWrapper title="Encounter" desc="Create and manage encounters">
    <PageSection title="Recipe" desc="Which creatures and how many"></PageSection>
</PageWrapper>
