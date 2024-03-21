<script lang="ts">
    export let title: string;
</script>

<div class="flex flex-col gap-4">
    <h1 class="h1 font-bold">{title}</h1>
    <slot/>
</div>
