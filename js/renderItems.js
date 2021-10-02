async function loadItems(page = 1, limit = 5) {
  tableBody.innerHTML = "";
  paginationBody.innerHTML = "";
  const items = await fetch(
    `https://glints-assessment.herokuapp.com/items?page=${page}&limit=${limit}`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  items.data.forEach((item) => {
    item.name = capitalizeFirstLetter(item.name);
    item.category = capitalizeFirstLetter(item.category);
    let itemRow = `
        <tr class="list-item">
            <input type="hidden" class="itemId" value=${item._id}></input>
            <td class="item-name">${item.name}</td>
            <td class="item-stock">${item.stock}</td>
            <td class="item-price">${item.price}</td>
            <td class="item-category">${item.category}</td>
            <td>
                <div class="buttons are-small">
                <button class="button is-outlined is-info edit-btn">Edit</button>
                <button class="button is-outlined is-success stock-btn">
                    Manage Stocks
                </button>
                <button class="button is-outlined is-primary history-btn">Stock History</button>
                <button class="button is-outlined is-danger delete-btn">Delete</button>
                </div>
            </td>
        </tr>
    `;

    tableBody.insertAdjacentHTML("beforeend", itemRow);
  });

  const pageCount = Math.ceil(items.count / limit);
  for (let i = 1; i <= pageCount; i++) {
    let paginationButton;
    if (i == page) {
      paginationButton = `
            <li>
                <a class="pagination-link is-current">${i}</a>
            </li>
        `;
    } else {
      paginationButton = `
            <li>
                <a class="pagination-link">${i}</a>
            </li>
        `;
    }

    paginationBody.insertAdjacentHTML("beforeend", paginationButton);
  }
}

function switchPage(page) {
  loadItems(page, 5);
}

window.addEventListener("load", () => {
  loadItems(1, 5); // load first page, with limits of 5, and page 5 is current active
});

paginationBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("pagination-link")) {
    const page = event.target.innerHTML;
    switchPage(page);
  }
});
