const showLoader = () => {
  console.log("called");
  const loader = document.createElement("div");
  loader.setAttribute("class", "loader");
  loader.innerText = "Loading";
  document.body.appendChild(loader);
};
const removeLoader = () => {
  setTimeout(
    () => document.body.removeChild(document.querySelector(".loader")),
    500
  );
};
export { showLoader, removeLoader };
