export const routes = {
    home: () => "/",

    api_creatures: (query: string = "", limit: number = 5) => "/api/creatures",
    api_creature_slug: (slug: string) => `/api/creatures/${slug}`,
    api_spells: (query: string = "", limit: number = 5) => "/api/spells",
    api_spells_slug: (slug: string) => `/api/spells/${slug}`,

    combat: () => "/combat",
    combat_encounter: (id: string) => `/combat/encounters/${id}`,
    combat_creature: (id: string) => `/combat/creatures/${id}`,

    beasts: () => "/beasts",
    beasts_slug: (slug: string) => `/beasts/${slug}`,

    spells: () => "/spells",
    spells_slug: (slug: string) => `/spells/${slug}`,

    characters: () => "/characters",
    characters_slug: (slug: string) => `/characters/${slug}`,
}
