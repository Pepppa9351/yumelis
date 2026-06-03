document.addEventListener('DOMContentLoaded', OnLoad);

function OnLoad() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  fetch("/yumelis/data/products.json")
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      if (product) {
        displayProduct(product);
      } else {
        throw new Error("Product not found.");
      }
    })
    .catch(handleError);
}

function displayProduct(product) {
  document.getElementById('product-image').src = product.image;

  // If brand exists and is not empty, show it
  if (product.brand && product.brand.trim() !== "") {
    document.getElementById('product-brand').textContent = product.brand;
  } else {
    document.getElementById('product-brand').style.display = "none";
  }

  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = product.price + " Kč";
  createButton(product);
}

function createButton(product) {
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href= "/yumelis/cart/"; 
    };
  }
}

function handleError(error) {
  console.error("Error loading products:", error);
}
