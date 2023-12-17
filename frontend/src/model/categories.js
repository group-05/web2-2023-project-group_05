import { getAuthenticatedUser } from "../utils/auths";

const readAllCategories = async () => {
    try {
        const response = await fetch('/api/categories/?order=title');
        const categories = await response.json();
        return categories;
    } catch (err) {
        console.error('getAllCategories::error', err);
        throw err;
    }
};

const deleteCategory = async (id) => {
  try {
    const authenticatedUser = getAuthenticatedUser();
      const response = await fetch(`/api/categories/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: authenticatedUser.token,
          },
      });

      if (!response.ok) {
          throw new Error(`Error deleting category: ${response.statusText}`);
      }

      const deletedCategory = await response.json();
      return deletedCategory;
  } catch (err) {
      console.error('deleteCategory::error', err);
      throw err;
  }
};

const createCategory = async (title) => {
    try {
      const authenticatedUser = getAuthenticatedUser();
      const options = {
        method: 'POST',
        body: JSON.stringify(title),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authenticatedUser.token,

        },
      };
  
      const response = await fetch(`/api/categories`, options);

      const createdCategories = await response.json();
      
      return createdCategories;

    } catch (err) {
      console.error('addOneCategorie::error: ', err);
      throw err;
    }
  };

export { readAllCategories, deleteCategory, createCategory } ;

/*
**************************************************************************************
*    Title: <
createCategory
  >
*    Author: <Chat GPT>
*    Date: <15/12/2023>
*    Code version: <code version>
*    Availability: <https://github.com/e-vinci/js-exercises/tree/main>

***************************************************************************************
*/
