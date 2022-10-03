// function getItem(id) {
//     let cartItem = localStorage.getItem("items")
//     cartItem = JSON.parse(cartItem);
//     //  console.log(cartItem.id);
//     //  console.log(id)
//     if (cartItem != null) {
//         if (cartItem[id] == undefined) {
//             cartItem = { ...cartItem, [id]: { id, cart: 0 } };
//             // console.log(...cartItem)
//             // console.log(cartItem)
//         }
//         cartItem[id].cart += 1;
//     } else {

//         cartItem = { [id]: { id, cart: 1 } };
//     }

//     localStorage.setItem("items", JSON.stringify(cartItem))

// }



let carts = document.querySelectorAll(".buy");

let products = [
    {
        name: "PS 5",
        tag: "ps5",
        price: 20000,
        cart: 0
    },
    {
        name: "Nintendo Switch (OLED model)",
        tag: "nds",
        price: 14900,
        cart: 0
    },
    {
        name: "Xbox Series X",
        tag: "xbox",
        price: 16000,
        cart: 0
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })

}

function loadCart() {
    let ProductNumbers = localStorage.getItem("cartNumbers");

    if (ProductNumbers) {
        document.querySelector(".cart span").textContent = ProductNumbers;
    }
}

function cartNumbers(products) {
    let ProductNumbers = localStorage.getItem("cartNumbers");
    ProductNumbers = parseInt(ProductNumbers);

    if (ProductNumbers) {
        localStorage.setItem("cartNumbers", ProductNumbers + 1);
        document.querySelector(".cart span").textContent = ProductNumbers + 1;

    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart span").textContent = 1;

    }
    setItem(products)
}

function setItem(products) {
    let cartItem = localStorage.getItem("inCart")
    cartItem = JSON.parse(cartItem)
    console.log(cartItem)
    
    if(cartItem != null){
        if(cartItem[products.tag.cart] == undefined){
            cartItem ={ ...cartItem,[products.tag]:products}
        }
        cartItem[products.tag].cart += 1;
    }else{

        products.cart = 1;
        cartItem ={ [products.tag]:products}
    }

    localStorage.setItem("inCart", JSON.stringify(cartItem))
}

function totalCost(products){
    let cost =localStorage.getItem("total")
    if(cost != null){
        cost = parseInt(cost);
        localStorage.setItem("total", cost + products.price)
    }else{
        localStorage.setItem("total", products.price)
    }
}

function displayCart() {
    let cartItem = localStorage.getItem("inCart");
    cartItem = JSON.parse(cartItem);
    let table = document.querySelector(".table-cart")
    let cost =localStorage.getItem("total")

    // console.log(table.innerHTML)

    // let productsHead = document.querySelector(".products");

    if(cartItem && table ){
        Object.values(cartItem).map(item => {
            table.innerHTML += `
            <tr>
                <td><img class=img-cart src= img/${item.tag}.jpg></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.cart}</td>
                <td>${item.price * item.cart}</td>
            </tr>`

           
            // productsHead.innerHTML += `
            // <div class="product"> 
            //     <img class=img-cart src= img/${item.tag}.jpg>
            //     <span>${item.name}</span>
            // </div>
            // <div class="price">
            // ${item.price}
            // </div>
            // <div class="quantity">
            // ${item.cart}
            // </div>
            // <div class="total">
            // ${item.price * item.cart} THB
            // </div>
            // `
        })
        table.innerHTML += `
        <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Cart Total ${cost}</td>
                
            </tr>
        `
    }
}



loadCart();
displayCart();