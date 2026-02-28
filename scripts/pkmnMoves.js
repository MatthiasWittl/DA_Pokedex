async function getPokemonMoves(index) {
  if (!movesData.length == 0) {
    await movesFromStorage(index);
    return true;
  } else {
    await getPkmnMovesFromAPI(index);
  }
  return true;
}

async function movesFromStorage(index) {
  for (let moveIndex = 0; moveIndex < maxAmountMoves && moveIndex < pokemonData[index].moves.length; moveIndex++) {
    let moveURL = pokemonData[index].moves[moveIndex].move.url;
    let moveName = pokemonData[index].moves[moveIndex].move.name;
    await singleMovesStorageOrAPI(moveURL, moveName);
  }
  return true;
}

async function singleMovesStorageOrAPI(moveURL, moveName) {
  for (let index = 0; index < Object.keys(movesData).length; index++) {
    if (moveName === movesData[index].name) {
      break;
    } else if (index === Object.keys(movesData).length - 1) {
      await getSingleMovesFromAPI(moveURL);
    }
  }
  return true;
}

async function getSingleMovesFromAPI(moveURL) {
  let promise = await fetch(moveURL).then((response) => {
    if (!response.ok) {
      retryFetch(moveURL);
    }
    return response.json();
  });
  movesData[Object.keys(movesData).length] = { ...promise };
  return true;
}

async function getPkmnMovesFromAPI(index) {
  for (let moveIndex = 0; moveIndex < maxAmountMoves && moveIndex < pokemonData[index].moves.length; moveIndex++) {
    let moveURL = pokemonData[index].moves[moveIndex].move.url;
    let promise = fetch(moveURL).then((response) => {
      if (!response.ok) {
        retryFetch(moveURL);
      }
      return response.json();
    });
    promisesMoves.push(promise);
  }
  let results = await Promise.allSettled(promisesMoves);
  movesData = results.filter(({ status }) => status === "fulfilled").map(({ value }) => value);
  return true;
}

function showPkmnMoves(index) {
  changeSingleViewBtnHighlight("pkmn_moves_btn");
  swapContainerClasses.remove("evolution_chain_img_container", "pkmn_box_color");
  document.getElementById("swap_container_id").innerHTML = "";
  document.getElementById("swap_container_id").innerHTML += pkmnMoves(index);
  movesTypeColorFilter();
}

function pkmnMoves(index) {
  let itemsHTML = "";
  for (let iMove = 0; iMove < pokemonData[index].moves.length && iMove < maxAmountMoves; iMove++) {
    itemsHTML += `<li  ><img src="" class="move_icon">${pokemonData[index].moves[iMove].move.name}</li>`;
  }
  return renderMoves(itemsHTML);
}

function movesTypeColorFilter() {
  const moveList = document.querySelectorAll(".move_backgr_color li");
  moveList.forEach((item) => {
    let movesHtmlName = item.lastChild.data;
    let imgSource = item.querySelector("img");
    for (let i = 0; i < Object.keys(movesData).length; i++) {
      if (movesHtmlName === movesData[i].name) {
        let colorTypeMove = movesData[i].type.name;
        let movesColor = typeColors[colorTypeMove];
        item.style.setProperty("--move_type_color", movesColor);
        imgSource.src = "assets/moves_images/" + movesData[i].type.name + ".webp";
      }
    }
  });
}
