const Chat = async () => {
  const viexChat = `
  <section class="hero">
  <div class="hero-text">
  <div id="chatWrapper"></div>
  </div>
  </section>
  `;

  const main = document.querySelector('main');
  main.innerHTML = viexChat;
};

export default Chat;