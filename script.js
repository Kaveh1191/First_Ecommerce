let carticon=document.querySelector('#cart-iconn')
let cart=document.querySelector('.cart')
let closecart=document.querySelector('#close')
//hamburger menu
const hamMenu = document.getElementById('hamMenu');
const close = document.getElementById('closeIndex');
const nav = document.getElementById('navbar');
if(hamMenu){
    hamMenu.addEventListener('click',() =>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click',() =>{
        nav.classList.remove('active');
    })
}

//open cart
carticon.onclick=()=>{
    cart.classList.add("Active")
}
//close cart
closecart.onclick=()=>{
    cart.classList.remove("Active")
}

if(document.readyState=='loading'){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}

function ready(){
    var removecartbtn=document.getElementsByClassName('cart-remove')
    for(var i=0;i<removecartbtn.length;i++){
        var button=removecartbtn[i]
        button.addEventListener("click",removeCartitem)
    }
    var quantityinput=document.getElementsByClassName('cart-input');
    for(var i=0;i<quantityinput.length;i++){
        var input=quantityinput[i];
        input.addEventListener('change',quantitychange);
    }
    //add to cart
    //var addCart=document.getElementsByClassName('add-cart');
    //for(var i=0;i<addCart.length;i++){
    //    var button=addCart[i];
    //    button.addEventListener('click',addCartClick);
    //}
    //buy button
    document.getElementsByClassName('btn')[0].addEventListener("click",buybtnclick);
}
function buybtnclick(){
    alert("Your purchase has been registered");
    var cartcontent=document.getElementById('cart-body');
    while(cartcontent.hasChildNodes()){
        cartcontent.removeChild(cartcontent.firstChild);
    }
    updatetotal();
}



//remove items
function removeCartitem(event){
    var btnclick=event.target;
    btnclick.parentElement.remove();   
    updatetotal();
}
//quantity change
function quantitychange(event){
    var input=event.target
    if(isNaN(input.value) || input.value<=0){/*isNaN baraye check kardan meghdar vared shode addad hast ya na(not a number) */
        input.value=1;
    }
    updatetotal();
}
//add cart function
function addCartClick(title, price, proimg){
    //var button=event.target;
    //var shopPro=button.parentElement.parentElement;
    //var title=shopPro.getElementsByClassName('proo-title')[0].innerText;
    //var price=shopPro.getElementsByClassName('price')[0].innerText;
    //var proimg=shopPro.getElementsByClassName('product-img')[0].src;
    addProToCart(title,price,proimg);
    updatetotal();
}

var productList = []
function addProToCart(title, price, proimg) {
    console.log(title);
    console.log(productList);
    if (productList.includes(title)) {
        index = productList.indexOf(title);
        product = document.getElementsByClassName("cart-box")[index];
        product.childNodes[3].childNodes[5].value++;
    } else {
        productList.push(title);
        var cartshopbox = document.createElement("div");
        cartshopbox.classList.add("cart-box");
        var cartboxcontent = `
                            <img src="${proimg}" alt=""  class="cart-img">
                            <div class="detail">
                                <div class="cart-pro-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-input">
                            </div>
                            <i class="fa-solid fa-trash cart-remove"></i>`;
        cartshopbox.innerHTML = cartboxcontent;
        var cartitem = document.getElementById("cart-body");
        cartitem.append(cartshopbox);
        cartshopbox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartitem);
        cartshopbox.getElementsByClassName("cart-input")[0].addEventListener("change", quantitychange);
    }


}


//update total
function updatetotal(){
    var cartcontent=document.getElementById('cart-body');
    var cartBoxs=cartcontent.getElementsByClassName('cart-box');
    var total=0
    for(var i=0;i<cartBoxs.length;i++){
        var cartbox=cartBoxs[i];
        var priceE=cartbox.getElementsByClassName('cart-price')[0];
        var quantityE=cartbox.getElementsByClassName('cart-input')[0];
        var price=parseFloat(priceE.innerText.replace("$",""));
        var quantity=quantityE.value;
        total=total+(price*quantity);
    }
        //for rounding number for max 2 decimal
        total=Math.round(total*100)/100;
        document.getElementsByClassName('total-price')[0].innerText='$'+total; 
}