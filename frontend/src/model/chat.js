import { getAuthenticatedUser } from '../utils/auths';

const readAllMessages = async () => {
  try {
    const res = await fetch('/api/chats');
    const messages = await res.json();
    return messages;
  } catch (err) {
    console.error('readAllMessages::error: ', err);
    throw err;
  }
};

const addOneMessage = async (message) => {
  try {
    const authenticatedUser = getAuthenticatedUser();
    const options = {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authenticatedUser.token,
      },
    };

    const response = await fetch(`/api/chats`, options);

    const createdMessage = await response.json();

    return createdMessage;
  } catch (err) {
    console.error('addOneMessage::error: ', err);
    throw err;
  }
};

export { readAllMessages, addOneMessage };
/*
**************************************************************************************
*    Title: <
Login Page
  >
*    Author: <Chat GPT>
*    Date: <15/12/2023>
*    Code version: <code version>
*    Availability: <https://github.com/e-vinci/js-exercises/tree/main>

***************************************************************************************
*/
