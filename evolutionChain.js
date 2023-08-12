"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Please input pokemon name: ", (answer) => {
    const pokemonName = answer.toLowerCase();
    queryAndFormatChainLink(pokemonName)
        .then((result) => {
        console.log(JSON.stringify(result, null, 2));
    });
    rl.close();
});
function queryAndFormatChainLink(name, url) {
    return __awaiter(this, void 0, void 0, function* () {
        let species;
        if (url) {
            species = yield querySpecies("", url);
        }
        else {
            species = yield querySpecies(name);
        }
        const evolutionChain = yield queryEvolutionChain(species.evolution_chain.url);
        return processEvolutionChain(evolutionChain.chain);
    });
}
function querySpecies(name, url) {
    return __awaiter(this, void 0, void 0, function* () {
        let endpoint = "";
        if (url) {
            endpoint = url;
        }
        else if (name) {
            endpoint = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
        }
        else {
            throw new Error("No endpoint or name provided");
        }
        try {
            const result = yield (0, node_fetch_1.default)(endpoint);
            if (result.status !== 200) {
                // return the error rather than throw new one
                throw new Error("Invalid pokemon name");
            }
            const resultJson = yield result.json();
            return resultJson;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function queryEvolutionChain(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, node_fetch_1.default)(endpoint);
            const resultJson = yield result.json();
            return resultJson;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function processEvolutionChain(chain) {
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
    return { name: chain.species.name, variations };
}
//# sourceMappingURL=evolutionChain.js.map