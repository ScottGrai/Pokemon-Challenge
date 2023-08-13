import fetch from "node-fetch";
import * as readline from "readline";

import { IChainLink, IEvolutionChain, IPokemonSpecies, IReturnEvolutionChain } from "./models/interfaces";



// This is the function that Google Cloud Functions would call when requests are made to the endpoint 
// and how the project would run when deployed as a GFC

// export async function evolutionChain(req, res) {
//   if (req.query?.pokemonToSearch) {
//     try {
//       const result = await queryAndFormatChainLink(req.query.pokemonToSearch);
//       res.json(result);
//     } catch (error) {
//       res.error(error);
//     }
//   }
// }

// In this instance we just run it locally via this function call

evolutionChain();

function evolutionChain() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Please input pokemon name: ", (answer) => {
    const pokemonName = answer.toLowerCase();

    queryAndFormatChainLink(pokemonName)
      .then((result) => {
        console.log(JSON.stringify(result, null, 2));
        // Return the result to the server that request it
      });

    rl.close();
  });
}

export async function queryAndFormatChainLink(name: string, url?: string): Promise<IReturnEvolutionChain> {
  let species: IPokemonSpecies;
  if (url) {
    species = await querySpecies("", url);
  } else {
    species = await querySpecies(name);
  }

  const evolutionChain = await queryEvolutionChain(species.evolution_chain.url);

  return processEvolutionChain(evolutionChain.chain);
}

async function querySpecies(name: string, url?: string): Promise<IPokemonSpecies> {
  let endpoint = "";
  if (url) {
    endpoint = url;
  } else if (name) {
    endpoint = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
  } else {
    throw new Error("No endpoint or name provided");
  }

  const result = await fetch(endpoint);
  if (result.status !== 200) {
    throw new Error("Invalid pokemon name");
  }
  const resultJson = await result.json();
  return resultJson as IPokemonSpecies;
}

async function queryEvolutionChain(endpoint: string): Promise<IEvolutionChain> {
  try {
    const result = await fetch(endpoint);
    const resultJson = await result.json();
    return resultJson as IEvolutionChain;
  } catch (err) {
    throw new Error(err);
  }
}

function processEvolutionChain(chain: IChainLink) {
  console.log(`Processing chain for ${chain.species.name}`);
  if (chain.evolves_to.length === 0) {
    console.log("Chain ends");
    return { name: chain.species.name, variations: [] };
  }

  console.log("Chain found, processing further...");

  let variations = [];
  for (const subChain of chain.evolves_to) {
    variations.push(processEvolutionChain(subChain));
  }

  return { name: chain.species.name, variations }
}
