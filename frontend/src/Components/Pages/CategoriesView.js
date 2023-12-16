// eslint-disable-next-line no-unused-vars
import { readAllCategories, deleteCategory } from '../../model/categories';
import { getAuthenticatedUserAdmin } from '../../utils/auths';

let existingDialog = null;

const categoriesView = async () => {
    const viewCategorie = `
    <section class="hero">
    <div class="hero-text">
    <div id="categorieWrapper"></div>
    </div>
    </section>`;
  
    const main = document.querySelector('main');
    main.innerHTML = viewCategorie;
  
    const categorieWrapper = document.querySelector('#categorieWrapper');
  
    const categorie = await readAllCategories('title');
  
    const categorieAsHtmlTable = getHtmlCategorieTableAsString(categorie);
  
    categorieWrapper.innerHTML = categorieAsHtmlTable;

    const buttonsDelete = document.querySelectorAll('.deleteButton');

    buttonsDelete.forEach(async (button) => {
        if (getAuthenticatedUserAdmin()) {
            // eslint-disable-next-line no-param-reassign
            button.style.display = 'block'; // Rendre visible le bouton de suppression
            button.addEventListener('click', async () => {
               
                // eslint-disable-next-line prefer-destructuring
                const elementId = button.closest('td').dataset.elementId;
    
                
                // eslint-disable-next-line no-restricted-globals
                const userConfirmed = confirm('Voulez-vous vraiment supprimer cette catégorie?');
    
                if (userConfirmed) {
                   
                    try {
                        await deleteCategory(elementId);
                        await categoriesView();
                    } catch (error) {
                        console.error('Erreur lors de la suppression de la catégorie :', error);
                    }
                }
            });
        } else {
            // Si l'utilisateur n'est pas connecté
            // eslint-disable-next-line no-param-reassign
            button.style.display = 'none';
        }
    });


    const categorieElements = document.querySelectorAll('.categorie');

    categorieElements.forEach((categorieElement) => {
        categorieElement.addEventListener('click', () => {
            const title = categorieElement.getAttribute('data-title');

            // Vérifie si le dialogue existe déjà
            if (!existingDialog) {
                existingDialog = document.createElement('div');
                existingDialog.innerHTML = `
                    <p class="dialog-content">Tu as choisis <strong>${title}</strong>. Tu as le choix entre rejoindre un sujet déjà existant ou d'en créer un!</p>
                    <button id="rejoindreBtn" class="dialog-button">Rejoindre</button>
                    <button id="creerBtn" class="dialog-button">Créer</button>
                `;
                // affichage du dialog juste a coter de la categorie selectionner
                const rect = categorieElement.getBoundingClientRect();
                existingDialog.style.position = 'absolute';
                existingDialog.style.top = `${rect.top + window.scrollY}px`;
                existingDialog.style.left = `${rect.right + window.scrollX + 100}px`;
                existingDialog.style.color = `yellow`

                // Ajoute la boîte de dialogue à la page
                document.body.appendChild(existingDialog);

                // Ajoute des gestionnaires d'événements pour les boutons
                document.getElementById('rejoindreBtn').addEventListener('click', () => {
                    // Redirige vers la page de rejoindre un sujet déjà existant
                    window.location.href = '/topic/view';
                    document.body.removeChild(existingDialog); // Supprime la boîte de dialogue
                    existingDialog = null; // Réinitialise le dialogue
                });

                document.getElementById('creerBtn').addEventListener('click', () => {
                    // Redirige vers la page de création d'un nouveau sujet
                    window.location.href = '/topic/add';
                    document.body.removeChild(existingDialog); // Supprime la boîte de dialogue
                    existingDialog = null; // Réinitialise le dialogue
                });
            } else {
                // Met à jour le contenu du dialogue existant
                existingDialog.querySelector('.dialog-content').innerHTML = `Tu as choisis ${title}. Tu as le choix entre rejoindre un sujet déjà existant ou d'en créer un!`;
            }
        });
    });

    // Gestionnaire d'événements pour les liens de changem  ent de page
    const pageLinks = document.querySelectorAll('a'); // Modifiez le sélecteur selon votre structure HTML
    pageLinks.forEach((link) => {
        link.addEventListener('click', () => {
            // Supprime le dialogue existant avant de quitter la page
            if (existingDialog) {
                document.body.removeChild(existingDialog);
                existingDialog = null;
            }
        });
    });
};


  function getHtmlCategorieTableAsString(categorie){
    if(categorie?.length === undefined || categorie.length === 0){
      return "<p class=p-5> Pas de catégories pour l'instant :( </p>";
    }
    const htmlCategorieTable = `
    <div class="table-responsive p-5">
    <table class="table">
    <thead>
    <tr>
    <th scope = "col">Title</th>
    </tr>
    </thead>
    <tbody>
      ${categorie
        .map(
          (element) => `
          <tr>
           <td class="categorie" data-title="${element.title}"> <a href = "#">${element.title} </a></td>
           <td style="text-align: right" data-element-id="${element.id}"><button class="deleteButton">Supprimer</button></td>


          </tr>
          `,
        )
        .join('')}
        </tbody></table>`;

      
      return htmlCategorieTable;
  }

export default categoriesView;
