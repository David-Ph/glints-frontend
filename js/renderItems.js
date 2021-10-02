const tableBody = document.querySelector(".item-table-body");

async function loadItems() {
  const items = await fetch("https://glints-assessment.herokuapp.com/items")
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  let counts = 1;

  items.data.forEach((item) => {
    let itemRow = `
        <tr class="list-item">
            <td>${counts++}</td>
            <td>${item.name}</td>
            <td>${item.stock}</td>
            <td>${item.price}</td>
            <td>${item.category}</td>
            <td>
                <div class="buttons are-small">
                <button class="button is-outlined is-info">Edit</button>
                <button class="button is-outlined is-success">
                    Manage Stocks
                </button>
                <button class="button is-outlined is-danger">Delete</button>
                </div>
            </td>
        </tr>
    `;

    tableBody.insertAdjacentHTML("beforeend", itemRow);
  });
}

window.addEventListener("load", () => {
  loadItems();
});
