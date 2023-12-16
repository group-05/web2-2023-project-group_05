import { getAllCategories, readAllTopics } from '../../model/topic';
// eslint-disable-next-line no-unused-vars
import { getAuthenticatedUser, getAuthenticatedUserAdmin } from '../../utils/auths';

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

};

function getHtmlTopicTableAsString(topics, categories) {
  
  // if(getAuthenticatedUser() === undefined) return '<p>tes pas co</p>'

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
          </tr>
        </thead>
        <tbody>
          ${topics
            .map(
              (element) => `
                <tr>
                  <td class="fw-bold text-info" >${element.title}</td>
                  <td class="text-info" >${element.description}</td>
                    <td class="text-info" >${element.category}</td>
                  </td>
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

export default TopicView;