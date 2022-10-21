//You can edit ALL of the code here
const rootElem = document.getElementById("root");

const searchBar = document.getElementById("search-bar");

const episodeDropDown = document.getElementById("episode-dropdown");

const homeButton = document.getElementById("button");


//Start of Api
let allEpisodes   

fetch ('https://api.tvmaze.com/shows/82/episodes')
.then(response =>response.json())
.then(data => {
allEpisodes = data
makePageForEpisodes(allEpisodes)
})
//End of Api

// Return to all shows button event

homeButton.addEventListener("click", () => {
  displayShows(allShows);
  select.style.display = "none";
  homeButton.style.display = "none";
  searchBar.style.display = "none";
  showSearchBar.style.display = "block";
});


function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => {
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    rootElem.appendChild(wrapper);
    const episodeName = document.createElement("h2");
    episodeName.className = "episode-name";
    episodeName.innerHTML = `${episode.name} - ${episodeCode(
      episode.season,
      episode.number
    )}`;
    wrapper.appendChild(episodeName);
    const episodeImage = document.createElement("img");
    episodeImage.className = "episode-image";
    episodeImage.src = episode.image.medium;
    wrapper.appendChild(episodeImage);
    const episodeSummary = document.createElement("p");
    episodeSummary.className = "episode-summary";
    episodeSummary.innerHTML = episode.summary;
    wrapper.appendChild(episodeSummary);
    const episodeOption = document.createElement("option");
    episodeOption.innerHTML = `${episodeCode(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    episodeDropDown.appendChild(episodeOption);
  });
}

const episodeCode = (season, number) => {
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`;
};
searchBar.addEventListener("keyup", (event) => {
  const searchInput = event.target.value.toLowerCase();
  const episodeFilter = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchInput) ||
      episode.summary.toLowerCase().includes(searchInput)
    );
  });

  rootElem.innerHTML = "";
  makePageForEpisodes(episodeFilter);
  document.querySelector(
    ".display-episodes"
  ).innerText = `Displaying ${episodeFilter.length}/${allEpisodes.length}`;
});

episodeDropDown.addEventListener("change", () => {
  let episodeChoice = episodeDropDown.value;
  episodeChoice = episodeChoice.substring(8);
  let newArray = [];
  allEpisodes.forEach((episode) => {
    console.log(episodeChoice);
    if (episodeChoice.includes(episode.name)) {
            newArray.push(episode);
     console.log(newArray);
     if (!episodeChoice){
      console.log('');
      
     }
    
    }
  });
   rootElem.innerHTML = "";
   makePageForEpisodes(newArray);
});
