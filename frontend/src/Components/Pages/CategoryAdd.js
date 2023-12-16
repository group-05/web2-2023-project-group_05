import Navigate from '../Router/Navigate';
import { createCategory } from '../../model/categories';



const CategoriesAdd = () => {
  const addCategorie = `
  <section class="hero">
  <form class="px-5" enctype="multipart/form-data">
    <div class="mb-3">
      <label for="nameCategorie">Enter le nom pour la categorie.</label>
      <input
        class="form-control"
        type="text"
        name="title"
        id="title"
        required
      />
    </div>
    <input type="submit" class="btn btn-primary" value="Add Categorie" />
</form>  
</section>
    `;

  const mainCategorieAdd = document.querySelector('main');
  mainCategorieAdd.innerHTML = addCategorie;

  const myForm = document.querySelector('.px-5');

  const title = document.querySelector('#title');
  


  myForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const categorieToBeCreated = {
      title: title.value,
    };
    
    createCategory(categorieToBeCreated);

    Navigate('/categories/view');
  });
};

export default CategoriesAdd;

