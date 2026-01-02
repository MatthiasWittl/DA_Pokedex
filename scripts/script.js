
async function loadFirstPokemons() {
    let data = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0");
    pokemonNames1 = await data.json();
    await loadPokemonData();
    startrender();
}
    
function startrender() {
    for (let index = 0; index < pokemonNames1.results.length; index++) {
        document.getElementById("main_container").innerHTML += renderPokemonBox1(index);
        
    }
    
}

async function loadPokemonData() {
    for (let index = 0; index < pokemonNames1.results.length; index++) {
        let data = await fetch ("https://pokeapi.co/api/v2/pokemon/" + (index+1));
        let pokemonuno = await data.json();
        pokemonNames1.results[index] = {
            ...pokemonNames1.results[index],
            ...pokemonuno
        };
  
    }
}

/* async function loadFirstPokemonTry() {
    for (let index = 0; index < 12; index++) {
        let data = await fetch ("https://pokeapi.co/api/v2/pokemon/" + (index+1));
        let pokemonSuper = await data.json();
        pokemonNames[index] = pokemonSuper;
        document.getElementById("main_container").innerHTML += renderPokemonBox(index);
        
    }
}*/

async function loadFirstPokemonTry() {
    const requests = Array.from({ length: 12 }, (_, i) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
        .then(res => res.json())
    );
  
    const results = await Promise.all(requests);
  
    let html = "";
  
    results.forEach((pokemon, index) => {
      pokemonNames[index] = pokemon;
      html += renderPokemonBox(index);
    });
  
    document.getElementById("main_container").innerHTML = html;
  }