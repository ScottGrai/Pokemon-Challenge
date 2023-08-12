export interface IReturnEvolutionChain {
  name: string;
  variations: Array<IReturnEvolutionChain>;
}

// Documentation for type can be found at https://pokeapi.co/docs/v2#pokemon-species
export interface IPokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: INamedAPIResource;
  pokedex_numbers: [{
    entry_number: number;
    pokedex: INamedAPIResource;
  }];
  egg_groups: Array<INamedAPIResource>;
  color: INamedAPIResource;
  shape: INamedAPIResource;
  evolves_from_spacies: INamedAPIResource;
  evolution_chain: { url: string };
  habitat: null;
  generation: INamedAPIResource;
  names: [{
    name: string;
    language: INamedAPIResource;
  }];
  flavor_text_entries: [{
    flavor_text: string;
    language: INamedAPIResource;
    version: INamedAPIResource;
  }];
  form_descriptions: [{
    description: string;
    language: INamedAPIResource;
  }];
  genera: [{
    genus: string;
    language: INamedAPIResource;
  }];
  varieties: [{
    is_default: boolean;
    pokemon: INamedAPIResource;
  }];
}

// Documentation found at https://pokeapi.co/docs/v2#evolution-chains
export interface IEvolutionChain {
  id: number;
  baby_trigger_item: null;
  chain: IChainLink
}

export interface IChainLink {
  is_baby: boolean;
  species: INamedAPIResource;
  evolution_details: Array<any>; // type is IEvolutionDetails, see https://pokeapi.co/docs/v2#evolutiondetail, but not important in our case
  evolves_to: Array<IChainLink>;
}

interface INamedAPIResource {
  name: string;
  url: string;
}
