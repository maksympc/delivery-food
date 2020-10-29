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

function toggleModal() {
  modal.classList.toggle("is-open");
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
  buttonOut.removeEventListener('click', logOut);
  checkAuth();
}

function authorized() {
  buttonAuth.style.display = 'none';
  userName.textContent = login;
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
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

checkAuth();


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
  card.className = 'card';
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
  kitchen,
  name,
  price,
  stars
}) {
  
  const restaurantTitle = menu.querySelector('.restaurant-title');
  const restaurantRating = menu.querySelector('.rating');
  const restaurantPrice = menu.querySelector('.price');
  const restaurantCategory = menu.querySelector('.category');
  restaurantTitle.textContent = name;
  restaurantRating.textContent = stars;
  restaurantPrice.textContent = `От ${price} ₽`;
  restaurantCategory.textContent = kitchen;
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  if (restaurant) {
    if (login) {
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      const info = JSON.parse(decodeURI(restaurant.dataset.info));
      updateRestaurantHeader(info);
      getData(`./db/${info.products}`).then(initializeGoods);
    } else {
      toogleModalAuth();
    }
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


cardsRestaurants.addEventListener('click', openGoods);

/** Logo functions */
function hideGoods() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

logo.addEventListener('click', hideGoods);

/** Cart functions */
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

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