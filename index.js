console.clear();

let arrSeasonData = [];

function resetSeasonOverview(){
    //
}

function filterSeasonData(){
    //
    const apiURL = "https://rickandmortyapi.com/api/episode";
    fetch(apiURL)
    .then(response => response.json())
    .then((data) => {

        arrSeasonData = data.results;
        buildSeasonView();
    });

}

function buildSeasonView(){
    //
    buildEpisodeView();
}

function resetEpisodeView(){
    //
}

function buildEpisodeView(){
    
    const dynamicSeasonContainer = document.querySelector('[data-js="episodeList"]');

    arrSeasonData.forEach((episode) => {

        const dynamicSeasonItem = document.createElement("li");
        const dynamicSeasonButton = document.createElement("button");  
        dynamicSeasonItem.classList.add("episode-list__li");
        dynamicSeasonButton.classList.add("episode-list__button");
        dynamicSeasonItem.append(dynamicSeasonButton);
        dynamicSeasonContainer.append(dynamicSeasonItem);
        dynamicSeasonButton.innerText = episode.name;


    });
}



function showSeasonOverview (seasonNumber=1) {

    console.log(seasonNumber);
    resetSeasonOverview()
 
    /* s01e01 */
    filterSeasonData()
    
}


function showEpisodeView (episodeNumber=1) {

    console.log(episodeNumber);
    resetEpisodeView();
    buildEpisodeView();
}

showSeasonOverview();

showEpisodeView();

