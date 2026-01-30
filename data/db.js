let pokemonNames = {};

let pokemonNames1;

let pokemonData = {};

let movesData = {};

let pokemonSpecies = {};

let pokemonEvolutionChain = {};

let firstAmountOfLoadingPokemon = 12; 

let remainingPokemonDataToLoad = 12; /* 139 max Loading Pokemon 151 - firstAmountOfLoadingPokemon 12 */

let moreAmountOfLoadingPokemon = 12;

let maxAmountofPokemonFromAPI = 150; /* Anzahl Pokemon Standard Edition 151, Liste startet bei 0 deshalb 150*/

const typeColors = {
    bug: "#A8B820",
    dragon: "#7038F8",
    electric: "#F8D030",
    fairy: "#EE99AC",
    fighting: "#C03028",
    fire: "#F08030",
    flying: "#A890F0",
    ghost: "#705898",
    grass: "#78C850",
    ground: "#E0C068",
    ice: "#98D8D8",
    normal: "#A8A878",
    poison: "#A040A0",
    psychic: "#F85888",
    rock: "#B8A038",
    steel: "#B8B8D0",
    water: "#6890F0"
  };
