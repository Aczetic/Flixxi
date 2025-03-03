import { showLoader, removeLoader, options, getGenres } from "./utils.js";

window.addEventListener("DOMContentLoaded", () =>
  document.querySelector(".submit").addEventListener("click", () => {
    const formData = new FormData(document.querySelector("form"));
    const type = formData.get("type");
    const query = formData.get("query");
    window.location.href = `/search.html?type=${type}&query=${query}`;
  })
);

async function constructCards(results, what, query) {
  console.log(results);
  results.forEach(async (item) => {
    const card = document.createElement("div");

    card.className = "card";
    let genrelimit = 25;
    const genres = await getGenres(
      item.genre_ids,
      what === "all" ? item.media_type : what
    ).then((data) => data);

    if (item.media_type === "person") return;

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
  const type =
    searchParams.get("type") != "null" ? searchParams.get("type") : null;

  const url = `https://api.themoviedb.org/3/search/${
    type || "multi"
  }?query=${query}&language=en-US `;
  console.log(url);
  await fetch(url, options)
    .then((data) => data.json())
    .then((data) => constructCards(data.results, type || "all", query));
}

window.addEventListener("DOMContentLoaded", () => {
  // start the search process right after the dom has been loaded but not on pages other than search.html
  if (window.location.pathname != "/search.html") return;
  search();
});
