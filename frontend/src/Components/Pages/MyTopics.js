import { readAllTopics, deleteOneTopic, updateOneTopic, getAllCategories } from '../../model/topic';
import { getAuthenticatedUser } from '../../utils/auths';

const MyTopics = async () => {
  const viewTopic = `
  <section class="hero">
  <div class="hero-text">
  <div id="topicWrapper"></div>
  </div>
  </section>
  `;

  const main = document.querySelector('main');
  main.innerHTML = viewTopic;

  if(getAuthenticatedUser() === undefined) {
    
    const section = document.querySelector('section');

    section.innerHTML+= '<p> tes pas co</p>'
    return;
} 


  const topicWrapper = document.querySelector('#topicWrapper');
  const x = await readAllTopics();
  const user = getAuthenticatedUser().username;
  const y = [];
  x.forEach((e) => 
    {
        console.log(e)
        if(e.user===user) y.push(e)
    }
    )
    console.log(y)
  const [topics, categories] = await Promise.all([y, getAllCategories()]);

  const topicAsHtmlTable = getHtmlTopicTableAsString(topics, categories);

  topicWrapper.innerHTML = topicAsHtmlTable;

  attachEventListeners();
};

function getHtmlTopicTableAsString(topics, categories) {
  if (!Array.isArray(topics) || topics.length === 0) {
    return '<p class=p-5> No topics yet : (</p>';
  }

  if(getAuthenticatedUser() === undefined) return '<p>tu est pas connecter</p>'

  const categoryOptions = categories.map(category => category.title);

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

  return htmlTopicTable;
}

function attachEventListeners() {
  const topicWrapper = document.querySelector('#topicWrapper');
  const span = document.querySelector('.error');

  topicWrapper.querySelectorAll('.delete').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { elementId } = e.target.dataset;
      
      try {
      await deleteOneTopic(elementId);
      MyTopics();
    } catch (error) {
      console.error(error);
      
      span.innerHTML = "error.message"; 
    }

    });
  });


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
      MyTopics();
    });
  });
}

export default MyTopics;