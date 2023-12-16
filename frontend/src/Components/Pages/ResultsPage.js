import { clearPage, renderPageTitle } from '../../utils/render';
import { readAllTopics } from '../../model/topic';
import Navigate from '../Router/Navigate';

const ResultsPage = () => {
    clearPage();
    renderPageTitle('Results');
    renderResults();
};

const mainResults = document.querySelector('main');
const sectionResults = document.createElement('section');
sectionResults.className = "hero";
const p = document.createElement('p');
const p2 = document.createElement('p');

async function renderResults() {
    const form = document.querySelector('#searchForm');
    const search = document.querySelector('#mySearch');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        Navigate('/results');

        p.innerHTML = '';
        p2.innerHTML = '';

        const topics = await readAllTopics();

        const filteredTopics = filterTopics(search.value,topics);
        displayTopics(filteredTopics);
    });
};

function displayTopics(topics) {
    const search = document.querySelector('#mySearch');

    if(topics.length === 0) {
        p2.innerHTML = `Pas de résultats pour <b>${search.value}</b>`;
        console.log(topics);
    } else {
        p2.innerHTML = `Nombre de résultat(s) : ${topics.length}`;
    }

    topics.forEach((topic) => {
        const span = document.createElement('span');
        span.innerHTML = `${topic.title}<br>`;
        p.appendChild(span);
    });
    mainResults.appendChild(sectionResults);
    sectionResults.appendChild(p2);
    sectionResults.appendChild(p);
}

function filterTopics(searchTopic, topics) {
    return topics.filter((topic) => topic.title.toLowerCase().startsWith(searchTopic.toLowerCase()));
}
  
export default ResultsPage;