import { productsItems } from "../data/products.js";
import { cartQuantity } from "./amazon.js";

let urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get("productId");
let quantity = urlParams.get("quantity");
let futureDate = urlParams.get("day");
console.log(productId);

//document.querySelector(".cart-quantity").innerText = cartQuantity();
function findProduct(productId) {
  let matchingProduct;
  productsItems.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

let MatchingItem = findProduct(productId);
console.log(MatchingItem);
document.querySelector(".js-product-info").innerText = MatchingItem.name;
document.querySelector(".js-quantity-info").innerText = "Quantity:" + quantity;
document.querySelector(
  ".js-image-info"
).innerHTML = `<img class="product-image" src="${MatchingItem.image}">`;
document.querySelector(".delivery-date").innerText = `Arrivng on ${futureDate}`;
