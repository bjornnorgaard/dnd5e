<script lang="ts">
    import type { Monster } from "$lib/types/monster";
    import MonsterAttribute from "$lib/components/MonsterAttribute.svelte";
    import { appendSign } from "$lib/utils/positiveSign";
    import StatblockSection from "$lib/components/StatblockSection.svelte";
    import StatblockDivider from "$lib/components/StatblockDivider.svelte";
    import { pruneDesc } from "$lib/utils/pruneDesc";

    /* NYI fields
    * desc,
    * subtype,
    * group,
    * condition_immunities,
    * bonus_actions,
    * reactions,
    * spell_list,
    * page_no,
    * environments
    * */

    export let monster: Monster | null = null;
</script>

<div class="p-4 text-sm card">
    {#if !monster?.name}
        <h2 class="h2">
            Nothing selected
        </h2>
    {:else}
        {@const m = monster}
        <h2 class="h2 text-primary-500">{monster.name}</h2>
        <p>{m.size}, {m.type}, {m.alignment}</p>
        <p>{pruneDesc(m.desc)}</p>

        <pre>{JSON.stringify({
            desc: m.desc,
            subtype: m.subtype,
            group: m.group,
            condition_immunities: m.condition_immunities,
            bonus_actions: m.bonus_actions,
            reactions: m.reactions,
            spell_list: m.spell_list,
            page_no: m.page_no,
            environments: m.environments,
        }, null, 2)}</pre>

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

        <div class="flex justify-between">
            <MonsterAttribute label="str" value={m.strength}/>
            <MonsterAttribute label="dex" value={m.dexterity}/>
            <MonsterAttribute label="con" value={m.constitution}/>
            <MonsterAttribute label="int" value={m.intelligence}/>
            <MonsterAttribute label="wis" value={m.wisdom}/>
            <MonsterAttribute label="cha" value={m.charisma}/>
        </div>

        <StatblockDivider/>

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

        <p>
            <b>Skills</b>
            {#each Object.keys(m.skills) as skill, i}
                {#if m.skills[skill]}
                    {#if i !== 0},{/if}
                    {skill} {appendSign(m.skills[skill])}
                {/if}
            {/each}
        </p>

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

        <StatblockSection title="Special Abilities" condition={!!m.special_abilities}>
            {#each m.special_abilities as ability}
                <p><b>{ability.name}</b> {ability.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Actions" condition={!!m.actions}>
            {#each m.actions as action}
                <p><b>{action.name}</b> {action.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Legendary Actions" condition={!!m.legendary_actions}>
            <p>{m.legendary_desc}</p>

            {#each m.legendary_actions as action}
                <p><b>{action.name}</b> {action.desc}</p>
            {/each}
        </StatblockSection>
    {/if}
</div>
