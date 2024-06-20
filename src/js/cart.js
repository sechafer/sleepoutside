import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {

  const cartItems = getLocalStorage("so-cart");

  console.log('cart->cartItems:',cartItems);
   
  // Verificar si cartItems es un array
  if (Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    console.error('cartItems is not Array:-->', cartItems, '<--');
    document.querySelector(".product-list").innerHTML = '';
  }

}

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

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    const itemid = event.target.getAttribute("data-id");
    removeItem(itemid);
  }
});

function removeItem(itemid) {
  let cart = getLocalStorage("so-cart");
  cart = cart.filter((x) => x.Id !== itemid);
  localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCartContents();
}
renderCartContents();
