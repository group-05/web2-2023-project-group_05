import anime from 'animejs/lib/anime.es';
import Navigate from '../Router/Navigate';
import { addOneTopic, getAllCategories } from '../../model/topic';
import { getAuthenticatedUser } from '../../utils/auths';

const TopicAdd = () => {
  if (getAuthenticatedUser() === undefined) {
    
    Navigate('/login');
    return;
  }

  const addTopic = `
  <section class="hero">
  <div id="rules">
    <h3>Reglement :</h3>
  <button if="divForRule" class="buttonForRule">Cliquer ici pour afficher le réglement</button>
  <div class="rule">
  </div>
  <form class="px-5" enctype="multipart/form-data">
    <div class="mb-3">
      <label for="nameTopic">Enter le nom pour le sujet</label>
      <input
        class="form-control"
        type="text"
        name="title"
        id="title"
        required
      />
    </div>
    <div class="mb-3">
      <label for="description">Entrez une brève description du sujet</label>
        <textarea
            class="form-control"
            name="description"
            id="description"
            required
        ></textarea>
    </div>
    <div class="mb-3">
  <label for="categorie">Choisissez une catégorie :</label>
  <select class="form-control" name="categorie" id="categorie" required>
    <!-- Options de catégories seront ajoutées dynamiquement ici par JavaScript -->
  </select>
</div>

    <input type="submit" class="btn btn-primary" value="Add Topic" />
</form>  
</div>
</section>
    `;

  const mainTopicAdd = document.querySelector('main');
  mainTopicAdd.innerHTML = addTopic;

  const myForm = document.querySelector('.px-5');

  const title = document.querySelector('#title');
  const description = document.querySelector('#description');
  // eslint-disable-next-line no-unused-vars
  const categorie = document.querySelector('#categorie');

  const buttonRule = document.querySelector('.buttonForRule');

  let messageIsVisible = false;
  const messageRule = document.querySelector('.rule');
  const message = `
  <section>
  <div class="navlist-container">
  <div class="hero-text">

  <h2>    Règlement de Création de Sujets </h2> 

    <p>    Nom du Sujet :
        Veuillez attribuer un titre approprié, clair et pertinent au sujet. Évitez les titres trompeurs ou sensationnalistes. Ils doivent être en rapport avec le contenu du sujet et respecter les normes de décence et de courtoisie. </p>

    <p>   Contenu Inapproprié :
        Tout sujet, commentaire ou contenu associé ne doit pas promouvoir la haine, le racisme, la discrimination, la violence, ou enfreindre de quelque manière que ce soit les lois en vigueur. Le contenu offensant ou inapproprié sera supprimé. </p>

    <p>    Respect de la Communauté :
        Respectez les autres membres de la communauté. Les discussions animées et les opinions divergentes sont autorisées, mais elles doivent rester respectueuses et constructives. </p>

    <p>    Droits d'Auteur :
        Veillez à respecter les droits d'auteur. Ne publiez pas de contenu sans l'autorisation nécessaire ou sans mentionner la source si requis.</p>

    <p>    Publicité et Spam :
        Évitez toute forme de spam ou de publicité non sollicitée. La promotion excessive de produits, services ou liens externes est interdite.</p>

    <p>    Sujets Répétitifs :
        Avant de créer un nouveau sujet, assurez-vous qu'un sujet similaire n'existe pas déjà. Évitez de créer des sujets redondants ou dupliqués.</p>

    <p>    Titres et Contenu Sensationnalistes :
        Les titres et le contenu ne doivent pas être exagérés ou utilisés à des fins sensationnalistes. Restez fidèle au sujet et évitez les informations fausses ou trompeuses.</p>

    <p>    Modération et Respect des Règles :
        Tout sujet ne respectant pas ces règles peut être édité, déplacé ou supprimé par l'équipe de modération. En cas de non-respect répété, des mesures disciplinaires pourront être prises</p>
        </div>
        </div>

        </section>
        `;

        buttonRule.addEventListener('click', () => {
          const paragraphs = document.querySelectorAll('.rule p');
        
          if (messageIsVisible) {
            anime({
              targets: paragraphs,
              opacity: 0,
              translateY: '-20px',
              easing: 'easeInOutQuad',
              duration: 500,
              complete: () => {
                messageRule.innerHTML = ''; // Efface le contenu du message
                messageIsVisible = false; // Change l'état à "non visible"
              },
            });
          } else {
            messageRule.innerHTML = message; // Affiche le message
        
            anime({
              targets: paragraphs,
              opacity: [0, 1],
              translateY: ['20px', '0'],
              easing: 'easeInOutQuad',
              duration: 500,
              complete: () => {
                messageIsVisible = true; // Change l'état à "visible"
              },
            });
          }
        });

  const updateCategoryDropdown = async () => {
    // Récupérer la liste des catégories depuis votre API ou base de données
    const categories = await getAllCategories(); // Assurez-vous d'implémenter cette fonction dans votre modèle

    // Sélectionner l'élément de la liste déroulante
    const categoryDropdown = document.getElementById('categorie');

    // Effacer les options existantes
    categoryDropdown.innerHTML = '';

    // Ajouter les nouvelles options basées sur les catégories récupérées
    categories.forEach((category) => {
      const option = document.createElement('option');

      // Vérifier si la catégorie est une chaîne de caractères
      const categoryTitle = category.title;

      option.value = categoryTitle;
      option.textContent = categoryTitle;
      categoryDropdown.appendChild(option);
    });
  };

  myForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const caca = document.querySelector('#categorie');
    const x = getAuthenticatedUser().username;

    const topicToBeCreated = {
      title: title.value,
      description: description.value,
      categorie: caca.value,
      user: x,
    };

    addOneTopic(topicToBeCreated);

    Navigate('/topic/view');
  });

  updateCategoryDropdown();
};

export default TopicAdd;

/*
**************************************************************************************
*    Title: <
updateCategoryDropdown
  >
*    Author: <Baroni>
*    Date: <15/12/2023>
*    Code version: <code version>
*    Availability: <https://github.com/e-vinci/js-exercises/tree/main>

***************************************************************************************
*/