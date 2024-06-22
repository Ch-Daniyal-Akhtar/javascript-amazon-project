import {cart,removeItem,updateDeliveryId} from '../data/cart.js'
import {products} from '../data/products.js'
import { priceCalculator } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from './deliveryOptioins.js';

function orderSummary(){
console.log(dayjs());
let today = dayjs();
let HTML='';
cart.forEach((cartItem)=>{
    let matchingItem;
    products.forEach((product)=>{
        if(cartItem.productId===product.id){
         matchingItem=product;
     }
    });
    let deliveryDate;
    let futureDate;
    deliveryOptions.forEach(option=>{
     if(cartItem.deliveryId===option.id){
      deliveryDate=option;
     }
     console.log(`${option.id}= ${cartItem.deliveryId}`)
    })
    futureDate = today.add(deliveryDate.days, 'day').format('dddd, MMMM D');
    
HTML+=`<div class="cart-item-container   cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date:${futureDate}
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
                    Quantity: <span class="quantity-label quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary updateLink  updateLink-${cartItem.productId}" data-id="${cartItem.productId}">
                    Update
                  </span>
                  <input class="quantity-input quantity-input-${cartItem.productId}" style="width:30px">
                  <span class="save-quantity-link link-primary save-quantity-link-${cartItem.productId}">Save</span>
                  <span class="delete-quantity-link link-primary deleteBtn"
                  data-product-id="${cartItem.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                
               ${generateDeliveryOptionsHTML(deliveryOptions,matchingItem,cartItem) }
              
              </div>
            </div>
          </div>`


});


function generateDeliveryOptionsHTML(options,matchingItem,cartItem) {
  let html = `<div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>`;
  options.forEach(option => {
  let isChecked=  (option.id===cartItem.deliveryId);
    const futureDate = today.add(option.days, 'day').format('dddd, MMMM D');
    html += `<div class="delivery-option js-delivery-option "  data-delivery-id="${option.id}" data-product-id="${matchingItem.id}">
               <input type="radio" class="delivery-option-input" ${isChecked?'checked':''} name="delivery-option-${matchingItem.id}" 
               >
               <div>
                 <div class="delivery-option-date">
                   ${futureDate}
                 </div>
                 <div class="delivery-option-price">
                   ${option.priceCents ? `$${priceCalculator(option.priceCents)} - Shipping` : 'Free - Shipping'}
                 </div>
               </div>
             </div>`;
  });
  html += `</div>`;
  return html;
}

updateCartQuantity();
document.querySelector('.order-summary').innerHTML=HTML;
    function updateCartQuantity(){
    let Total=0;
    cart.forEach((item)=>{
    Total+=item.quantity;
    });
    document.querySelector('.CartItems').innerHTML=`${Total} items`;

}


document.querySelectorAll('.deleteBtn').forEach((link)=>{
    let productid=link.dataset.productId;
    link.addEventListener('click',()=>{
    removeItem(productid);
    document.querySelector(`.cart-item-container-${productid}`).remove();
    updateCartQuantity();
    });
})

document.querySelectorAll('.updateLink').forEach((link) => {
  let Id = link.dataset.id;
  link.addEventListener('click', () => {
    console.log(Id);
    document.querySelector(`.cart-item-container-${Id}`).classList.add('is-editing-quantity');
    console.log(document.querySelector('.cart-item-container').classList);
    document.querySelector(`.save-quantity-link-${Id}`).addEventListener('click',()=>{
      let num=Number(document.querySelector(`.quantity-input-${Id}`).value);
        updateCart(Id,num);
        document.querySelector(`.quantity-label-${Id}`).innerHTML=num;
      document.querySelector(`.cart-item-container-${Id}`).classList.remove('is-editing-quantity');
      updateCartQuantity();
     
    })
});
});
function updateCart(Id,quantity){
 cart.forEach((cartItem)=>{
    if(cartItem.productId===Id){
      cartItem.quantity=quantity;
      
    }

 });
 console.log(cart);
}

//Adding Event Listener to radio button
document.querySelectorAll('.js-delivery-option').forEach((option)=>{
  option.addEventListener('click',()=>{
    let {productId,deliveryId}=option.dataset;
    updateDeliveryId(productId,deliveryId);
    orderSummary();
  });
});
} 
orderSummary();
