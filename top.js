let addPrice = 0;
let monthPayments = 3;
let cartItems = [];

function openCart() {
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.style.right = "0";
}


const products = [{
        name: "Look me in the eye",
        price: 10000
    },
    {
        name: "Rainbow",
        price: 5000
    },

    {
        name: "Red Lady",
        price: 25000
    },
    {
        name: "Colorful",
        price: 15000
    },
    {
        name: "Flamingo",
        price: 2000
    },

    {
        name: "Abstract Flowers",
        price: 3500
    },

    {
        name: "Good Vibes Only",
        price: 3500
    },

    {
        name: "Relaxed",
        price: 6000
    },

    {
        name: "Candy Horse",
        price: 10000
    },


]
const productsJSON = JSON.stringify(products);
localStorage.setItem("products", productsJSON);

function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice
    };
    cartItems.push(product);
    displayCart();

    calculate(cartItems);
}

function displayCart() {
    const cartItemsDiv = document.getElementById("cart-items");

    cartItemsDiv.innerHTML = "";

    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = "<p>No items in the cart.</p>";
    } else {
        cartItems.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} added to cart</p>
                <p>$${item.price} (IVA included)</p>
            `;
            cartItemsDiv.appendChild(cartItem);
        });
    }
}

function calculate(products) {
    let totalWithoutIva = 0;
    let subtotal = 0;
    let monthPaymentSubtotal = 0;
    const discount = 0.1; // 10% discount for products above $20,000

    const cartSummaryDiv = document.getElementById("cart-summary");
    cartSummaryDiv.innerHTML = "";

    cartItems.forEach((item) => {
        const product = products.find((p) => p.name.toUpperCase() === item.name.toUpperCase());

        if (product) {
            product.price += product.price * 0.21; // Add IVA (21%)
            totalWithoutIva += product.price - product.price * 0.21; // Calculate price without IVA

            if (product.price >= 20000) {
                product.price -= product.price * discount; // Apply discount for products above $20,000
            }

            subtotal += product.price;
            monthPaymentSubtotal += product.price / monthPayments;

            const productInfo = document.createElement("p");
            productInfo.textContent = `El cuadro "${product.name}" tiene un valor de Pesos Argentinos: $${product.price} (IVA incluido).`;
            cartSummaryDiv.appendChild(productInfo);

            const paymentInfo = document.createElement("p");
            paymentInfo.textContent = "El subtotal es " + monthPayments + " cuotas de: $" + monthPaymentSubtotal + " cada cuota.";
            cartSummaryDiv.appendChild(paymentInfo);
        } else {

            const notFoundInfo = document.createElement("p");
            notFoundInfo.textContent = `El producto "${item.name}" no fue encontrado.`;
            cartSummaryDiv.appendChild(notFoundInfo);
        }
    });


    const totalWithoutIvaInfo = document.createElement("p");
    totalWithoutIvaInfo.textContent = `La suma total neta de iva y descuentos de los productos elegidos es de Pesos Argentinos: $${totalWithoutIva}.`;
    cartSummaryDiv.appendChild(totalWithoutIvaInfo);

    const subtotalInfo = document.createElement("p");
    subtotalInfo.textContent = `La suma total con iva incluido y descuentos aplicados de los productos elegidos es de Pesos Argentinos: $${subtotal}.`;
    cartSummaryDiv.appendChild(subtotalInfo);
}