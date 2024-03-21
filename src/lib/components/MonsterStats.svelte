<script lang="ts">
    import type { Monster } from "$lib/types/monster";
    import MonsterAttribute from "$lib/components/MonsterAttribute.svelte";
    import { appendSign } from "$lib/utils/positiveSign";
    import StatblockSection from "$lib/components/StatblockSection.svelte";
    import StatblockDivider from "$lib/components/StatblockDivider.svelte";
    import { fetchSpell } from "$lib/utils/fetchSpell";
    import { ProgressBar } from "@skeletonlabs/skeleton";

    export let monster: Monster | null = null;
</script>

<div class="p-4 text-sm card">
    {#if !monster?.name}
        <h2 class="h2">
            Nothing selected
        </h2>
    {:else}
        {@const m = monster}

        <h2 class="font-bold h2 text-primary-500">{monster.name}</h2>

        <p>
            {#if m.size}{m.size},{/if}
            {#if m.type}{m.type},{/if}
            {#if m.subtype}{m.subtype},{/if}
            {#if m.group}{m.group},{/if}
            {#if m.alignment}{m.alignment}{/if}
        </p>

        <StatblockDivider/>

        <p><b>Armor Class</b> {m.armor_class} ({m.armor_desc})</p>
        <p><b>Hit Points</b> {m.hit_points} ({m.hit_dice})</p>
        <p><b>Speed</b>
            {#each Object.keys(m.speed) as key, i}
                {#if m.speed[key]}
                    {#if i !== 0},{/if}
                    {key} {m.speed[key]} ft.
                {/if}
            {/each}
        </p>

        <StatblockDivider/>

        <div class="flex justify-between py-1">
            <MonsterAttribute label="str" value={m.strength}/>
            <MonsterAttribute label="dex" value={m.dexterity}/>
            <MonsterAttribute label="con" value={m.constitution}/>
            <MonsterAttribute label="int" value={m.intelligence}/>
            <MonsterAttribute label="wis" value={m.wisdom}/>
            <MonsterAttribute label="cha" value={m.charisma}/>
        </div>

        <StatblockDivider/>

        {#if m.strength_save || m.dexterity_save || m.constitution_save || m.intelligence_save || m.wisdom_save || m.charisma_save}
            <p>
                <b>Saving Throws</b>
                {#if m.strength_save}
                    <span>Str {appendSign(m.strength_save)}</span>,
                {/if}
                {#if m.dexterity_save}
                    <span>Dex {appendSign(m.dexterity_save)}</span>,
                {/if}
                {#if m.constitution_save}
                    <span>Con {appendSign(m.constitution_save)}</span>,
                {/if}
                {#if m.intelligence_save}
                    <span>Int {appendSign(m.intelligence_save)}</span>,
                {/if}
                {#if m.wisdom_save}
                    <span>Wis {appendSign(m.wisdom_save)}</span>,
                {/if}
                {#if m.charisma_save}
                    <span>Cha {appendSign(m.charisma_save)}</span>
                {/if}
            </p>
        {/if}

        {#if Object.keys(m.skills).length > 0}
            <b>Skills</b>
            {#each Object.keys(m.skills) as skill, i}
                {#if m.skills[skill]}
                    {#if i !== 0},{/if}
                    {skill} {appendSign(m.skills[skill])}
                {/if}
            {/each}
        {/if}

        {#if m.damage_vulnerabilities}
            <p>
                <b>Damage Vulnerabilities</b>
                <span>{m.damage_vulnerabilities}</span>
            </p>
        {/if}
        {#if m.damage_immunities}
            <p>
                <b>Damage Immunities</b>
                <span>{m.damage_immunities}</span>
            </p>
        {/if}
        {#if m.condition_immunities}
            <p>
                <b>Condition Immunities</b>
                <span>{m.condition_immunities}</span>
            </p>
        {/if}
        {#if m.damage_resistances}
            <p>
                <b>Damage Resistances</b>
                <span>{m.damage_resistances}</span>
            </p>
        {/if}

        {#if m.senses}
            <p>
                <b>Senses</b>
                <span>{m.senses}</span>
            </p>
        {/if}

        {#if m.languages}
            <p>
                <b>Languages</b>
                <span>{m.languages}</span>
            </p>
        {/if}

        <p>
            <b>Challenge</b>
            <span>{m.challenge_rating}</span>
        </p>

        <StatblockDivider/>

        {#if m.special_abilities}
            <div class="pt-2 space-y-4">

                {#each m.special_abilities as ability}
                    <p><b>{ability.name}</b> {ability.desc}</p>
                {/each}
            </div>
        {/if}

        <StatblockSection title="Reactions" condition={!!m.reactions}>
            {#each m.reactions as reaction}
                <p><b>{reaction.name}</b> {reaction.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Actions" condition={!!m.actions}>
            {#each m.actions as action}
                <p><b>{action.name}</b> {action.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Bonus Actions" condition={!!m.bonus_actions}>
            {#each m.bonus_actions as action}
                <p><b>{action.name}</b> {action.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Legendary Actions" condition={!!m.legendary_actions}>
            <p>{m.legendary_desc}</p>

            {#each m.legendary_actions as action}
                <p><b>{action.name}</b> {action.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Spells" condition={!!m.spell_list.length}>
            {#each m.spell_list as url}
                {#await fetchSpell(url)}
                    <p class="py-2">
                        <ProgressBar value={undefined}/>
                    </p>
                {:then s}
                    <div>
                        <p><b class="text-lg text-primary-500">{s.name}</b></p>
                        <p class="pb-2 italic">{s.level} {s.school.toLowerCase()} {s.can_be_cast_as_ritual ? "(ritual)" : ""}</p>
                        <p><b>Casting Time</b> {s.casting_time}</p>
                        <p><b>Range</b> {s.range}</p>
                        <p><b>Components</b> {s.components}</p>
                        {#if s.requires_material_components}
                            <p><b>Materials</b> {s.material}</p>
                        {/if}
                        <p><b>Duration</b>
                            {s.requires_concentration ? "Concentration," : ""}
                            {s.duration.toLowerCase()}
                        </p>

                        <p class="pt-2 indent-4">{s.desc}</p>

                        {#if s.higher_level}
                            <p class="pt-2"><b>At Higher Levels</b> {s.higher_level}</p>
                        {/if}
                    </div>
                {:catch error}
                    <p>Error: {error}</p>
                {/await}
            {/each}
        </StatblockSection>
    {/if}
</div>
