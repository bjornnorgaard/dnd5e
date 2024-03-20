<script lang="ts">
    import { appendSign } from "$lib/utils/positiveSign";

    export let label: string;
    export let value: number;

    function mapAttributeToModifier(value: number): string {
        const modifier = Math.floor((value - 10) / 2);
        return appendSign(modifier);
    }
</script>

<div class="flex w-full flex-col gap-1 text-center">
    <div class="font-bold uppercase text-primary-500">{label}</div>
    <div>
        <span class="font-light">{value}</span>
        (<span class="font-bold">{mapAttributeToModifier(value)}</span>)
    </div>
</div>
