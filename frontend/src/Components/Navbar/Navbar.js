import logo from '../../img/IMAGE.png';
// eslint-disable-next-line no-unused-vars
import searchIcon from '../../img/rechercher.png';

import { getAuthenticatedUser, isAuthenticated, getAuthenticatedUserAdmin } from '../../utils/auths';


const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {

  const authenticatedUserName = getAuthenticatedUser();

  const unauthenticatedUser = `
<div class="logo-container">
  <a href="#" data-uri="/">
    <img class="logo" src="${logo}" data-uri="/">
  </a>
  <a id="lgc" href="#" data-uri="/">La grande critique</a>

</div>



<div class="navlist-container">

  <ul class="navlist">

  <li>
    <a class="nav-link" href="#" data-uri="/">Accueil</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/topic/view">Voir tous les sujets</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/categories/view">Voir les catégories</a>
  </li>

  <li id="loginItem" class="nav-item">
    <a class="nav-link" href="#" data-uri="/login">Connexion</a>
  </li>

  <li id="registerItem" class="nav-item">
    <a class="nav-link" href="#" data-uri="/register">Inscription</a>
    </li>

  </ul>

      </div>
  </div>
</nav>
  `;


  const authenticatedUser = `
  
<div class="logo-container">
  <a class="nav-link" href="#" data-uri="/">
    <img class="logo" src="${logo}" data-uri="/">
  </a>
  <a id="lgc" href="#" data-uri="/">La grande critique</a>

  </div>


<div class="navlist-container">

  <ul class="navlist">

  <li>
    <a class="nav-link" href="#" data-uri="/">Accueil</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/topic/view">Voir tous les sujets</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/topic/add">Crée un sujet</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/topicMyViews">Mes sujets</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/chat">Chat</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/categories/view">Voir les catégories</a>
  </li>

  <li class="nav-item">
    <a class="nav-link" href="#" data-uri="/logout">Se déconnecter</a>
  </li>  

  <li class="nav-item" >
    <a id="usernameConnected" class="nav-link disabled" href="#">Bonjour ${authenticatedUserName?.username} !</a>
  </li>  

  </ul>

      </div>
  </div>
</nav>
  `;

  const authenticatedUserAsAdmin = `
  
<div class="logo-container">
  <a class="nav-link" href="#" data-uri="/">
    <img class="logo" src="${logo}" data-uri="/">
  </a>
  <a id="lgc" href="#" data-uri="/">La grande critique</a>

</div>



<div class="navlist-container">

  <ul class="navlist">

  <li>
    <a class="nav-link" href="#" data-uri="/">Accueil</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/topic/view">Voir tous les sujets</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/topic/add">Crée un sujet</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/topicMyViews">Mes sujets</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/chat">Chat</a>
  </li>

  <li>
    <a class="nav-link" href="#" data-uri="/categories/view">Voir les catégories</a>
  </li>

  <li id="loginItem" class="nav-item">
    <a class="nav-link" href="#" data-uri="/category/add">Crée une catégorie</a>
  </li>

  <li class="nav-item">
    <a class="nav-link" href="#" data-uri="/logout">Se déconnecter</a>
  </li>  

  
  <li class="nav-item">
    <a class="nav-link disabled" href="#">${authenticatedUserName?.username}</a>
  </li>  
  
  </ul>

      </div>
  </div>
</nav>
  `;

  const navbar = document.querySelector('#navbarWrapper');

  if (getAuthenticatedUserAdmin()) {
    navbar.innerHTML = authenticatedUserAsAdmin;
  }  

  else if (isAuthenticated() && !getAuthenticatedUserAdmin()) {
    navbar.innerHTML = authenticatedUser;
  } 

  else if (!isAuthenticated()) {
    navbar.innerHTML = unauthenticatedUser;
  } 

}

export default Navbar;