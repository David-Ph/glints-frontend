//? create item form DOM elements
const newItemForm = document.querySelector("#new-item-form");
const newItemName = document.querySelector("#new-item-name");
const newItemStock = document.querySelector("#new-item-stock");
const newItemPrice = document.querySelector("#new-item-price");
const newItemCategory = document.querySelector("#new-item-category");

//? stock modal DOM elements
const stockModalForm = document.querySelector("#stock-form");
const stockModalName = document.querySelector("#stock-modal-name");
const stockModalStock = document.querySelector("#stock-modal-stock");

//? edit modal DOM elements
const editModalForm = document.querySelector("#edit-form");
const editModalName = document.querySelector("#edit-modal-name");
const editModalPrice = document.querySelector("#edit-modal-price");
const editModalStock = document.querySelector("#edit-modal-stock");
const editModalCategory = document.querySelector("#edit-modal-category");

//? history modal DOM elements
const historyTableBody = document.querySelector(".history-table-body");

//? render item DOM elements
const tableBody = document.querySelector(".item-table-body");
const paginationBody = document.querySelector(".pagination-item-table");
const historyPagination = document.querySelector(".pagination-history-table");
const stockModal = document.querySelector(".stock-modal");
const editModal = document.querySelector(".edit-modal");
const historyModal = document.querySelector(".history-modal");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.addEventListener("click", function (event) {
  // close modals on modal-background click
  if (event.target.classList.contains("modal-background")) {
    closeAllModal();
  }
});

function closeAllModal() {
  const modals = document.querySelectorAll(".modal");

  for (let i = 0; i < modals.length; i++) {
    if (modals[i].classList.contains("is-active")) {
      modals[i].classList.remove("is-active");
    }
  }
}
