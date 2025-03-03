import AUTHORIZATION from "./secrets.js";
import { showLoader, removeLoader } from "./utils.js";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTHORIZATION,
  },
};

const GENRES = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
];
const card = ` <div class="card">
          <div id="img">
            <div id="rating"><span class="material-icons"> star </span>7.8</div>
            <div class="type tv"><span>Movie</span>•<span>1h:23m</span></div>
          </div>
          <div id="info">
            <div id="title">the name of the movie</div>
            <div id="lang">Language: Eng</div>

            <div id="release">Release: 1 Jan 2013</div>
            <div id="genres">
              <div class="genre">comedy</div>
              <div class="genre">romance</div>
              <div class="genre">parody</div>
            </div>
          </div>
        </div>`;
async function getPopular(what) {
  console.log(what);
  const url = {
    all: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    movie: "https://api.themoviedb.org/3/movie/popular?language=en-US",
    tv: "https://api.themoviedb.org/3/tv/popular?language=en-US",
  };

  // showLoader();
  await fetch(url[what], options)
    .then((data) => data.json())
    .then((list) =>
      list.results.forEach((item, index) => {
        let genres = item.genre_ids.map(
          (each) => GENRES.filter((genre) => genre.id === each)[0].name
        );
        let genrelimit = 30;
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
          item.media_type === "movie" ? "Movie" : "TV"
        }</span></div>
          </div>
          <div id="info">
            <div id="title">${item.title || item.name}</div>
            <div id="lang">Language: ${item.original_language}</div>

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
