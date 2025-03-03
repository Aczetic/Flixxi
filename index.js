import { showLoader, removeLoader, options, getGenres } from "./utils.js";

async function getPopular(what) {
  const url = {
    all: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    movie: "https://api.themoviedb.org/3/movie/popular?language=en-US",
    tv: "https://api.themoviedb.org/3/tv/popular?language=en-US",
  };

  // showLoader();
  await fetch(url[what], options)
    .then((data) => data.json())
    .then((list) =>
      list.results.forEach(async (item, index) => {
        const genres = await getGenres(
          item.genre_ids,
          what === "all" ? item.media_type : what
        ).then((data) => data);
        let genrelimit = 20; // to prevent overflowing genres

        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click", (e) => {
          window.location.href = `/${
            what === "all" ? item.media_type : what
          }-detail.html?id=${item.id}`;
        });
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

                  return genrelimit > 0
                    ? `<div class="genre">${genre}</div>`
                    : "";
                })
                .join("")}
            </div>
          </div>`;
        document.querySelector("#cards").appendChild(card);
      })
    )
    .finally(removeLoader);
}
const location = window.location.pathname;
const what =
  location === "/index.html"
    ? "all"
    : location === "/movies.html"
    ? "movie"
    : "tv";
window.addEventListener("DOMContentLoaded", () => getPopular(what));
