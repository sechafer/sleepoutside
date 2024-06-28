import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    const UUID = event.target.getAttribute("UUID");
    cart.removeItem(UUID);
  }
});

const cart = new ShoppingCart("so-cart", ".product-list");

cart.renderCartContents();
cart.getTotal();
loadHeaderFooter();
