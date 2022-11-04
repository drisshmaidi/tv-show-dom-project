const rootElem = document.getElementById("root");

const searchBar = document.getElementById("search-bar");

const episodeDropDown = document.getElementById("episode-dropdown");

const showDropDown = document.getElementById("show-dropdown");

const resetButton = document.getElementById("reset-button");

const searchEpisode = document.getElementById("searchEpisode");

//Start of Api for Episodes
let allEpisodes;
function loadEpisodes(id) {
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
    });
}
//End of Api for Episodes

// API for All shows
let allShows;
function setup() {
  resetButton.style.display = 'none'
  searchEpisode.style.display = "none";
  fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .then((data) => {
      allShows = [...data];
      console.log("All my shows are showing", allShows);
      //makePageForEpisodes(allEpisodes);
      // data.forEach((show) => {
      //   showDropDown.append(data);
      // });
      makePageForShows(allShows);
    });
}

//

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
    resetButton.style.display = 'inline'
  });
}

//Button Reset
resetButton.addEventListener("click", () => {
  episodeDropDown.selectedIndex = 0;
  rootElem.innerHTML = "";
  // makePageForEpisodes(allEpisodes);
  // setup();
  window.location.reload();
});

const episodeCode = (season, number) => {
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`;
};

//Search Bar for Episodes
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

//Search Bar for Shows
searchBar.addEventListener("keyup", (event) => {
  const searchInput = event.target.value.toLowerCase();
  const showFilter = allShows.filter((show) => {
    return (
      show.name.toLowerCase().includes(searchInput) ||
      show.summary.toLowerCase().includes(searchInput)
    );
  });

  rootElem.innerHTML = "";
  makePageForShows(showFilter);
  document.querySelector(
    ".display-shows"
  ).innerText = `Displaying ${showFilter.length}/${allShows.length}`;
});

//Search Bar for Episodes
searchEpisode.addEventListener("keyup", (event) => {
  const searchInput = event.target.value.toLowerCase();
  //resetButton.style.display = "inline"
  const showFilter = allEpisodes.filter((show) => {
    return (
      show.name.toLowerCase().includes(searchInput) ||
      show.summary.toLowerCase().includes(searchInput)
    );
  });

  rootElem.innerHTML = "";
  makePageForShows(showFilter);
  document.querySelector(
    ".display-shows"
  ).innerText = `Displaying ${showFilter.length}/${allShows.length}`;
});



// Episode Dropdown
episodeDropDown.addEventListener("change", () => {
  let episodeChoice = episodeDropDown.value;
  episodeChoice = episodeChoice.substring(8);
  let newArray = [];
  allEpisodes.forEach((episode) => {
    console.log(episodeChoice);
    if (episodeChoice.includes(episode.name)) {
      newArray.push(episode);
      console.log(newArray);
      if (!episodeChoice) {
        console.log("");
      }
    }
  });
  rootElem.innerHTML = "";
  makePageForEpisodes(newArray);
});

// Show Dropdown
showDropDown.addEventListener("change", () => {
  let showChoice = showDropDown.value;
  searchEpisode.style.display = "flex";
  searchBar.style.display = "none";
  console.log(showChoice);
  let newArray = [];
  allShows.forEach((show) => {
    console.log(showChoice);
    if (showChoice.includes(show.name)) {
      newArray.push(show);
      console.log(newArray);
      if (!showChoice) {
        console.log("");
      }
    }
  });
  let showId = newArray[0].id;
  console.log(newArray[0].id);
  rootElem.innerHTML = "";
  loadEpisodes(showId);
  episodeDropDown.style.display = "inline";
  showDropDown.style.display = "none";
});

// Make pages for Shows
function makePageForShows(showsList) {
  showsList.forEach((show) => {
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    rootElem.appendChild(wrapper);
    const showName = document.createElement("h2");
    showName.className = "show-name";
    showName.innerHTML = show.name;
    wrapper.appendChild(showName);
    showName.addEventListener('click', showFunction) 
    const showImage = document.createElement("img");
    showImage.className = "show-image";
    showImage.src = show.image.medium;
    wrapper.appendChild(showImage);
    const showSummary = document.createElement("p");
    showSummary.className = "show-summary";
    showSummary.innerHTML = show.summary;
    wrapper.appendChild(showSummary);
    const showOption = document.createElement("option");
    showOption.innerHTML = show.name;
    showDropDown.appendChild(showOption);
    

  });
}

// Click Show Name to go to Episodes
const showFunction = (event) => {
let showChoice = (event.target.innerHTML);
searchBar.style.display = "none";
searchEpisode.style.display = "flex"
  let newArray = [];
  allShows.forEach((show) => {
    console.log(showChoice);
    if (showChoice.includes(show.name)) {
      newArray.push(show);
      console.log(newArray);
      if (!showChoice) {
        console.log("");
      }
    }
  });
  let showId = newArray[0].id;
  console.log(newArray[0].id);
  rootElem.innerHTML = "";
  loadEpisodes(showId);
  episodeDropDown.style.display = "inline";
  showDropDown.style.display = "none";
  
}



window.onload = setup;
