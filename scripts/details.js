import { options, removeLoader } from "./utils.js";

async function setDetails(data, type) {
  const detailsBody = document.createElement("div");
  detailsBody.setAttribute("id", "details-body");
  detailsBody.innerHTML = ` 
        <div id="background">
          <div id="img" style = "background-image:url(https://image.tmdb.org/t/p/w1920${
            data.backdrop_path
          })"></div>
          <div id="gradient"></div>
        </div>
        <div id="info-body">
          <div id="poster" style = "background-image:url(https://image.tmdb.org/t/p/w500${
            data.poster_path
          })"></div>
          <div id="about">
            <div id="title">
              ${type === "movie" ? data.title : data.name}
              <div id="short-info">
               ${
                 data.adult
                   ? ` <div class="short-info-metrics">
                  <span id="adult">A</span>
                </div>
                •`
                   : ""
               }
                <div class="short-info-metrics">
                  <div class="material-icons">star</div>
                  <span>${data.vote_average.toFixed(1)}</span>
                </div>
                •
                <div class="short-info-metrics">
                  <div class="material-icons">watch</div>
                  <span>${
                    type === "movie"
                      ? data.runtime
                      : data.last_episode_to_air.runtime ||
                        data.episode_run_time[0]
                  }</span>
                </div>
                •
                 ${
                   type === "tv"
                     ? `<div class="short-info-metrics">
                  <div class="material-icons">smart_display</div>
                  <span>${data.number_of_seasons}</span>
                </div>
                •`
                     : ""
                 }
                <div class="short-info-metrics">
                  <span class = 'material-icons'>${
                    type === "tv" ? "tv" : "movie"
                  }</span><span>${type === "movie" ? "Movie" : "TV"}</span>
                </div>
              </div>
            </div>
            <div id="details">
              <div class="info"><b>Original Title</b> : ${
                type === "movie" ? data.original_title : data.original_name
              }</div>
              <div class="info"><b>Release</b> : ${
                type === "movie" ? data.release_date : data.first_air_date
              }</div>
              <div class="info"><b>Duration</b> : ${
                type === "movie"
                  ? data.runtime
                  : data.last_episode_to_air.runtime || data.episode_run_time[0]
              }min</div>
              <div class="info"><b>Original Language</b> : ${data.original_language.toUpperCase()}</div>
              ${
                type === "tv"
                  ? ` <div class="info">
                    <b>Seasons</b> : ${data.number_of_seasons}
                  </div>`
                  : ""
              }
              <div class="info"><b>Country</b> : ${data.origin_country}</div>
              <div class="info">
                <b>Production</b> : ${data.production_companies
                  .map((company) => company.name)
                  .join(" • ")}
              </div>
              <div class="info">
                <b>Genres</b> : ${data.genres
                  .map((genre) => genre.name)
                  .join(" • ")}
              </div>
            </div>
            <div id="overview">
              <h3>Overview :</h3>
              ${data.overview || "Nothing Found"}
            </div>
          </div>
        
      </div>`;
  const detailsBodyMobile = document.createElement("div");
  detailsBodyMobile.setAttribute("id", "details-body-mobile");
  detailsBodyMobile.innerHTML = `  
      <div id="background">
        <div id="img" style = "background-image:url(https://image.tmdb.org/t/p/w1920${
          data.backdrop_path
        })"></div>
        <div id="gradient"></div>
        </div>

      <div id="info-body">
        <div id="poster" style = "background-image:url(https://image.tmdb.org/t/p/w500${
          data.poster_path
        })"></div>
        <div id="about">
          <div id="title"> ${data[type === "movie" ? "title" : "name"]}</div>
          <div id="short-info">
           ${
             data.adult
               ? ` <div class="short-info-metrics">
                  <span id="adult">A</span>
                </div>
                •`
               : ""
           }
             <div class="short-info-metrics">
                  <div class="material-icons">star</div>
                  <span>${data.vote_average.toFixed(1)}</span>
                </div>
                •
                <div class="short-info-metrics">
                  <div class="material-icons">watch</div>
                  <span>${data.number_of_seasons}</span>
                </div>
                •
                ${
                  type === "tv"
                    ? `<div class="short-info-metrics">
                  <div class="material-icons">smart_display</div>
                  <span>${
                    type === "tv"
                      ? data.last_episode_to_air.runtime
                      : data.runtime
                  }</span>
                </div>
                •`
                    : ""
                }
                <div class="short-info-metrics">
                  <span class = 'material-icons'>${
                    type === "tv" ? "tv" : "movie"
                  }</span><span>${type === "movie" ? "Movie" : "TV"}</span>
                </div>
              </div>
            </div>
          <div id="details">
           <div class="info"><b>Original Title</b> : ${
             type === "movie" ? data.original_title : data.original_name
           }</div>
              <div class="info"><b>Release</b> : ${
                type === "movie" ? data.release_date : data.first_air_date
              }</div>
              <div class="info"><b>Duration</b> : ${
                type === "movie"
                  ? data.runtime
                  : data.last_episode_to_air.runtime
              }min</div>
              <div class="info"><b>Original Language</b> : ${data.original_language.toUpperCase()}</div>
              ${
                type === "tv"
                  ? ` <div class="info">
                    <b>Seasons</b> : ${data.number_of_seasons}
                  </div>`
                  : ""
              }
              <div class="info"><b>Country</b> : ${data.origin_country}</div>
              <div class="info">
                <b>Production</b> : ${data.production_companies
                  .map((company) => company.name)
                  .join(" • ")}
              </div>
              <div class="info">
                <b>Genres</b> : ${data.genres
                  .map((genre) => genre.name)
                  .join(" • ")}
              </div>
          </div>
          <div id="overview">
            <h3>Overview :</h3>
            ${data.overview || "Nothing Found"}
          </div>
        </div>
    </div>`;

  document
    .querySelector("#body")
    .insertBefore(detailsBody, document.querySelector("#footer"));
  document
    .querySelector("#body")
    .insertBefore(detailsBodyMobile, document.querySelector("#footer"));
}

async function getDetails() {
  const id = new URLSearchParams(window.location.search).get("id");
  const type = window.location.pathname.includes("movie") ? "movie" : "tv";

  console.log(id, type);
  const detail = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
    options
  )
    .then((data) => data.json())
    .then((data) => setDetails(data, type))
    .catch((e) => console.log(e))
    .finally(removeLoader);
}

window.addEventListener("DOMContentLoaded", getDetails);
