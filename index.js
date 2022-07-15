console.clear();

let arrSeasonData = [];
let currentSeasonNumber = 1;

function resetSeasonOverview() {
  //
}

function getSeasonData() {
  //
  const apiURL = 'https://rickandmortyapi.com/api/episode';
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      arrSeasonData = data.results;

      filterSeasons(data.results);
    });
    

}

function filterSeasons(seasons){
      
  arrSeasonData = seasons.filter((season)=> {
    const seasonNumber = Number(season.episode.substring(2,3) );

    console.log(seasonNumber)

    return currentSeasonNumber === seasonNumber
  })
  
  
  
  
  buildEpisodeView();





}


function buildSeasonView() {
  //
  buildEpisodeView();
}

function resetEpisodeView() {
  //
}

function buildEpisodeView() {
  const dynamicSeasonContainer = document.querySelector(
    '[data-js="episodeList"]'
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
  console.log(seasonNumber);
  resetSeasonOverview();

  /* s01e01 */
  getSeasonData();
}

function showEpisodeView(episodeNumber = 1) {
  console.log(episodeNumber);
  resetEpisodeView();
  buildEpisodeView();
}

showSeasonOverview();

showEpisodeView();
