export let cart =JSON.parse(localStorage.getItem('cart'))

if(!cart){
cart=[{
     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
     quantity:2
},{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
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
            quantity
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
    console.log(cart);
}