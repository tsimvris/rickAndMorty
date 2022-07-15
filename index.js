// const { doc } = require('prettier');

console.clear();

let arrSeasonData = [];
let currentSeasonNumber = 1;

function resetSeasonOverview() {
  //
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

showSeasonOverview();

seasonNavigation();

function seasonNavigation() {
  const navButtons = document.querySelectorAll('.episodeGuide button');
  const staffelContainer1 = document.querySelector('#staffel1');
  const staffelContainer2 = document.querySelector('#staffel2');
  const staffelContainer3 = document.querySelector('#staffel3');
  const staffelContainer4 = document.querySelector('#staffel4');
  const staffelContainer5 = document.querySelector('#staffel5');

  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      index++;
      staffelContainer1.classList.remove('show__seasons');
      staffelContainer2.classList.remove('show__seasons');
      staffelContainer3.classList.remove('show__seasons');
      staffelContainer4.classList.remove('show__seasons');
      staffelContainer5.classList.remove('show__seasons');
      ['staffelContainer' + index].classList.add('show__seasons');

      console.log(['staffelContainer' + index]);
    });
  });

  //  console.log(navButtons);
}
