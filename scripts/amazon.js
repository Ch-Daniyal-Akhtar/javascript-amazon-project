import {cart,addToCart} from '../data/cart.js';
import {loadProducts, products} from '../data/products.js';
import { priceCalculator } from './utils/money.js';


let Html='';
loadProducts(mainProductsPage);

function mainProductsPage(){
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
                src=${product.getUrl()}>
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
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
            ${product.getsizeChart()}
            ${product.getinstructionsLink()}
            ${product.getwarrantyLink()}

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
function cartQuantity(){
    let totalQuantity=0;
    cart.forEach(items=>{
    totalQuantity+=items.quantity;
    })
    if(totalQuantity===0){
        document.querySelector('.cart-quantity').innerHTML='';
    }
    else{
        document.querySelector('.cart-quantity').innerHTML=totalQuantity;
    }
    

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
}
