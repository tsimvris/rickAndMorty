// const { doc } = require('prettier');

console.clear();

let arrSeasonData = [];
let currentSeasonNumber = 1;

function resetSeasonOverview() {
  const killMe = document.querySelector(
    '[data-js="episodeList' + currentSeasonNumber + '"]'
  );
  killMe.innerText = '';
}

function paginatedFetch(
  url = 'https://rickandmortyapi.com/api/episode/', // Improvised required argument in JS
  page = 1,
  previousResponse = []
) {
  return fetch(`${url}?page=${page}`) // Append the page number to the base URL
    .then(response => response.json())
    .then(newResponse => {
      const response = [...previousResponse, ...newResponse.results]; // Combine the two arrays

      if (page < 3) {
        page++;

        return paginatedFetch(url, page, response);
      }

      // console.log(response);

      filterSeasons(response);
    })
    .catch(error => {
      console.error(error.message);
    });
}

// function paginatedCharacterFetch(
//   url = 'https://rickandmortyapi.com/api/character/', // Improvised required argument in JS
//   page = 1,
//   previousResponse = []
// ) {
//   return fetch(`${url}${page}`) // Append the page number to the base URL
//     .then(response => response.json())
//     .then(newResponse => {
//       const response = [...previousResponse, ...newResponse.name];
//       // Combine the two arrays

//       if (page < 20) {
//         page++;
//         // console.log(newResponse);
//         return paginatedCharacterFetch(url, page, response);
//       }
//       console.log(newResponse);
//       createCharacterCard(newResponse);
//     })
//     .catch(error => {
//       console.error(error.message);
//     });
// }

function paginatedCharacterFetch() {
  const limitPerPage = 20;
  const apiUrl = 'https://rickandmortyapi.com/api/character/';

  const getUsers = async function (pageNo = 1) {
    let actualUrl = apiUrl + `?page=${pageNo}&limit=${limitPerPage}`;
    var apiResults = await fetch(actualUrl).then(resp => {
      return resp.json();
    });

    return apiResults;
  };

  const getEntireUserList = async function (pageNo = 1) {
    const results = await getUsers(pageNo);
    console.log('Retreiving data from API for page : ' + pageNo);
    if (results.length > 0) {
      return results.concat(await getEntireUserList(pageNo + 1));
    } else {
      return results;
    }
  };

  (async () => {
    const entireList = await getEntireUserList();
    console.log(entireList.results);
    createCharacterCard(entireList.results);
  })();
}

paginatedCharacterFetch();

function createCharacterCard(characterCard) {
  characterCard.forEach(character => {
    const characterList = document.querySelector('[data-js="characterList"]');

    const characterContainer = document.createElement('div');
    characterContainer.classList.add('character-container');

    const characterInfoContainer = document.createElement('article');
    characterInfoContainer.classList.add('info-container');

    const characterInfoList = document.createElement('ul');
    characterInfoList.classList.add('character-info-list');

    const characterName = document.createElement('h2');
    characterName.classList.add('character-name');
    characterName.innerText = character.name;
    const characterImg = document.createElement('img');
    characterImg.classList.add('character-img');
    characterImg.src = character.image;

    const characterInfoSpecies = document.createElement('li');
    characterInfoSpecies.classList.add('character-info-list__item');
    characterInfoSpecies.innerHTML = `<span>Species:</span> ${character.species}`;
    const characterInfoUniverse = document.createElement('li');
    characterInfoUniverse.classList.add('character-info-list__item');
    characterInfoUniverse.innerHTML = `<span>Universe:</span> ${character.origin.name}`;
    const characterInfoStatus = document.createElement('li');
    characterInfoStatus.classList.add('character-info-list__item');
    characterInfoStatus.innerHTML = `<span>Status:</span> ${character.status}`;

    characterList.append(characterContainer);
    characterContainer.append(characterName, characterInfoContainer);
    characterInfoContainer.append(characterImg, characterInfoList);
    characterInfoList.append(
      characterInfoSpecies,
      characterInfoUniverse,
      characterInfoStatus
    );
  });
}

function filterSeasons(seasons) {
  arrSeasonData = seasons.filter(season => {
    const seasonNumber = Number(season.episode.substring(2, 3));
    // console.log(seasonNumber)
    return currentSeasonNumber === seasonNumber;
  });
  buildEpisodeView();
}

// function buildSeasonView() {
//   //
// }

// function resetEpisodeView() {
//   //
// }

function buildEpisodeView() {
  const dynamicSeasonContainer = document.querySelector(
    `[data-js="episodeList${currentSeasonNumber}"]`
  );

  arrSeasonData.forEach(episode => {
    const dynamicSeasonItem = document.createElement('li');
    const dynamicSeasonButton = document.createElement('button');
    dynamicSeasonItem.classList.add('episode-list__li');
    dynamicSeasonButton.classList.add('episode-list__button');
    dynamicSeasonItem.append(dynamicSeasonButton);
    dynamicSeasonContainer.append(dynamicSeasonItem);
    dynamicSeasonButton.innerText = episode.name;
  });
}

function showSeasonOverview() {
  resetSeasonOverview();
  paginatedFetch();
}

// function showEpisodeView(episodeNumber = 1) {
//   console.log(episodeNumber);
//   resetEpisodeView();
//   buildEpisodeView();
// }

function seasonNavigation() {
  const navButtons = document.querySelectorAll('.episodeGuide button');
  const arrStaffelIDS = [
    document.querySelector('#staffel1'),
    document.querySelector('#staffel2'),
    document.querySelector('#staffel3'),
    document.querySelector('#staffel4'),
    document.querySelector('#staffel5'),
  ];

  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      arrStaffelIDS.forEach(ele => {
        ele.classList.remove('show__seasons');
      });
      arrStaffelIDS[index].classList.add('show__seasons');

      // Call show
      currentSeasonNumber = 1 + index;
      showSeasonOverview();
    });
  });
  // init
  arrStaffelIDS[0].classList.add('show__seasons');
}

// -------------------   Character Guide   ------------------ //

showSeasonOverview();
seasonNavigation();
