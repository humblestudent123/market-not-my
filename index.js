const products = [
  { id: 1, name: 'Товар 1', price: 1000 },
  { id: 2, name: 'Товар 2', price: 1500 },
  { id: 3, name: 'Товар 3', price: 2000 },
];

let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.getElementById('cart-count');
const cartDetailsSection = document.getElementById('cart-details');
const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const clearCartButton = document.getElementById('clear-cart');

// Добавляем обработчики на все кнопки
addToCartButtons.forEach(button => {
  button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.closest('.product').dataset.id);
      addToCart(productId);
  });
});

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  if (product) {
      cart.push(product);
      updateCart();
  }
}

function updateCart() {
  // Обновление количества товаров в корзине
  cartCountElement.textContent = cart.length;

  // Если корзина пустая, скрываем раздел корзины
  if (cart.length === 0) {
      cartDetailsSection.classList.add('hidden');
      return;
  }

  // Отображение корзины
  cartDetailsSection.classList.remove('hidden');

  // Очищаем список товаров в корзине
  cartItemsElement.innerHTML = '';

  // Общее количество товаров
  let totalPrice = 0;

  // Отображаем товары в корзине
  cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          ${item.name} - ${item.price} ₽ 
          <button class="remove-from-cart" data-index="${index}">Удалить</button>
      `;
      cartItemsElement.appendChild(li);
      totalPrice += item.price;
  });

  // Обновляем общую цену
  totalPriceElement.textContent = `Итого: ${totalPrice} ₽`;

  // Добавляем обработчики для кнопок удаления
  const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
  removeFromCartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const index = parseInt(event.target.dataset.index);
          removeFromCart(index);
      });
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Очистка корзины
clearCartButton.addEventListener('click', () => {
  cart = [];
  updateCart();
});
