//import Menu Items
import { menuArray } from "/data.js"

// Global Variables
let cartArray = [];

//Event listner for the whole document

  document.addEventListener('click', function(e){
      
        if(e.target.dataset.id === '0'){
            cartArray.push(menuArray[0]);
            render();
            console.log(`Added item to cart`);
        }
        else if(e.target.dataset.id === '1'){
            cartArray.push(menuArray[1]);
            render();
            console.log(`Added item to cart`);
        }
        else if(e.target.dataset.id === '2'){
            cartArray.push(menuArray[2]);
            render();
            console.log(`Added item to cart`);
        }
        else if(e.target.dataset.removeid){
                cartArray.splice(e.target.dataset.removeid, 1);
                render();
                console.log(`Removed item from cart`);
        }
        else if(e.target.id === 'complete-order' && cartArray[0]){
            const modal = document.getElementById('modal').classList.toggle('hidden')
        }
        else if(e.target.id === 'modal-btn'){
            e.preventDefault();
            handlePaymentComplete();
            render();
        }
  })

// Handle of the complete payment button for the modal. Hides and shows elements.

function handlePaymentComplete(){
    const modal = document.getElementById('modal').classList.toggle('hidden');
    const paidContainer = document.getElementById('paid-container').classList.toggle('hidden');
    const cartSection = document.getElementById('cart-section').classList.add('hidden');
}

// Creates Menu HTML from menuArray Items using forEach method, returns to render function

function getMenuHtml(){
    
    let menuHtml = ''
    
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="menu-item">
            <div class="menu-div">
            <div class="emoji-container">
                <p class="emoji">${item.emoji}</p>
            </div>
            <div class="item-info">
                <h3 class="item-name">${item.name}</h3>
                <p class="ingredients">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            </div>
            <div class="add-item">
                <button data-id=${item.id}>+</button>
            </div>
        </div>
        `
    })
    
    return menuHtml
}

//Creates Cart HTML from Cart Array generated from items added to cart by user

 function getCartHtml(){
    let cartHtml = '';
    let sum = 0;
    
    cartArray.forEach(function(item,index){
        cartHtml += `
    <div class="cart-items">
        <div class="item-with-remove">
            <h3>${item.name}</h3>
            <button id="cart-remove" data-removeId=${index}>remove</button>
        </div>
        <h3>$${item.price}</h3>
    </div>
    `
    sum += item.price;
    })   
    cartHtml += `
    <div class="total">
        <h3>Total Price:</h3>
        <h3>$${sum}</h3>
    </div>
    <div>
        <button id="complete-order">Complete order</button>
    </div>
    `
    return cartHtml
}

// Creates HTML for post-payment confirmation

function getPaidHtml(){
    let paidHtml = ''
    const name = document.getElementById('cardName').value;
    
    paidHtml = `
    <h3>Thanks, ${name}! Your order is on its way!</h3>
    `
    return paidHtml;
}

// Renders all HTML to DOM

function render(){
    
    
    const menuContainer = document.getElementById('menu-container');
    const cartContainer = document.getElementById('cart-container');
    const paidContainer = document.getElementById('paid-container');
    

        menuContainer.innerHTML = getMenuHtml();
        cartContainer.innerHTML = getCartHtml();
        paidContainer.innerHTML = getPaidHtml();
        
}

render();