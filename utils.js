import AUTHORIZATION from "./secrets.js";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTHORIZATION,
  },
};

const showLoader = () => {
  console.log("called");
  const loader = document.createElement("div");
  loader.setAttribute("class", "loader");
  document.body.appendChild(loader);
};

const removeLoader = () => {
  setTimeout(
    () => document.body.removeChild(document.querySelector(".loader")),
    500
  );
};

async function getGenres(ids, what) {
  if (what === "person" || !ids) return;
  const url = `https://api.themoviedb.org/3/genre/${what}/list?language=en`;
  const { genres } = await fetch(url, options)
    .then((data) => data.json())
    .then((data) => data);
  return ids.map((id) => genres.filter((genre) => genre.id === id)[0]["name"]);
}

function notify(message, type) {
  const alertElem = document.createElement("div");
  alertElem.setAttribute("class", `alert ${type}`);
  alertElem.textContent = message;
  document
    .querySelector("body")
    .insertBefore(alertElem, document.querySelector("#body"));
  setTimeout(() => alertElem.remove(), 2000);
}

function search(e) {
  e.preventDefault();
  const formData = new FormData(document.querySelector("form"));
  const type = formData.get("type");
  const query = formData.get("query");
  console.log("entered");
  if (query === "" || !query) {
    notify("Enter something to search", "error");
    return;
  }

  window.location.href = `/search.html?type=${type || "multi"}&query=${query}`;
}

export { showLoader, removeLoader, options, getGenres, search, notify };
