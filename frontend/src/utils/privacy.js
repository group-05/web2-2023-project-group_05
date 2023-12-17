const privacyReadKey = 'privacyRead';

const setPrivacyRead = () => {
  localStorage.setItem(privacyReadKey, 'true');
};

const checkPrivacyRead = () => {
  if (localStorage.getItem(privacyReadKey) === 'true') {
    return true;
  }
  return false;
};

export { setPrivacyRead, checkPrivacyRead };


 /*
**************************************************************************************
*    Title: <
 setPrivacyRead, 
 checkPrivacyRead
  >
*    Author: <Baroni>
*    Date: <15/12/2023>
*    Code version: <code version>
*    Availability: <https://github.com/e-vinci/js-exercises/tree/main>

***************************************************************************************
*/