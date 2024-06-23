import { renderListWithTemplate } from "./utils.mjs";
function productCardTemplate(product) {
  return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
     <picture>
      <source media="(max-width: 120px)" srcset="${product.Images.PrimarySmall}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}">
     </picture>
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // render the list - to be completed
    // let list2 = list.filter(item => ['880RR', '985RF', '985PR', '344YJ'].includes(item.Id));

    this.renderList(list);
    document.querySelector(".title").innerHTML = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}