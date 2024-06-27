import { getLocalStorage, updateCartCount } from "./utils.mjs";

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
      <p class="cart-card__quantity">qty: 1<span data-id= "${item.Id}" UUID= "${item.UUID}" class="deleteBtn"> ❌</span></p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage("so-cart") || [];
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        const productListElement = document.querySelector(".product-list");
        if (productListElement) {
          productListElement.innerHTML = htmlItems.join("");
        }
    }
      
    getTotal() {
    const cartItems = getLocalStorage("so-cart");
    const cartTotal = document.querySelector(".cart-total");

        if (cartItems.length > 0) {
            const total = cartItems.reduce((acc, item) => acc + item.ListPrice, 0);
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        } else {
            cartTotal.textContent = `Total: $0.00`
        }
    }      

    removeItem(UUID) {
    let cart = getLocalStorage("so-cart");
    cart = cart.filter((x) => x.UUID !== UUID.trim());
    localStorage.setItem("so-cart", JSON.stringify(cart));
    this.renderCartContents();
    this.getTotal();
    updateCartCount();
    }
}