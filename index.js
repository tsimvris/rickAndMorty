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

function paginatedCharacterFetch(
  url = 'https://rickandmortyapi.com/api/character/', // Improvised required argument in JS
  page = 1,
  previousResponse = []
) {
  return fetch(`${url}${page}`) // Append the page number to the base URL
    .then(response => response.json())
    .then(newResponse => {
      const response = [...previousResponse, ...newResponse.name]; // Combine the two arrays

      if (page < 20) {
        page++;
        return paginatedCharacterFetch(url, page, response);
      }
      console.log(newResponse);
      createCharacterCard(newResponse);
    })
    .catch(error => {
      console.error(error.message);
    });
}

paginatedCharacterFetch();

function createCharacterCard(card) {
  card.forEach(character => {
    const characterContainer = document.querySelector(
      '[data-js="characterContainer"]'
    );

    const characterInfoList = document.querySelector(
      '[data-js="characterInfoList"]'
    );
    const characterInfoContainer = document.querySelector(
      '[data-js="characterInfoContainer"]'
    );
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

    characterContainer.append(characterName);
    characterInfoContainer.append(characterImg);
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

function resetEpisodeView() {
  //
}

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

function showSeasonOverview(seasonNumber = 1) {
  resetSeasonOverview();
  paginatedFetch();
}

function showEpisodeView(episodeNumber = 1) {
  console.log(episodeNumber);
  resetEpisodeView();
  buildEpisodeView();
}

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
