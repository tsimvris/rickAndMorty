// const { doc } = require('prettier');

console.clear();

let arrSeasonData = [];
let currentSeasonNumber = 1;

function resetSeasonOverview() {
  
  const killMe = document.querySelector('[data-js="episodeList' + currentSeasonNumber +'"]');
  killMe.innerText = "";
}

function paginated_fetch(
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

        return paginated_fetch(url, page, response);
      }

      //console.log(response);

      filterSeasons(response);
    })
    .catch(error => {
      console.error(error.message);
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
  paginated_fetch();
}

function showEpisodeView(episodeNumber = 1) {
  console.log(episodeNumber);
  resetEpisodeView();
  buildEpisodeView();
}


function seasonNavigation() {
  const navButtons = document.querySelectorAll('.episodeGuide button');
  const arrStaffelIDS = [document.querySelector('#staffel1'),
  document.querySelector('#staffel2'),
  document.querySelector('#staffel3'),
  document.querySelector('#staffel4'),
  document.querySelector('#staffel5')
];

  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {

      arrStaffelIDS.forEach((ele) => {
          ele.classList.remove('show__seasons');
      })
      arrStaffelIDS[index].classList.add('show__seasons');

      // Call show
      currentSeasonNumber = 1 + index;
      showSeasonOverview();
    });
  });
  // init
  arrStaffelIDS[0].classList.add('show__seasons');
}


showSeasonOverview();
seasonNavigation();
