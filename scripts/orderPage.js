import { orders } from "../data/order.js";
import { productsItems } from "../data/products.js";
import { priceCalculator } from "./utils/money.js";
import { MatchingProduct, addToCart } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { findDeliveryOption } from "../data/cart.js";
import { deliveryOptions } from "../scripts/deliveryOptioins.js";
import { cart } from "../data/cart.js";
import { cartQuantity } from "./amazon.js";

function OrdersPageSummary() {
  console.log(cart);
  let html = "";
  if (orders.length === 0) {
    html = "<p>No Orders placed yet</p>";
  } else {
    orders.forEach((element) => {
      html += ` <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${element.date}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${priceCalculator(element.total)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${element.id}</div>
            </div>
             
          </div>
         
        
          ${GenerateProducts(element)}

           
        </div>`;
    });
  }
  document.querySelector(".orders-grid").innerHTML = html;
  document.querySelectorAll(".js-buy-again").forEach((btn) => {
    btn.addEventListener("click", () => {
      let Id = btn.dataset.productId;
      console.log("done");
      console.log(cart);
      addToCart(Id, 1);
      cartQuantity();
    });
  });
}
OrdersPageSummary();

function GenerateProducts(element) {
  let html = "";
  element.products.forEach((element) => {
    console.log(element.productId);
    let matchingProduct;
    try {
      productsItems.forEach((product) => {
        if (element.productId === product.id) {
          matchingProduct = product;
        }
      });
    } catch (error) {
      console.log(error);
    }

    //let matchingProduct=MatchingProduct(element);
    let deliveryOption = findDeliveryOption(element);
    let today = dayjs();
    const futureDate = today
      .add(deliveryOption.days, "day")
      .format("dddd, MMMM D");

    html += ` <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${futureDate}
              </div>
              <div class="product-quantity">
                Quantity: ${element.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id='${element.productId}'>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${element.productId}&quantity=${element.quantity}&day=${futureDate}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            </div>
           `;
  });

  return html;
}
