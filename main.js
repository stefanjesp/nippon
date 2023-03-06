let carts = document.querySelectorAll('.add-to-cart')

let products = [{
        name: "Mix-selv kassen",
        tag: "card1",
        price: 350,
        inCart: 0
    },
    {
        name: "Vegetar kassen",
        tag: "card2",
        price: 399,
        inCart: 0
    },
    {
        name: "Veganer kassen",
        tag: "card3",
        price: 399,
        inCart: 0
    },
    {
        name: "Luksus kassen",
        tag: "card4",
        price: 650,
        inCart: 0
    },

]


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;

    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers)
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}


function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');


    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            
                <div class="product">
                                   
                    <div class="productBox">
                    <span>${item.name}</span>
                    <img class="cartimage" src="./img/${item.tag}.png">
                    </div>
                    
                
                           
                    <div class="quantityPrice ">
                    <div class="cartQuantity">
                    <ion-icon class="decrease" name="remove-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase" name="add-circle-outline"></ion-icon>
                    </div>                   
                    kr.${item.price},00
                    </div>
                </div>
            `;


        });

        productContainer.innerHTML += `
        <div class="cartTotalContainer">
            <h4 class="cartTotalTitle">
                Totalt
            </h4>
            <h4 class="cartTotal">
                Kr.${cartCost },00
            </h4>
        `;
    }




    console.log(cartItems)
}


onLoadCartNumbers();
displayCart();