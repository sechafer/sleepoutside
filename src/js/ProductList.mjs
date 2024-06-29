import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
        <img
            src="${product.Images.PrimaryMedium}"
            alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
}

export default class ProductList {
    
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        }

    async init() {
        const list = await this.dataSource.getData(this.category);
        if (this.category == "tents") {
            const filteredList = this.fiterProducts(list);
            this.renderList(filteredList)
        } else {
            this.renderList(list)
        }
        document.querySelector(".title").innerHTML = this.category;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    fiterProducts(list) {
        const ProdIDs = ["880RR","985RF","985PR","344YJ"]
        return list.filter(product => ProdIDs.includes(product.Id))
    }

}