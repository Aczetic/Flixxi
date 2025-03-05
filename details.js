import { options, removeLoader } from "./utils.js";

async function setDetails(data) {
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
          <div id="poster" style = "background-image:url(https:image.tmdb.org/t/p/w1920${
            data.poster_path
          })"></div>
          <div id="about">
            <div id="title">
              ${data.original_title}
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
                  <span>${data.runtime}</span>
                </div>
                •
                <div class="short-info-metrics">
                  <span class = 'material-icons'>movie</span><span>Movie</span>
                </div>
              </div>
            </div>
            <div id="details">
              <div class="info"><b>Original Title</b> : ${
                data.original_title
              }</div>
              <div class="info"><b>Release</b> : ${data.release_date}</div>
              <div class="info"><b>Duration</b> : ${data.runtime}min</div>
              <div class="info"><b>Original Language</b> : ${data.original_language.toUpperCase()}</div>
              <div class="info"><b>Country</b> : ${data.origin_country}</div>
              <div class="info">
                <b>Production</b> : ${data.production_companies
                  .map((company) => company.name)
                  .join(" , ")}
              </div>
              <div class="info">
                <b>Genres</b> : ${data.genres
                  .map((genre) => genre.name)
                  .join(" , ")}
              </div>
            </div>
            <div id="overview">
              <h3>Overview :</h3>
              ${data.overview}
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
        <div id="poster" style = "background-image:url(https:image.tmdb.org/t/p/w1920${
          data.poster_path
        })"></div>
        <div id="about">
          <div id="title"> ${data.original_title}</div>
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
                  <span>${data.runtime}</span>
                </div>
                •
                <div class="short-info-metrics">
                  <span class = 'material-icons'>movie</span><span>Movie</span>
                </div>
              </div>
            </div>
          <div id="details">
           <div class="info"><b>Original Title</b> : ${
             data.original_title
           }</div>
              <div class="info"><b>Release</b> : ${data.release_date}</div>
              <div class="info"><b>Duration</b> : ${data.runtime}min</div>
              <div class="info"><b>Original Language</b> : ${data.original_language.toUpperCase()}</div>
              <div class="info"><b>Country</b> : ${data.origin_country}</div>
              <div class="info">
                <b>Production</b> : ${data.production_companies
                  .map((company) => company.name)
                  .join(" , ")}
              </div>
              <div class="info">
                <b>Genres</b> : ${data.genres
                  .map((genre) => genre.name)
                  .join(" , ")}
              </div>
            <div class="info">
              <b>Genres</b> : Comedy , Romance , Fiction , Action and
              Adventure
            </div>
          </div>
          <div id="overview">
            <h3>Overview :</h3>
            ${data.overview}
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
    .then((data) => setDetails(data))
    .catch((e) => console.log(e))
    .finally(removeLoader);
}

window.addEventListener("DOMContentLoaded", getDetails);
