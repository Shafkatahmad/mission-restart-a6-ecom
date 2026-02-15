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
    <li class="font-semibold text-gray-500"><a>${category}</a></li>
    `
    petCategories.appendChild(div);
  }
}
loadCategories();