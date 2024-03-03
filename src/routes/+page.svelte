<script lang="ts">

    import { graphql } from "$houdini";

    let filter: number | null = null;

    const searchStore = graphql(`
        query Search($armorClass: IntFilter){
            monsters(limit: 5, armor_class: $armorClass) {
                name, challenge_rating, armor_class {
                    desc, armor {
                        armor_class {
                            base
                        }
                    }
                }
            }
        }
    `);

    function doSearch() {
        searchStore.fetch({variables: {armorClass: filter}})
    }

</script>

<form on:submit|preventDefault={() => doSearch()}>
    <label for="name">Name</label>
    <input name="name" type="number" autocomplete="off">
</form>

<pre>{JSON.stringify($searchStore, null, 2)}</pre>
