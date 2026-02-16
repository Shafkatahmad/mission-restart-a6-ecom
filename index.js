const loadCategories = async() => {
  const res = await fetch('https://fakestoreapi.com/products/categories')
  const data = await res.json()
  console.log(data)
  displayCategories(data)
}

const displayCategories = (categories) => {
  const petCategories = document.getElementById('pet-categories');

  for(let category of categories) {
    const div = document.createElement("div");
    div.innerHTML = `
    <li class="font-semibold text-gray-500 border-2 border-gray-400 rounded-3xl"><a>${category}</a></li>
    `
    petCategories.appendChild(div);
  }
}

const loadAllProducts = async() => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  displayAllProducts(products);
}

const displayAllProducts = (products) => {
  const productsContainer = document.getElementById('productsContainer');

  for(let product of products) {
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
            <button class="px-4 py-2 bg-white border-2 border-gray-200 text-gray-500 font-semibold text-sm rounded-xl"><i class="fa-regular fa-eye mr-2"></i>Details</button>
            <button class="px-4 py-2 bg-blue-600 text-sm text-white rounded-xl"><i class="fa-solid fa-cart-arrow-down mr-2"></i>Add</button>
        </div>
    </div>
    `
    productsContainer.appendChild(div);
  }
}
loadCategories();
loadAllProducts();