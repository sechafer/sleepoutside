import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  let cart = getLocalStorage("so-cart") || [];
  const product = await dataSource.findProductById(e.target.dataset.id);
  cart.unshift(product);
  addProductToCart(cart);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
