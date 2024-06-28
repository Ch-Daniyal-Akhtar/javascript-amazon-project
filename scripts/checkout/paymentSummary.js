import {cart,MatchingProduct,findDeliveryOption} from "../../data/cart.js";
import { deliveryOptions } from "../deliveryOptioins.js";
import { updateCartQuantity } from "./orderSummary.js";
import { priceCalculator } from "../utils/money.js";

export function showPaymentSummary(){
    let num=updateCartQuantity();
let itemPrice=0;
let shippingPrice=0;
let totalPrice=0;
let tax=0;
let orderTotal=0;
cart.forEach((cartItem)=>{
let matchingProduct=MatchingProduct(cartItem);
 itemPrice+=matchingProduct.priceCents*cartItem.quantity;
 let matchingDelivery=findDeliveryOption(cartItem);
 shippingPrice +=matchingDelivery.priceCents;
});
totalPrice=itemPrice+shippingPrice;
tax=Math.round(totalPrice*0.1);
orderTotal=totalPrice+tax;
let PaymentHtml='';
PaymentHtml+=`<div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (${num}):</div>
    <div class="payment-summary-money">$${priceCalculator(itemPrice)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${priceCalculator(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${priceCalculator(totalPrice)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${priceCalculator(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${priceCalculator(orderTotal)}</div>
    </div>

    <button class="place-order-button button-primary">
    Place your order
    </button>`

    document.querySelector('.payment-summary').innerHTML=PaymentHtml;
}


