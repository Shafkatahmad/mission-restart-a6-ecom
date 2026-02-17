document.getElementById('productsBtn').addEventListener("click", function () {
    document.getElementById('allProducts').classList.remove("hidden");
    document.querySelectorAll('.homePage').forEach(el => {
        el.classList.add("hidden");
    });
})

document.getElementById('homebtn').addEventListener("click", function () {
    document.getElementById('allProducts').classList.add("hidden");
    document.querySelectorAll('.homePage').forEach(el => {
        el.classList.remove("hidden");
    });
})

let cart = 0;
const updateCart = () => {
    document.getElementById('cartCount').innerText = cart;
}

document.getElementById('cartDetails').addEventListener("click", function () {
    const cartModalContainer = document.getElementById('my_modal_1_container');
    cartModalContainer.innerHTML = "";
    cartProducts.forEach(imgPath => {
        const img = document.createElement("img");
        img.src = imgPath;
        img.className = "w-5 mb-4";
        const sum = document.createElement("div");
        sum.innerHTML = `
        <p>Total: ${cartTotaql}</p>
        `
        // cartModalContainer.append(img, sum);
        cartModalContainer.append(img);
        // cartModalContainer.appendChild(cartTotaql);
    })
    cartModalContainer.append(cartTotaql);
    // cartModalContainer.appendChild(sum);
    document.getElementById('my_modal_1').showModal();
}
)

const removeActive = (btns) => {
    for (let btn of btns) {
        btn.classList.remove("bg-blue-500", "text-white")
    }
}

document.getElementById('all').addEventListener("click", function () {
    document.getElementById('all').disabled = true;
    const removeActiveClass = document.querySelectorAll('.categoryBtn');
    removeActive(removeActiveClass);
    document.getElementById('all').classList.add("bg-blue-500", "text-white");
    loadAllProducts();
})
const loadCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories')
    const data = await res.json()
    console.log(data)
    displayCategories(data)
}


const displayCategories = (categories) => {
    const petCategories = document.getElementById('pet-categories');


    for (let category of categories) {
        const button = document.createElement("button");
        button.id = category;
        button.className = "font-semibold text-gray-500 border-2 border-gray-400 p-3 rounded-3xl categoryBtn";
        button.innerText = category;
        // li.innerHTML = `
        // <li class="font-semibold text-gray-500 border-2 border-gray-400 rounded-3xl categoryBtn"><a>${category}</a></li>
        // `
        button.addEventListener("click", async function () {
            const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            const product = await res.json();
            const removeActiveClass = document.querySelectorAll('.categoryBtn');
            removeActive(removeActiveClass);
            button.disabled = true;
            button.classList.add("bg-blue-500", "text-white");
            displayCategoryProduct(product);
        })
        petCategories.appendChild(button);
    }
}

// document.querySelectorAll('.categoryBtn').forEach(btn => {
//     addEventListener("click", async() => {
//         const res = await fetch(`https://fakestoreapi.com/products/category/${btn.id}`);
//         const products = await res.json();
//         displayCategoryProduct(products);
//     })
// })

const displayCategoryProduct = (products) => {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = "";

    for (let product of products) {
        const div = document.createElement("div");
        div.classList.add('border-2', 'border-gray-200', 'rounded-xl');
        div.innerHTML = `
        <img class="bg-gray-200 h-4/6 w-full p-4 object-contain rounded-t" src=${product.image} alt="">
    <div class="p-3">
        <div class="flex justify-between text-gray-500 mb-3">
            <p class="bg-purple-200 text-purple-700 text-sm px-2 rounded-xl">${product.category}</p>
            <p>${product.rating.rate} <span>(${product.rating.count})</span></p>
        </div>
        <h3 class="truncate font-semibold">${product.title}</h3>
        <h3 class="font-bold">${product.price}</h3>
        <div class="mt-3 flex flex-col md:flex-row text-center md:text-left">
            <button class="detailsBtn px-4 py-2 bg-white border-2 border-gray-200 text-gray-500 font-semibold text-sm rounded-xl flex items-center"><i class="fa-regular fa-eye mr-2"></i>Details</button>
            <button class="addCart px-4 py-2 bg-blue-600 text-sm text-white rounded-xl flex items-center"><i class="fa-solid fa-cart-arrow-down mr-2"></i>Add</button>
        </div>
    </div>
        `
        productsContainer.appendChild(div);

        const detailsBtn = div.querySelector('.detailsBtn');
        detailsBtn.addEventListener("click", function () {
            document.getElementById('modalCateTitle').innerText = product.title;
            document.getElementById('modalCateDescription').innerText = product.description;
            document.getElementById('modalCatePrice').innerText = "Price: $" + product.price;
            document.getElementById('modalCateRating').innerText = "Rating: " + product.rating.rate;

            document.getElementById('my_modal_4').showModal();
        })

        div.querySelector('.addCart').addEventListener("click", function () {
            cart++;
            updateCart();
        })
    }
}


const loadAllProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    displayAllProducts(products);
    displayTrendingProducts(products)
}

const displayTrendingProducts = (products) => {
    const trending = [...products].sort((a, b) => b.rating.rate - a.rating.rate);
    const topThree = trending.slice(0, 3);

    const trendingProducts = document.getElementById('trendingNow');
    trendingProducts.innerHTML = "";

    for (let product of topThree) {
        const div = document.createElement("div");
        div.classList.add('border-2', 'border-gray-200', 'rounded-xl');
        div.innerHTML = `
        <img class="bg-gray-200 h-4/6 w-full p-4 object-contain rounded-t" src=${product.image} alt="">
    <div class="p-3">
        <div class="flex justify-between text-gray-500 mb-3">
            <p class="bg-purple-200 text-purple-700 text-sm px-2 rounded-xl">${product.category}</p>
            <p>${product.rating.rate} <span>(${product.rating.count})</span></p>
        </div>
        <h3 class="truncate font-semibold">${product.title}</h3>
        <h3 class="font-bold">${product.price}</h3>
        <div class="mt-3">
            <button class="detailsBtn px-4 py-2 bg-white border-2 border-gray-200 text-gray-500 font-semibold text-sm rounded-xl"><i class="fa-regular fa-eye mr-2"></i>Details</button>
            <button class="addCart px-4 py-2 bg-blue-600 text-sm text-white rounded-xl"><i class="fa-solid fa-cart-arrow-down mr-2"></i>Add</button>
        </div>
    </div>
        `
        trendingProducts.appendChild(div);
        const detailsBtn = div.querySelector('.detailsBtn');
        detailsBtn.addEventListener("click", function () {
            document.getElementById('modalTrendTitle').innerText = product.title;
            document.getElementById('modalTrendDescription').innerText = product.description;
            document.getElementById('modalTrendPrice').innerText = "Price: $" + product.price;
            document.getElementById('modalTrendRating').innerText = "Rating: " + product.rating.rate;

            document.getElementById('my_modal_3').showModal();
        })

        div.querySelector('.addCart').addEventListener("click", function () {
            cart++;
            updateCart();
        })
    }
}


const displayAllProducts = (products) => {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = "";


    for (let product of products) {
        const div = document.createElement("div");
        div.classList.add('border-2', 'border-gray-200', 'rounded-xl');
        div.innerHTML = `
    <img class="bg-gray-200 h-4/6 w-full p-4 object-contain rounded-t" src=${product.image} alt="">
    <div class="p-3">
        <div class="flex justify-between text-gray-500 mb-3">
            <p class="bg-purple-200 text-purple-700 text-sm truncate  px-2 rounded-xl">${product.category}</p>
            <p>${product.rating.rate} <span>(${product.rating.count})</span></p>
        </div>
        <h3 class="truncate font-semibold">${product.title}</h3>
        <h3 class="font-bold">${product.price}</h3>
        <div class="mt-3 flex flex-col md:flex-row text-center md:text-left">
            <button class="detailsBtn px-4 py-2 bg-white border-2 border-gray-200 text-gray-500 font-semibold text-sm rounded-xl flex items-center"><i class="fa-regular fa-eye mr-2"></i>Details</button>
            <button class="addCart px-4 py-2 bg-blue-600 text-sm text-white rounded-xl flex items-center"><i class="fa-solid fa-cart-arrow-down mr-2"></i>Add</button>
        </div>
    </div>
    `
        productsContainer.appendChild(div);
        const detailsBtn = div.querySelector('.detailsBtn');
        detailsBtn.addEventListener("click", function () {
            document.getElementById('modalTitle').innerText = product.title;
            document.getElementById('modalDescription').innerText = product.description;
            document.getElementById('modalPrice').innerText = "Price: $" + product.price;
            document.getElementById('modalRating').innerText = "Rating: " + product.rating.rate;

            document.getElementById('my_modal_2').showModal();
        })

        div.querySelector('.addCart').addEventListener("click", function () {
            cart++;
            updateCart();
            loadSelectedProduct(`${product.id}`)
        })
        // const addCart = div
    }
}

let cartProducts = [];
let cartTotaql = 0;
const loadSelectedProduct = async (productId) => {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await res.json();
    cartProducts.push(product.image);
    cartTotaql += product.price;
}
loadCategories();
loadAllProducts();