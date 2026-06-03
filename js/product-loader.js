document.addEventListener('DOMContentLoaded', OnLoad);

function OnLoad() {

    // Get the page category from the html document this script is being called from
    const pageCategory= document.body.dataset.category;

    // Fetch all products and filter by type
    fetch("/yumelis/data/products.json")
    .then(response => response.json())
    .then(products => {
        const filtered = products.filter(p => p.category === pageCategory);
        displayProducts(filtered);
    })
    .catch(handleError);
}

function displayProducts(products) {
  const productList = document.getElementById("pp-product-list");

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const productLink = document.createElement("a");
    productLink.href= `/yumelis/product/?id=${product.id}`;
    productLink.className = "pp-product-card";

    productLink.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="pp-product-image" />
      <P class="pp-product-brand">${product.brand}</p>
      <p class="pp-product-name">${product.name}</p>
      <p class="pp-product-price">${product.price} Kč</p>
    `;

    productList.appendChild(productLink);
  }
}

function handleError(error) {
  console.error("Error loading products:", error);
}
