<script lang="ts">
    import { page } from "$app/stores";

    const name = "D&D by Bear";
    const rootUrl = "https://dnd.bybear.dk"
    const author = "Bjørn Nørgaard";

    let title = `${name} - Tools for Dungeons & Dragons 5e`;
    let description = "Initiative tracker for D&D 5th Edition, includes a beastiary and a spellbook.";
    let type = "website";
    let url = rootUrl;

    const width = 1400;
    const height = 800;
    const image = `https://picsum.photos/id/251/${width}/${height}`;
</script>

<svelte:head>
    <title>{title}</title>
    <link rel="canonical" href={url+$page.route.id}>

    <meta name="description" content={description}>
    <meta name="author" content={author}>
    <meta property="article:publisher" content={rootUrl}>

    <meta property="og:site_name" content={name}>
    <meta property="og:locale" content="da_DK">
    <meta property="og:type" content={type}>
    <meta property="og:url" content={url}>
    <meta property="og:title" content={title}>
    <meta property="og:description" content={description}>
    <meta property="og:url" content={url}>

    <meta property="og:image" content={image}>
    <meta property="og:image:width" content={width.toString()}>
    <meta property="og:image:height" content={height.toString()}>
    <meta property="og:image:type" content="image/jpeg">

    <meta property="twitter:domain" content={rootUrl}>
    <meta property="twitter:url" content={url}>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content={title}>
    <meta name="twitter:description" content={description}>
    <meta name="twitter:image" content={image}>
</svelte:head>
