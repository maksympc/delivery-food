const LOCALSTORAGE = {
  LOGIN: 'supersecretfield#1'
}

let login = localStorage.getItem(LOCALSTORAGE.LOGIN);

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

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