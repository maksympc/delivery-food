"use strict";
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

const restaurantsArr = [`<a class="card card-restaurant">
<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title">Пицца плюс</h3>
    <span class="card-tag tag">50 мин</span>
  </div>
  <div class="card-info">
    <div class="rating">
      4.5
    </div>
    <div class="price">От 900 ₽</div>
    <div class="category">Пицца</div>
  </div>
</div>
</a>`, `<a  class="card card-restaurant">
<img src="img/tanuki/preview.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title">Тануки</h3>
    <span class="card-tag tag">60 мин</span>
  </div>
  <div class="card-info">
    <div class="rating">
      4.5
    </div>
    <div class="price">От 1 200 ₽</div>
    <div class="category">Суши, роллы</div>
  </div>
</div>
</a>`, `<a class="card card-restaurant">
<img src="img/food-band/preview.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title">FoodBand</h3>
    <span class="card-tag tag">40 мин</span>
  </div>
  <div class="card-info">
    <div class="rating">
      4.5
    </div>
    <div class="price">От 450 ₽</div>
    <div class="category">Пицца</div>
  </div>
</div>
</a>`, `<a class="card card-restaurant">
<img src="img/palki-skalki/preview.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title">Палки скалки</h3>
    <span class="card-tag tag">55 мин</span>
  </div>
  <div class="card-info">
    <div class="rating">
      4.5
    </div>
    <div class="price">От 500 ₽</div>
    <div class="category">Пицца</div>
  </div>
</div>
</a>`, `<a class="card card-restaurant">
<img src="img/gusi-lebedi/preview.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title">Гуси Лебеди</h3>
    <span class="card-tag tag">75 мин</span>
  </div>
  <div class="card-info">
    <div class="rating">
      4.5
    </div>
    <div class="price">От 1 000 ₽</div>
    <div class="category">Русская кухня</div>
  </div>
</div>
</a>`, `<a class="card card-restaurant">
<img src="img/pizza-burger/preview.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title">PizzaBurger</h3>
    <span class="card-tag tag">45 мин</span>
  </div>
  <div class="card-info">
    <div class="rating">
      4.5
    </div>
    <div class="price">От 700 ₽</div>
    <div class="category">Пицца</div>
  </div>
</div>
</a>`];

const goodsArr = [`<img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title card-title-reg">Пицца Везувий</h3>
  </div>
  <div class="card-info">
    <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
      «Халапенье», соус «Тобаско», томаты.
    </div>
  </div>
  <div class="card-buttons">
    <button class="button button-primary button-add-cart">
      <span class="button-card-text">В корзину</span>
      <span class="button-cart-svg"></span>
    </button>
    <strong class="card-price-bold">545 ₽</strong>
  </div>
</div>`, `<img src="img/pizza-plus/pizza-girls.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title card-title-reg">Пицца Девичник</h3>
  </div>
  <div class="card-info">
    <div class="ingredients">Соус томатный, постное тесто, нежирный сыр, кукуруза, лук,
      маслины,
      грибы, помидоры, болгарский перец.
    </div>
  </div>
  <div class="card-buttons">
    <button class="button button-primary button-add-cart">
      <span class="button-card-text">В корзину</span>
      <span class="button-cart-svg"></span>
    </button>
    <strong class="card-price-bold">450 ₽</strong>
  </div>
</div>`, `<img src="img/pizza-plus/pizza-oleole.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title card-title-reg">Пицца Оле-Оле</h3>
  </div>
  <div class="card-info">
    <div class="ingredients">Соус томатный, сыр «Моцарелла», черри, маслины, зелень, майонез
    </div>
  </div>
  <div class="card-buttons">
    <button class="button button-primary button-add-cart">
      <span class="button-card-text">В корзину</span>
      <span class="button-cart-svg"></span>
    </button>
    <strong class="card-price-bold">440 ₽</strong>
  </div>
</div>`, `<img src="img/pizza-plus/pizza-plus.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title card-title-reg">Пицца Плюс</h3>
  </div>
  <div class="card-info">
    <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Чеддер», томаты,
      пепперони,
      телятина, грибы, бекон, болгарский перец.
    </div>
  </div>
  <div class="card-buttons">
    <button class="button button-primary button-add-cart">
      <span class="button-card-text">В корзину</span>
      <span class="button-cart-svg"></span>
    </button>
    <strong class="card-price-bold">805 ₽</strong>
  </div>
</div>`, `<img src="img/pizza-plus/pizza-hawaiian.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title card-title-reg">Пицца Гавайская</h3>
  </div>
  <div class="card-info">
    <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, ананасы</div>
  </div>
  <div class="card-buttons">
    <button class="button button-primary button-add-cart">
      <span class="button-card-text">В корзину</span>
      <span class="button-cart-svg"></span>
    </button>
    <strong class="card-price-bold">440 ₽</strong>
  </div>
</div>`, `<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image" />
<div class="card-text">
  <div class="card-heading">
    <h3 class="card-title card-title-reg">Пицца Классика</h3>
  </div>
  <div class="card-info">
    <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина,
      салями,
      грибы.
    </div>
  </div>
  <div class="card-buttons">
    <button class="button button-primary button-add-cart">
      <span class="button-card-text">В корзину</span>
      <span class="button-cart-svg"></span>
    </button>
    <strong class="card-price-bold">510 ₽</strong>
  </div>
</div>`];

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
function createCardRestaurants(i) {
  cardsRestaurants.insertAdjacentHTML('beforeend', restaurantsArr[i]);
}

function createCardGood(i) {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', goodsArr[i]);
  cardsMenu.insertAdjacentElement('beforeend', card);
}

function initializeGoods() {
  for (let i = 0; i < goodsArr.length; i++) {
    createCardGood(i);
  }
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

      initializeGoods();
    } else {
      toogleModalAuth();
    }
  }

}

function initializeRestaurants() {
  for (let i = 0; i < restaurantsArr.length; i++) {
    createCardRestaurants(i);
  }
}

initializeRestaurants();

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