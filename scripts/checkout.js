import {cart,removeItem} from '../data/cart.js'
import {products} from '../data/products.js'
import { priceCalculator } from './utils/money.js';

let HTML='';
cart.forEach((cartItem)=>{
    let matchingItem;
    products.forEach((product)=>{
        if(cartItem.productId===product.id){
         matchingItem=product;
     }
    });
    
HTML+=`<div class="cart-item-container   cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${priceCalculator(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary deleteBtn"
                  data-product-id="${cartItem.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`

});
document.querySelector('.order-summary').innerHTML=HTML;
function updateCartQuantity(){
let Total=0;
cart.forEach((item)=>{
Total+=item.quantity;
});
document.querySelector('.CartItems').innerHTML=`${Total} items`;}

updateCartQuantity();
document.querySelector('.CartItems').innerHTML=`${Total} items`;
document.querySelectorAll('.deleteBtn').forEach((link)=>{
    let productid=link.dataset.productId;
    link.addEventListener('click',()=>{
    removeItem(productid);
    document.querySelector(`.cart-item-container-${productid}`).remove();
    });

})