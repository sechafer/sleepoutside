import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productListElement = document.querySelector(".product-list");
  if (productListElement) {
    productListElement.innerHTML = htmlItems.join("");
  }
}

/*function getTotal() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems.length > 0) {
    const total = cartItems.reduce((acc, item) => acc + item.ListPrice, 0);

    const cartTotal = document.querySelector(".cart-total");
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }
}

getTotal();*/


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1<span data-id= "${item.Id} " class="deleteBtn"> ❌</span></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const cartCountElement = document.getElementById("cartCount");

  if (cart.length > 0) {
    cartCountElement.textContent = cart.length;
    cartCountElement.style.display = "inline";
  } else {
    cartCountElement.style.display = "none";
  }
}

document.addEventListener("click", function(event){
  if (event.target.classList.contains("deleteBtn")){
    const itemid = event.target.getAttribute("data-id");
    removeItem(itemid);
  }
})

function removeItem(itemid){
  let cart = getLocalStorage("so-cart");
  cart = cart.filter(x => x.Id !== itemid);
  localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCartContents();
}

renderCartContents();
updateCartCount();