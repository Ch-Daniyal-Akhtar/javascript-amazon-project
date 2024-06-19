import {cart,addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { priceCalculator } from './utils/money.js';


let Html='';
products.forEach((product)=>{
    Html += `<div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>
            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${priceCalculator(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart  added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary addBtn"
            data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>`;
});
//document.querySelector('.itemNo').innerHTML=`4 items`;
function cartQuantity(){
    let totalQuantity=0;
    cart.forEach(items=>{
    totalQuantity+=items.quantity;
    })
    document.querySelector('.cart-quantity').innerHTML=totalQuantity;
    //document.querySelector('.itemNo').textContent=`${totalQuantity} items`;

}
cartQuantity();


document.querySelector('.HtmlProducts').innerHTML=Html;
document.querySelectorAll('.addBtn').forEach(button=>{button.addEventListener('click',()=>{
        const {productId}=button.dataset;
        let num=document.querySelector(`.js-quantity-selector-${productId}`);
        let quantity=Number(num.value);
        document.querySelector(`.added-to-cart-${productId}`).classList.add('added');
         clearTimeout();
         setTimeout(()=>{ document.querySelector(`.added-to-cart-${productId}`).classList.remove('added');},2000);
        addToCart(productId,quantity);
        cartQuantity();
        console.log(cart);  
    });
});

