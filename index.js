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
    div.innerHTML = `
    <img class="bg-gray-200 h-2/3 w-full p-4 object-contain mb-2" src=${product.image} alt="">
    <div class="flex justify-between text-gray-500 mb-3">
        <p class="bg-purple-200 text-purple-700 text-sm px-2 rounded-xl">${product.category}</p>
        <p>${product.rating.rate} <span>(${product.rating.count})</span></p>
    </div>
        <h3 class="overflow-x-hidden font-semibold">${product.title}</h3>
        <h3 class="font-bold">${product.price}</h3>
    <div>
        <button class="px-3 py-2 bg-red-300 text-sm rounded-xl">Details</button>
        <button class="px-3 py-2 bg-blue-600 text-sm text-white rounded-xl">Add</button>
    </div>
    `
    productsContainer.appendChild(div);
  }
}
loadCategories();
loadAllProducts();