let xhr= new XMLHttpRequest();
xhr.addEventListener('load',()=>{
   let productItems=(xhr.response);
   //console.log('loadProduct');
})


xhr.open('GET','https://supersimplebackend.dev/products');
xhr.send();
