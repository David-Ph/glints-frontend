async function deleteItem(itemId) {
  await fetch(`https://glints-assessment.herokuapp.com/items/${itemId}`, {
    method: "DELETE",
  })
    .then((resp) => resp.text())
    .then(() => {
      alert("Item deleted!");
      window.history.go();
    });
}

async function loadHistory(itemId, page = 1, limit = 5) {
  historyTableBody.innerHTML = "";
  historyPagination.innerHTML = "";
  const histories = await fetch(
    `https://glints-assessment.herokuapp.com/items/history/${itemId}`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  if (!histories.data) {
    alert("No history yet!");
    return;
  }

  histories.data.forEach((history) => {
    history.created_at = new Date(history.created_at).toLocaleDateString(
      "en-gb",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    let historyRow = "";

    if (history.modifiedBy > 0) {
      historyRow = `
        <tr class="history-item green-row">
            <input type="hidden" class="itemId" value=${history._id}></input>
            <td class="history-name">${history.item.name}</td>
            <td class="history-previous-stock">${history.previousStock}</td>
            <td class="history-modified-by">${history.modifiedBy}</td>
            <td class="history-new-stock">${history.newStock}</td>
            <td class="history-modified-at">${history.created_at}</td>
        </tr>
        `;
    } else {
      historyRow = `
        <tr class="history-item red-row">
            <input type="hidden" class="itemId" value=${history._id}></input>
            <td class="history-name">${history.item.name}</td>
            <td class="history-previous-stock">${history.previousStock}</td>
            <td class="history-modified-by">${history.modifiedBy}</td>
            <td class="history-new-stock">${history.newStock}</td>
            <td class="history-modified-at">${history.created_at}</td>
        </tr>
        `;
    }

    historyTableBody.insertAdjacentHTML("beforeend", historyRow);
  });

  const pageCount = Math.ceil(histories.count / limit);
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

    historyPagination.insertAdjacentHTML("beforeend", paginationButton);
  }

  historyModal.classList.add("is-active");
}

tableBody.addEventListener("click", function (event) {
  // DELETE ITEM
  if (event.target.classList.contains("delete-btn")) {
    const itemId =
      event.target.parentNode.parentNode.parentNode.querySelector(
        ".itemId"
      ).value;

    deleteItem(itemId);
  }

  //   EDIT ITEM
  if (event.target.classList.contains("edit-btn")) {
    closeAllModal();
    const targetParent = event.target.parentNode.parentNode.parentNode;
    const itemId = targetParent.querySelector(".itemId").value;
    const itemName = targetParent.querySelector(".item-name").textContent;
    const itemStock = targetParent.querySelector(".item-stock").textContent;
    const itemPrice = targetParent.querySelector(".item-price").textContent;
    const itemCategory =
      targetParent.querySelector(".item-category").textContent;

    editModalName.value = itemName;
    editModalStock.value = itemStock;
    editModalPrice.value = itemPrice;
    editModalCategory.value = itemCategory.toLowerCase();
    editModal.classList.add("is-active");

    editModalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`https://glints-assessment.herokuapp.com/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editModalName.value,
          stock: editModalStock.value,
          price: editModalPrice.value,
          category: editModalCategory.value,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.errors?.length > 0) {
            alert(`Error! ${data.errors}`);
          } else {
            alert("Item updated!");
          }

          window.history.go();
        })
        .catch((err) => console.log(err));
    });
  }

  //   MANAGE STOCK BTN
  if (event.target.classList.contains("stock-btn")) {
    closeAllModal();
    const targetParent = event.target.parentNode.parentNode.parentNode;
    const itemId = targetParent.querySelector(".itemId").value;
    const itemName = targetParent.querySelector(".item-name").textContent;

    stockModalName.value = itemName;
    stockModalStock.value = 0;
    stockModal.classList.add("is-active");

    stockModalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(
        `https://glints-assessment.herokuapp.com/items/updateStock/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock: stockModalStock.value,
          }),
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          if (data.errors?.length > 0) {
            alert(`Error! ${data.errors}`);
          } else {
            alert("Stock updated!");
          }
          window.history.go();
        })
        .catch((err) => console.log(err));
    });
  }

  //   SEE ITEM HISTORY
  if (event.target.classList.contains("history-btn")) {
    const itemId =
      event.target.parentNode.parentNode.parentNode.querySelector(
        ".itemId"
      ).value;

    loadHistory(itemId, 1, 5);
  }
});
