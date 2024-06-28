import { loadProducts, products } from "./products.js";
import { deliveryOptions } from "../scripts/deliveryOptioins.js";

export function loadCart(fun){
    let xhr=new XMLHttpRequest();
    xhr.addEventListener('load',()=>{
     let cartnew=xhr.response;
     console.log(cartnew);
        fun();
    })
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();   
 
 }


    export function MatchingProduct(cartItem){
            let matchingItem;
            products.forEach((product)=>{
                if(cartItem.productId===product.id){
                matchingItem=product;
            }
            });
            return matchingItem;   
    };

    export function findDeliveryOption(cartItem){
        let deliveryOption;
        deliveryOptions.forEach(option=>{
            if(cartItem.deliveryId===option.id){
            deliveryOption=option;
            }
        });
        return deliveryOption;
    }

    export let cart =JSON.parse(localStorage.getItem('cart'));

    if(!cart){
        cart=[{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryId:'1'
        },{
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryId:'2'
        }];
    }
    function cartStorage(){
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    export function addToCart(productId,quantity){
        let matchingItem;
        cart.forEach(items=>{
            if(productId===items.productId){
            matchingItem=items;
            }
                    
        });
        if(matchingItem){
            matchingItem.quantity++;
        }
        else{
            cart.push({
                productId,
                quantity,
                deliveryId:'1'

            });
        }
        cartStorage();

    }
    export function removeItem(productId){
        let newCart=[];
        cart.forEach(item=>{
        if(productId!==item.productId){
            newCart.push(item);
        } 
        });
        cart=newCart;
        
        cartStorage();
        
    }

  export function updateDeliveryId(productId,deliveryId){
            let matchingItem;
            cart.forEach(cartItem=>{
        
        if(cartItem.productId===productId)
            matchingItem=cartItem

        });
        matchingItem.deliveryId=deliveryId;
        cartStorage();
   }


