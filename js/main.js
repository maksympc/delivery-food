"use strict";

import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

const LOCALSTORAGE = {
  LOGIN: 'supersecretfield#1'
}

let login = localStorage.getItem(LOCALSTORAGE.LOGIN);

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector('.button-auth');
const closeAutnBtn = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const loginError = document.querySelector('#login-error');
const passwordInput = document.querySelector('#password');
const passwordError = document.querySelector('#password-error');
const modalAuth = document.querySelector('.modal-auth');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const inputSearch = document.querySelector('.input-search');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');

const cart = [];

/** Fetch data */
const getData = async (url) => {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${url}, status: ${response.status}`);
  }

  return await response.json();

}

/** Validation functions and initialization */
function hideLoginError() {
  loginInput.classList.remove('error');
  loginError.style.display = 'none';
}

function showLoginError() {
  loginInput.classList.add('error');
  loginError.style.display = '';
}


function hidePasswordError() {
  passwordInput.classList.remove('error');
  passwordError.style.display = 'none';
}

function showPasswordError() {
  passwordInput.classList.add('error');
  passwordError.style.display = '';
}

loginInput.addEventListener('input', hideLoginError);
passwordInput.addEventListener('input', hidePasswordError);

/** Modal interaction functions */
function disabledScroll() {

}

function enableScroll() {

}

function toogleModalAuth() {
  modalAuth.classList.toggle('is-open');
  hideLoginError();
  hidePasswordError();
  if (modalAuth.classList.contains("is-open")) {
    disabledScroll();
  } {
    enableScroll();
  }
}

function openModalClickHandler(event) {
  if (event.target.classList.contains('is-open')) {
    toogleModalAuth();
  }
}

/** Login/logout, authentication functions */
function logIn(event) {
  const loginValue = loginInput.value;
  const passwordValue = passwordInput.value;
  event.preventDefault();
  if (loginValue && passwordValue) {
    login = loginValue;
    localStorage.setItem(LOCALSTORAGE.LOGIN, login);
    toogleModalAuth();
    buttonAuth.removeEventListener('click', toogleModalAuth);
    closeAutnBtn.removeEventListener('click', toogleModalAuth);
    loginForm.removeEventListener('submit', logIn);
    modalAuth.removeEventListener('click', openModalClickHandler);
    loginForm.reset();
    checkAuth();
  } else {
    if (!loginValue) {
      showLoginError();
    } else {
      hideLoginError();
    }

    if (!passwordValue) {
      showPasswordError();
    } else {
      hidePasswordError();
    }
  }
}

function logOut(event) {
  login = null;
  localStorage.removeItem(LOCALSTORAGE.LOGIN);
  buttonAuth.style.display = '';
  userName.style.display = '';
  buttonOut.style.display = '';
  cartButton.style.display = '';
  buttonOut.removeEventListener('click', logOut);
  checkAuth();
}

function authorized() {
  buttonAuth.style.display = 'none';
  userName.textContent = login;
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';
  buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAutnBtn.addEventListener('click', toogleModalAuth);
  loginForm.addEventListener('submit', logIn);
  modalAuth.addEventListener('click', openModalClickHandler);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

/** Cards functions */
function createCardRestaurants(data) {
  const {
    image,
    kitchen,
    name,
    price,
    products,
    stars,
    time_of_delivery
  } = data;
  const restaurantHtml = `<a class="card card-restaurant" data-info="${encodeURI(JSON.stringify(data))}">
  <img src="${image}" alt="image" class="card-image" />
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title">${name}</h3>
      <span class="card-tag tag">${time_of_delivery} мин</span>
    </div>
    <div class="card-info">
      <div class="rating">
        ${stars}
      </div>
      <div class="price">От ${price} ₽</div>
      <div class="category">${kitchen}</div>
    </div>
  </div>
  </a>`;
  cardsRestaurants.insertAdjacentHTML('beforeend', restaurantHtml);
}

function createCardGood(good) {
  const {
    description,
    id,
    image,
    name,
    price
  } = good;

  const card = document.createElement('div');
  card.classList.add('card');
  card.id = id;
  const goodHtml = `<img src="${image}" alt="image" class="card-image" />
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">${name}</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">${description}</div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">${price} ₽</strong>
    </div>
  </div>`;

  card.insertAdjacentHTML('beforeend', goodHtml);
  cardsMenu.insertAdjacentElement('beforeend', card);
}

function initializeGoods(goods) {
  for (let i = 0; i < goods.length; i++) {
    createCardGood(goods[i]);
  }
}

function updateRestaurantHeader({
  kitchen = '',
  name = '',
  price,
  stars = ''
}) {

  const restaurantTitle = menu.querySelector('.restaurant-title');
  const restaurantRating = menu.querySelector('.rating');
  const restaurantPrice = menu.querySelector('.price');
  const restaurantCategory = menu.querySelector('.category');
  restaurantTitle.textContent = name;
  restaurantRating.textContent = stars;
  restaurantPrice.textContent = typeof price != 'undefined' ? `От ${price} ₽` : '';
  restaurantCategory.textContent = kitchen;
}

function openGoods(event) {
  if (login) {
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');
    if (restaurant) {
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      const info = JSON.parse(decodeURI(restaurant.dataset.info));
      updateRestaurantHeader(info);
      getData(`./db/${info.products}`).then(initializeGoods);
    }
  } else {
    toogleModalAuth();
  }
}

function initializeRestaurants(partners) {
  for (let i = 0; i < partners.length; i++) {
    createCardRestaurants(partners[i]);
  }
}

getData('./db/partners.json').then((partners) => {
  initializeRestaurants(partners);
});



/** Logo functions */
function hideGoods() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}



/** Swiper slider */
const swiper = new Swiper('.swiper-container', {
  sliderPerView: 1,
  // loop: true,
  autoplay: {
    delay: 4000,
  },
  effect: 'coverflow',
  // grabCursor: true,
  cubeEffect: {
    shadow: false
  },
  // pagination: {
  //   el: '.swiper-pagination',
  //   type: 'bullets',
  //   clickable: true,
  // },
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});

/** Cart functions  */
function totalPrice() {
  const totalPrice = cart.reduce((acc, i) => acc += (parseFloat(i.price) * i.count), 0);
  modalPrice.textContent = `${totalPrice} ₽`;
}

function renderCart() {
  modalBody.textContent = '';
  cart.forEach(item => {
    const {
      price,
      count,
      id,
      title
    } = item;
    const itemCart = `<div class="food-row">
    <span class="food-name">${title}</span>
    <strong class="food-price">${price}</strong>
    <div class="food-counter">
      <button class="counter-button counter-pop" data-id="${id}">-</button>
      <span class="counter">${count}</span>
      <button class="counter-button counter-push" data-id="${id}">+</button>
    </div>
  </div>`;
    modalBody.insertAdjacentHTML('beforeend', itemCart);
  })
}

function rerenderCart() {
  renderCart();
  totalPrice();
}

function toggleCartModal() {
  rerenderCart();
  modal.classList.toggle("is-open");
}

function addToCart(e) {
  const target = e.target;
  const buttonAddToCart = target.closest('.button-add-cart');

  if (buttonAddToCart) {
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const price = card.querySelector('.card-price-bold').textContent;
    const id = card.id

    const food = cart.find(i => i.id === id);
    if (food) {
      food.count += 1;
    } else {
      cart.push({
        id,
        title,
        price,
        count: 1
      });
    }
  }
}

function changeCartItemsCount(e) {
  const {
    target
  } = e;

  if (target.classList.contains('counter-button')) {
    const index = cart.findIndex(item => item.id === target.dataset.id)
    const food = index !== -1 ? cart[index] : null;
    if (food) {
      if (target.classList.contains('counter-push')) {
        food.count++;
      } else if (target.classList.contains('counter-pop')) {
        food.count--;
        if (food.count === 0) {
          cart.splice(index, 1);
        }
      }
    }
    rerenderCart()
  }
}


function init() {
  logo.addEventListener('click', hideGoods);
  cartButton.addEventListener("click", () => {
    rerenderCart();
    toggleCartModal();
  });
  close.addEventListener("click", toggleCartModal);
  cardsMenu.addEventListener('click', addToCart);
  cardsRestaurants.addEventListener('click', openGoods);
  buttonClearCart.addEventListener('click', () => {cart.length = 0; rerenderCart()});
  modalBody.addEventListener('click', changeCartItemsCount);

  /** Search functions */
  inputSearch.addEventListener('keypress', async (e) => {
    const searchInputValue = e.target.value;
    if (searchInputValue && e.keyCode === 13) {
      cardsMenu.textContent = '';
      const response = await getData(`./db/partners.json`);
      const linkProducts = response.map(i => i.products);
      linkProducts.forEach(async link => {
        const fetchedGoods = await getData(`./db/${link}`);

        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        updateRestaurantHeader({
          name: "Результати поиска",
          kitchen: 'разная кухня'
        });
        const resultSearch = fetchedGoods.filter(i => i.name.toLowerCase().includes(searchInputValue.toLowerCase()));
        initializeGoods(resultSearch);
      });
    }
  })

  checkAuth()
}


init();