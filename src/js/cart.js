import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    const id = event.target.getAttribute("data-id");
    cart.removeItem(id);
  }
});

const cart = new ShoppingCart("so-cart", ".product-list");

cart.renderCartContents();
cart.getTotal();
loadHeaderFooter();
