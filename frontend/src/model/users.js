
import { setAuthenticatedUser } from '../utils/auths';

import Navigate from '../Components/Router/Navigate';

import Navbar from '../Components/Navbar/Navbar';


const addOneUser = async (user) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/api/auths/register', options);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const createdUser = await response.json();

    setAuthenticatedUser(createdUser);


    return createdUser;
  } catch (err) {
    console.error('addOneUser::error: ', err);
    throw err;
  }
};

async function loginUser(username, password) {

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, options);

  if (!response.ok) throw new Error('Invalid username or password');
  
  const authenticatedUser = await response.json();

  console.log('Authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  console.log("SETAUTHENTICATED",setAuthenticatedUser(authenticatedUser));

  Navbar();

  Navigate('/');
}


export { addOneUser, loginUser };
