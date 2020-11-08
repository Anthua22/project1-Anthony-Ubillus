import { Auth } from "./classes/auth.class";
import { Product } from "./classes/product.class";


document.addEventListener('DOMContentLoaded', e => {

    if(!Auth.validateToken()){
        location.assign("register.html");
    }
    Product.getAll().then(x=>x.forEach(y=>console.log(y))).catch(y=>console.log(y));
 
})

