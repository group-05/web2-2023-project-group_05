// eslint-disable-next-line import/extensions
import { getAuthenticatedUser } from '../../utils/auths';
import { readAllMessages, addOneMessage } from '../../model/chat';
import Navigate from '../Router/Navigate';

const authenticatedUser = getAuthenticatedUser(); // Déplacez la déclaration ici

console.log('Authenticated User:', authenticatedUser);

const refreshMessages = async () => {
  const messagesContainer = document.getElementById('messages');

  // Vérifiez si messagesContainer est non nul avant d'accéder à innerHTML
  if (messagesContainer) {
    const currentMessages = messagesContainer.innerHTML;

    // Chargez les messages existants
    const messages = await readAllMessages();
    const newMessagesHtml = messages
      .map(
        (msg) => `<div>[${msg.timestamp}] ${msg.username} : ${msg.message}</div>`
      )
      .join('');

    // Comparez les messages actuels avec les nouveaux messages
    if (currentMessages !== newMessagesHtml) {
      messagesContainer.innerHTML = newMessagesHtml;
    }
  }
};

const Chat = async () => {

  if (!authenticatedUser) {
    Navigate('/login');
    return;
  }

  if (getAuthenticatedUser() === undefined) {
    Navigate('/login');
    return;
  }
  const viewChat = `
    <section id="ChatForm" class="hero centered">
      <div class="hero-text">
        <div id="chatWrapper" class="chat-container">
          <div id="chat">
            <div id="messages">
              <!-- Les messages seront affichés ici -->
            </div>
            <form id="formulaire">
              <input type="text" id="message" placeholder="Entrez votre message ici">
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  const main = document.querySelector('main');
  main.innerHTML = viewChat;

  // Chargez les messages existants lors du chargement de la page
  const messages = await readAllMessages();
  const messagesContainer = document.getElementById('messages');

  messages.forEach((msg) => {
    const newMessage = document.createElement('div');
    newMessage.textContent = `[${msg.timestamp}] ${msg.username} : ${msg.message}`;
    messagesContainer.appendChild(newMessage);
  });

  const formulaire = document.getElementById('formulaire');
  formulaire.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message');

    const { username } = authenticatedUser;
    const message = messageInput.value;

    if (message.trim() !== '') {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

      // Utilisez la fonction d'ajout de message du modèle de chat
      // eslint-disable-next-line no-unused-vars
      const newMessage = await addOneMessage({ username, message, timestamp: formattedDate });

      const newMessageElement = document.createElement('div');
      newMessageElement.textContent = `[${formattedDate}] ${username} : ${message}`;
      messagesContainer.appendChild(newMessageElement);

      messageInput.value = '';
    }
  });

  const scrollToBottom = () => {
    // Faites défiler vers le bas en utilisant la propriété scrollTop
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Appelez scrollToBottom après le chargement initial des messages
  scrollToBottom();

  // Configurez l'intervalle de rafraîchissement (par exemple, toutes les 5 secondes)
  setInterval(refreshMessages, 5000);
};

export default Chat;