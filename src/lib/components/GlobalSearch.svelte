<!--<script lang="ts">-->

<!--    import { Autocomplete, type AutocompleteOption } from "@skeletonlabs/skeleton";-->
<!--    import type { Spell } from "$lib/types/spell";-->
<!--    import { onMount } from "svelte";-->
<!--    import { createSpellIndex, searchSpellIndex } from "$lib/search/search";-->

<!--    let query: string = "";-->
<!--    let dialog: HTMLDialogElement | null = null;-->
<!--    let search: 'loading' | 'ready' = 'loading'-->
<!--    let results: Spell[] = []-->
<!--    let suggestions: AutocompleteOption<string>[] = [];-->

<!--    onMount(async () => {-->
<!--        // get the posts-->
<!--        const res = await fetch('/api/spells');-->
<!--        const posts = await res.json();-->

<!--        // create search index-->
<!--        createSpellIndex(posts)-->
<!--        // we're in business 🤝-->
<!--        search = 'ready'-->
<!--    })-->

<!--    function runSearch() {-->
<!--        console.log("searching", query)-->

<!--        if (search !== 'ready') {-->
<!--            console.log("search not ready");-->
<!--            return;-->
<!--        }-->

<!--        results = searchSpellIndex(query);-->
<!--        console.log("results", results)-->
<!--        suggestions = results.map((spell) => {-->
<!--            return {-->
<!--                label: spell.name,-->
<!--                value: spell.name,-->
<!--            }-->
<!--        })-->
<!--    }-->

<!--    function onKeydown(event: KeyboardEvent) {-->
<!--        if (event.key === "Escape") {-->
<!--            dialog?.close();-->
<!--        }-->

<!--        if ((event.ctrlKey || event.metaKey) && event.key === "k") {-->
<!--            query = "";-->
<!--            dialog?.showModal();-->
<!--        }-->

<!--        if (event.key === "Enter") {-->
<!--            dialog?.close();-->
<!--        }-->
<!--    }-->

<!--    function onFlavorSelection(event: CustomEvent<AutocompleteOption<string>>): void {-->
<!--        console.log("selection", event.detail.value)-->
<!--    }-->

<!--</script>-->

<!--<svelte:window on:keydown={onKeydown}/>-->

<!--<dialog bind:this={dialog} class="bg-transparent">-->
<!--    <div class="fixed top-0 left-0 h-screen w-screen blur-2xl"></div>-->

<!--    <div class="flex flex-col gap-4 card variant-filled-surface">-->
<!--        <input class="w-full text-3xl input"-->
<!--               type="search"-->
<!--               name="demo"-->
<!--               on:input={() => runSearch()}-->
<!--               autocomplete="off"-->
<!--               bind:value={query}-->
<!--               placeholder="Search..."/>-->

<!--        <Autocomplete options={suggestions} on:selection={onFlavorSelection} bind:input={query}/>-->
<!--    </div>-->
<!--    &lt;!&ndash;        <div class="grid place-content-center">&ndash;&gt;-->
<!--    &lt;!&ndash;            <br>&ndash;&gt;-->
<!--    &lt;!&ndash;            <div class="overflow-y-auto text-4xl" tabindex="-1">&ndash;&gt;-->
<!--    &lt;!&ndash;                <Autocomplete bind:input={query} options={suggestions} on:selection={onFlavorSelection}/>&ndash;&gt;-->
<!--    &lt;!&ndash;            </div>&ndash;&gt;-->
<!--    &lt;!&ndash;        </div>&ndash;&gt;-->
<!--    &lt;!&ndash;    <div class="fixed top-0 left-0 h-screen w-screen">asdf</div>&ndash;&gt;-->

<!--    &lt;!&ndash;    <div class="grid place-content-center">&ndash;&gt;-->
<!--    &lt;!&ndash;        <div class="">&ndash;&gt;-->
<!--    &lt;!&ndash;            <input type="search" class="text-6xl input" placeholder="Search for anything" bind:value={query}>&ndash;&gt;-->
<!--    &lt;!&ndash;            {#each suggestions as s}&ndash;&gt;-->
<!--    &lt;!&ndash;                <p>{s}</p>&ndash;&gt;-->
<!--    &lt;!&ndash;            {/each}&ndash;&gt;-->
<!--    &lt;!&ndash;        </div>&ndash;&gt;-->
<!--    &lt;!&ndash;    </div>&ndash;&gt;-->
<!--</dialog>-->
