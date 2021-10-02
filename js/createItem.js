newItemForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetch("https://glints-assessment.herokuapp.com/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newItemName.value,
      stock: newItemStock.value,
      price: newItemPrice.value,
      category: newItemCategory.value,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      newItemName.value = "";
      newItemStock.value = "";
      newItemPrice.value = "";
      newItemCategory.value = "drinks";
      alert("New Item created!");
      window.history.go();
    })
    .catch((err) => console.log(err));
});
