import { products } from "./products.js";
import { deliveryOptions } from "../scripts/deliveryOptioins.js";

export function cart(localStorageKey){
let cart={
    cartItem:undefined,
   loadStorage(){     
    this.cartItem=JSON.parse(localStorage.getItem(localStorageKey));
    if(!this.cartItem){
    this.cartItem=[{
         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
         quantity:2,
         deliveryId:'1'
    },{
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryId:'2'
    }];
    }
  },
     MatchingProduct(cartItem){
        let matchingItem;
        products.forEach((product)=>{
            if(cartItem.productId===product.id){
             matchingItem=product;
         }
        });
        return matchingItem;   
    },

    cartStorage(){
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartItem));
     },
    findDeliveryOption(cartItem){
        let deliveryOption;
        deliveryOptions.forEach(option=>{
            if(cartItem.deliveryId===option.id){
             deliveryOption=option;
            }
           });
           return deliveryOption;
    },
    addToCart(productId,quantity){
        let matchingItem;
        this.cartItem.forEach(items=>{
            if(productId===items.productId){
            matchingItem=items;
            }
                    
        });
        if(matchingItem){
            matchingItem.quantity++;
        }
        else{
            this.cartItem.push({
                productId,
                quantity,
                 deliveryId:'1'
    
            });
        }
         this.cartStorage();
    
    },
    removeItem(productId){
        let newCart=[];
        this.cartItem.forEach(item=>{
           if(productId!==item.productId){
            newCart.push(item);
           } 
        });
        this.cartItem=newCart;
        this.cartStorage();
        
    },
    updateDeliveryId(productId,deliveryId){
        let matchingItem;
        this.cartItem.forEach(cartItem=>{
       
       if(cartItem.productId===productId)
          matchingItem=cartItem
    
      });
     matchingItem.deliveryId=deliveryId;
     this.cartStorage();
    }
  }
  
  return cart;

}
     let Cart=cart('cart-oop',);
     Cart.loadStorage();
     let BuisnessCart=cart('cartbuisness');
     BuisnessCart.loadStorage();
     