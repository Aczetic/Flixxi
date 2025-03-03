async function as() {
  return await fetch("https://jsonplaceholder.typicode.com/users").then(
    (data) => data.json()
  );
}
async function call() {
  console.log(await as());
  console.log("from call");
}

call();
