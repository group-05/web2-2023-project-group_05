import { getAllCategories, readAllTopics, deleteOneTopic, updateOneTopic } from '../../model/topic';
import { getAuthenticatedUserAdmin } from '../../utils/auths';
import Navigate from '../Router/Navigate';

const TopicView = async () => {
  
  const viewTopic = `
  <section class="hero">
  <div class="hero-text">
  <div id="topicWrapper"></div>
  </div>
  </section>
  `;

  const main = document.querySelector('main');
  main.innerHTML = viewTopic;

  const topicWrapper = document.querySelector('#topicWrapper');

  const [topics, categories] = await Promise.all([readAllTopics(), getAllCategories()]);

  const topicAsHtmlTable = getHtmlTopicTableAsString(topics, categories);

  topicWrapper.innerHTML = topicAsHtmlTable;

  attachEventListeners();

};


function getHtmlTopicTableAsString(topics, categories) {
  
  if (!Array.isArray(topics) || topics.length === 0) {
    return '<p class=p-5> No topics yet : (</p>';
  }
  

  const htmlTopicTable = `
    <div class="table-responsive p-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <!-- Ajoutez une nouvelle colonne pour le bouton de chat -->
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${topics
            .map(
              (element) => `
                <tr>
                  <td class="fw-bold text-info">${element.title}</td>
                  <td class="text-info">${element.description}</td>
                  <td class="text-info">${element.category}</td>
                  <td>
                    <button type="button" class="btn btn-info chat" data-element-id="${element.id}">Chat</button>
                  </td>
                </tr>
                <span class="error"></span>
              `,
            )
            .join('')}
        </tbody>
      </table>
    </div>`;

    const categoryOptions = categories.map(category => category.title);

    const htmlTopicTableForAdmin = `
    <div class="table-responsive p-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${topics
            .map(
              (element) => `
                <tr>
                  <td class="fw-bold text-info" contenteditable="true">${element.title}</td>
                  <td class="text-info" contenteditable="true">${element.description}</td>
                  <td class="text-info" contenteditable="true">
                    <select class="category-dropdown" data-element-id="${element.category}">
                      ${categoryOptions
                        .map(
                          (categoryOption) => `
                            <option value='${categoryOption}' ${element.category === categoryOption ? "selected" : " "}>${categoryOption}</option>
                          `
                        )
                        .join('')}
                    </select>
                  </td>
                  <td>
                    <button type="button" class="btn btn-info delete" data-element-id="${element.id}">Delete</button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-info update" data-element-id="${element.id}">Save</button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-info chat" data-element-id="${element.id}">Chat</button>
                  </td>
                </tr>
                <span class="error"></span>
              `,
            )
            .join('')}
        </tbody>
      </table>
    </div>`; 

    if (getAuthenticatedUserAdmin()) {
      return htmlTopicTableForAdmin;
    }

  return htmlTopicTable;
}

function attachEventListeners() {
  const topicWrapper = document.querySelector('#topicWrapper');
  const span = document.querySelector('.error');

  // Ajoutez un gestionnaire d'événements pour les boutons de suppression
  topicWrapper.querySelectorAll('.delete').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { elementId } = e.target.dataset;
      
      try {
        await deleteOneTopic(elementId);
        TopicView();
      } catch (error) {
        console.error(error);
        span.innerHTML = error.message;
      }
    });
  });

  // gestionnaire d'événements pour les boutons de chat
  topicWrapper.querySelectorAll('.chat').forEach((button) => {
    button.addEventListener('click', async () => {
      

      Navigate(`/chat`);
    });
  });

  // les boutons de mise à jour
  topicWrapper.querySelectorAll('.update').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { elementId } = e.target.dataset;

      const topicRow = e.target.parentElement.parentElement;

      const newTopicData = {
        title: topicRow.children[0].innerText,
        description: topicRow.children[1].innerText,
        category: topicRow.querySelector('.category-dropdown').value,
      };
      await updateOneTopic(elementId, newTopicData);
      TopicView();
    });
  });
}

export default TopicView;

/*
**************************************************************************************
*    Title: <
getHtmlTopicTableAsString
  >
*    Author: <Baroni>
*    Date: <15/12/2023>
*    Code version: <code version>
*    Availability: <https://github.com/e-vinci/js-exercises/tree/main>

***************************************************************************************
*/