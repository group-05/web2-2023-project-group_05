import { clearPage, renderPageTitle } from '../../utils/render';
import { getRememberMe, setRememberMe } from '../../utils/auths';


import { loginUser } from '../../model/users';
import Navigate from '../Router/Navigate';
import image from '../../img/login-image.png';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Login');
  renderLoginForm();
  checkUser();
};

function checkUser(){
  const form = document.querySelector('#loginForm');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const span = document.querySelector('.error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      await loginUser(username.value, password.value)
      Navigate('/');
    } catch (error) {

      console.error(error);
      
      span.innerHTML = error.message; 
    }
  })
}

function renderLoginForm() {
  const main = document.querySelector('main');

  main.innerHTML = `
  <section class="hero" >
  <div id="loginForm">
    <form>
    <p>Tu souhaites lancer ou rejoindre un débat ? Connecte-toi !</p>
      <input type="text" id="username" placeholder="Nom d'utilisateur" required class="form-control mb-3">
      <input type="password" id="password" placeholder="Mot de passe" required class="form-control mb-3">
      <input id="login-button" type="submit" value="Se connecter" class="btn btn-danger">
      </form>
  </div>
  <div id="login"><img id="loginImage" src="${image}" data-uri="#"></div>
    <span class="error"></span>
  </section>
  `; 
  
  const formCheckWrapper = document.createElement('div');
  formCheckWrapper.className = 'mb-3 form-check';

  const rememberme = document.createElement('input');
  rememberme.type = 'checkbox';
  rememberme.className = 'form-check-input';
  rememberme.id = 'rememberme';
  const remembered = getRememberMe();
  rememberme.checked = remembered;
  rememberme.addEventListener('click', onCheckboxClicked);

  const checkLabel = document.createElement('label');
  checkLabel.htmlFor = 'rememberme';
  checkLabel.className = 'form-check-label';
  checkLabel.textContent = 'Remember me';

  const form = document.querySelector('#loginForm');
  
  formCheckWrapper.appendChild(rememberme);
  formCheckWrapper.appendChild(checkLabel);

  form.appendChild(formCheckWrapper);
  
}
function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}

export default LoginPage;
