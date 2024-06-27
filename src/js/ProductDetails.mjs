import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs"; // This script file will contain the code to dynamically produce the product detail pages.

function showPriceOfProducts(FinalPrice,SuggestedRetailPrice){
    if(FinalPrice < SuggestedRetailPrice){
        return FinalPrice + " Discount: " + ((FinalPrice / SuggestedRetailPrice) * 100).toFixed(2) + "% OFF";
    } 
    return FinalPrice ;
}

function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />
      
      <p class="product-card__price">$${ showPriceOfProducts (product.FinalPrice, product.SuggestedRetailPrice) }</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
}


export default class ProductDetails {
    constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
        document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    }

    async addToCart(e) {
        this.cart = getLocalStorage("so-cart") || [];
        this.product = await this.dataSource.findProductById(e.target.dataset.id);
        this.product.UUID = Date.now() + Math.random().toString(36).substring(2, 9);
        this.cart.unshift(this.product);
        setLocalStorage("so-cart", this.cart);
        updateCartCount();
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            productDetailsTemplate(this.product)
        );
    }

}