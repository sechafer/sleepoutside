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
    
    constructor(category, dataSource, listElement , sortBy) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.sortBy=sortBy;
        }

    async init() {
        console.log('Init ProductList');
        console.log(' sortBy',this.sortBy);
        const list = await this.dataSource.getData(this.category);
        console.log(' list',list);
        if(this.sortBy=="name"){
             
            list.sort((a, b) => a.Name.localeCompare(b.Name));

        }else{
            list.sort((a, b) => a.ListPrice - b.ListPrice);
        }

        if (this.category == "tents") {
            const filteredList = this.fiterProducts(list);
            this.renderList(filteredList)
        } else {
            this.renderList(list)
        }
        document.querySelector(".title").innerHTML = this.category;
    }

    renderList(list) {

        console.log('ProductList renderList');
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    fiterProducts(list) {
        console.log('ProductList fiterProducts');
        const ProdIDs = ["880RR","985RF","985PR","344YJ"]
        return list.filter(product => ProdIDs.includes(product.Id))
    }

}