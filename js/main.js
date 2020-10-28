"use strict";
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

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toogleModalAuth() {
  modalAuth.classList.toggle('is-open');
  hideLoginError();
  hidePasswordError();
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

function createCardRestaurants() {
  const card = `
        <a class="card card-restaurant">
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
        </a>
        `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
						<img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image" />
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
						</div>
  `);
  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  console.dir(restaurant);

  if (restaurant) {
    cardsMenu.textContent = '';

    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

    createCardGood();
    createCardGood();
    createCardGood();
    createCardGood();
  }

}

createCardRestaurants();
createCardRestaurants();
createCardRestaurants();

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