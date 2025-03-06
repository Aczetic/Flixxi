import {
  showLoader,
  removeLoader,
  options,
  getGenres,
  search as callSearch,
  notify,
} from "./utils.js";

async function constructCards(results, what, query) {
  console.log(results);
  results.forEach(async (item) => {
    if (item.media_type === "person") return;

    const card = document.createElement("div");
    card.className = "card";
    card.addEventListener("click", (e) => {
      window.location.href = `/${
        what === "all" ? item.media_type : what
      }-detail.html?id=${item.id}`;
    });

    let genrelimit = 25;
    const genres = await getGenres(
      item.genre_ids,
      what === "all" ? item.media_type : what
    ).then((data) => data);

    card.innerHTML = `
    <div id="img" style = "background-image:url('https://image.tmdb.org/t/p/w500/${
      item.poster_path
    }')">
       <div id="rating"><span class="material-icons"> star </span>${item.vote_average.toFixed(
         1
       )}</div>
       <div class="type ${item.media_type}"><span>${
      what === "all" ? item.media_type.toUpperCase() : what.toUpperCase()
    }</span></div>
     </div>
     <div id="info">
       <div id="title">${item.title || item.name}</div>
       <div id="lang">Language: ${item.original_language.toUpperCase()}</div>

       <div id="release">Release: ${
         item.release_date || item.first_air_date
       }</div>
       <div id="genres">
         ${genres
           .map((genre) => {
             genrelimit -= genre.length;

             return genrelimit > 0 ? `<div class="genre">${genre}</div>` : "";
           })
           .join("")}
       </div>
     </div>`;

    document.querySelector("#cards").appendChild(card);
  });
  removeLoader();
}

async function search() {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("query");
  const type = searchParams.get("type");

  const url = `https://api.themoviedb.org/3/search/${type}?query=${query}&language=en-US&adult=true`;
  console.log(url);
  if (type != "multi")
    document
      .querySelector("form")
      .querySelector(`input[value=${type}]`).checked = true;

  await fetch(url, options)
    .then((data) => data.json())
    .then((searchResult) => {
      if (searchResult.results.length === 0) {
        removeLoader();
        throw new Error("Nothing found");
      } else
        constructCards(
          searchResult.results,
          type == "multi" ? "all" : type,
          query
        );
    })
    .catch((e) => notify(e.message, "error"));
}
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", callSearch);
  document.querySelector(".submit").addEventListener("click", callSearch);
});

window.addEventListener("DOMContentLoaded", () => {
  // start the search process right after the dom has been loaded but not on pages other than search.html
  if (window.location.pathname != "/search.html") return;
  search();
});
