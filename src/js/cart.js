import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    const id = event.target.getAttribute("data-id");
    cart.removeItem(id);
  }
});

document.addEventListener("change", function (event) {
  if (event.target.classList.contains("quantityInput")) {
    const id = event.target.getAttribute("data-id");
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      console.log(id)
      cart.updateItemQuantity(id, quantity);
    }
  }
});

const cart = new ShoppingCart("so-cart", ".product-list");

cart.renderCartContents();
cart.getTotal();
loadHeaderFooter();
