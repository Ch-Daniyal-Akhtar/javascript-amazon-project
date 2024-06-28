import { orderSummary } from "./checkout/orderSummary.js";
import { showPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart-oop.js";
import '../backend/backend-practice.js'
import { loadProducts,loadProductsFetch } from "../data/products.js";
import {loadCart} from "../data/cart.js"

// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve('hello')});  
// }).then((value)=>{
//   return new Promise((resolve)=>{
//     loadCart(()=>{
//       console.log(value);
//       resolve('Ahmed');
      
//     })
//   })
// }).then((value)=>{
//     orderSummary();
//     showPaymentSummary();
//     console.log(value);
// })
Promise.all(
        [ loadProductsFetch(),
            new Promise((resolve)=>{
                loadCart(()=>{
                    resolve('hello')});  
            })
        
        ]
    ).then(()=>{
        orderSummary();
        showPaymentSummary();
});
    

