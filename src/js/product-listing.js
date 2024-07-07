import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const sortBy =   document.querySelector('#sortProducts');


function initializeProductListing(sortBy) {
    const productlisting = new ProductList(category, dataSource, element, sortBy);
    productlisting.init();
}

initializeProductListing(sortBy.value);
  
sortBy.addEventListener('change', (event) => {
    const sortByValue = event.target.value;
    console.log('In product-listing.js addEventListener sortBy:', sortByValue);
    initializeProductListing(sortBy.value);
  });