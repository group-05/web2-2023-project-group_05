
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

    const response = await fetch(`${process.env.API_BASE_URL}/api/auths/register`, options);
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

  const response = await fetch(`${process.env.API_BASE_URL}/api/auths/login`, options);

  if (!response.ok) throw new Error('Invalid username or password');
  
  const authenticatedUser = await response.json();

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}


export { addOneUser, loginUser };

 /*
**************************************************************************************
*    Title: <
addOneUser, 
loginUser
  >
*    Author: <Baroni>
*    Date: <15/12/2023>
*    Code version: <code version>
*    Availability: <https://github.com/e-vinci/js-exercises/tree/main>

***************************************************************************************
*/