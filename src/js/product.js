import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./cart";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productListing = new ProductList("tents", dataSource, element);

productListing.init();
updateCartCount();