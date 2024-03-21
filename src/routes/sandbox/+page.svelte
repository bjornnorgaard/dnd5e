<script lang="ts">
    import MonsterStats from "$lib/components/MonsterStats.svelte";
    import { onMount } from "svelte";
    import type { Monster } from "$lib/types/monster";

    const dragonJson = " {\n" +
        "        \"slug\": \"ancient-black-dragon\",\n" +
        "        \"desc\": \"\",\n" +
        "        \"name\": \"Ancient Black Dragon\",\n" +
        "        \"size\": \"Gargantuan\",\n" +
        "        \"type\": \"Dragon\",\n" +
        "        \"subtype\": \"\",\n" +
        "        \"group\": \"Black Dragon\",\n" +
        "        \"alignment\": \"chaotic evil\",\n" +
        "        \"armor_class\": 22,\n" +
        "        \"armor_desc\": \"natural armor\",\n" +
        "        \"hit_points\": 367,\n" +
        "        \"hit_dice\": \"21d20+147\",\n" +
        "        \"speed\": {\n" +
        "            \"walk\": 40,\n" +
        "            \"fly\": 80,\n" +
        "            \"swim\": 40\n" +
        "        },\n" +
        "        \"strength\": 27,\n" +
        "        \"dexterity\": 14,\n" +
        "        \"constitution\": 25,\n" +
        "        \"intelligence\": 16,\n" +
        "        \"wisdom\": 15,\n" +
        "        \"charisma\": 19,\n" +
        "        \"strength_save\": null,\n" +
        "        \"dexterity_save\": 9,\n" +
        "        \"constitution_save\": 14,\n" +
        "        \"intelligence_save\": null,\n" +
        "        \"wisdom_save\": 9,\n" +
        "        \"charisma_save\": 11,\n" +
        "        \"perception\": 16,\n" +
        "        \"skills\": {\n" +
        "            \"perception\": 16,\n" +
        "            \"stealth\": 9\n" +
        "        },\n" +
        "        \"damage_vulnerabilities\": \"\",\n" +
        "        \"damage_resistances\": \"\",\n" +
        "        \"damage_immunities\": \"acid\",\n" +
        "        \"condition_immunities\": \"\",\n" +
        "        \"senses\": \"blindsight 60 ft., darkvision 120 ft., passive Perception 26\",\n" +
        "        \"languages\": \"Common, Draconic\",\n" +
        "        \"challenge_rating\": \"21\",\n" +
        "        \"cr\": 21,\n" +
        "        \"actions\": [\n" +
        "            {\n" +
        "                \"name\": \"Multiattack\",\n" +
        "                \"desc\": \"The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.\"\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"Bite\",\n" +
        "                \"desc\": \"Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) acid damage.\",\n" +
        "                \"attack_bonus\": 15,\n" +
        "                \"damage_dice\": \"2d10+2d8\",\n" +
        "                \"damage_bonus\": 8\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"Claw\",\n" +
        "                \"desc\": \"Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.\",\n" +
        "                \"attack_bonus\": 15,\n" +
        "                \"damage_dice\": \"2d6\",\n" +
        "                \"damage_bonus\": 8\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"Tail\",\n" +
        "                \"desc\": \"Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.\",\n" +
        "                \"attack_bonus\": 15,\n" +
        "                \"damage_dice\": \"2d8\",\n" +
        "                \"damage_bonus\": 8\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"Frightful Presence\",\n" +
        "                \"desc\": \"Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.\"\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"Acid Breath (Recharge 5-6)\",\n" +
        "                \"desc\": \"The dragon exhales acid in a 90-foot line that is 10 feet wide. Each creature in that line must make a DC 22 Dexterity saving throw, taking 67 (15d8) acid damage on a failed save, or half as much damage on a successful one.\"\n" +
        "            }\n" +
        "        ],\n" +
        "        \"bonus_actions\": null,\n" +
        "        \"reactions\": null,\n" +
        "        \"legendary_desc\": \"The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.\",\n" +
        "        \"legendary_actions\": [\n" +
        "            {\n" +
        "                \"name\": \"Detect\",\n" +
        "                \"desc\": \"The dragon makes a Wisdom (Perception) check.\"\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"Tail Attack\",\n" +
        "                \"desc\": \"The dragon makes a tail attack.\"\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"Wing Attack (Costs 2 Actions)\",\n" +
        "                \"desc\": \"The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.\"\n" +
        "            }\n" +
        "        ],\n" +
        "        \"special_abilities\": [\n" +
        "            {\n" +
        "                \"name\": \"Amphibious\",\n" +
        "                \"desc\": \"The dragon can breathe air and water.\"\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"Legendary Resistance (3/Day)\",\n" +
        "                \"desc\": \"If the dragon fails a saving throw, it can choose to succeed instead.\"\n" +
        "            }\n" +
        "        ],\n" +
        "        \"spell_list\": [],\n" +
        "        \"page_no\": 280,\n" +
        "        \"environments\": [\n" +
        "            \"Swamp\"\n" +
        "        ],\n" +
        "        \"img_main\": null,\n" +
        "        \"document__slug\": \"wotc-srd\",\n" +
        "        \"document__title\": \"5e Core Rules\",\n" +
        "        \"document__license_url\": \"http://open5e.com/legal\",\n" +
        "        \"document__url\": \"http://dnd.wizards.com/articles/features/systems-reference-document-srd\"\n" +
        "    }"

    let monster: Monster = JSON.parse(dragonJson);

</script>

<div class="h-full p-8">
    <div class="mx-auto h-5/6 w-96">
        <MonsterStats bind:monster={monster}/>
    </div>
</div>
