window.addEventListener("load", async () => {
  const items = await fetch("https://glints-assessment.herokuapp.com/items")
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  console.log(items);
});
