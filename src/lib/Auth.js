import { setItem, getItem } from './Storage';
var jwt = require('jsonwebtoken');

export const isAuthenticated = () => {
  let token = getItem('token');
  let verify = verifyToken(token);
  return verify;
};

export const setLogin = (state) => {
  let privateKey = getPrivateKey();

  let token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * getMinutesExp()),
    login: state.login,
  }, privateKey);

  setItem('token', token);
};

const verifyToken = (token) => {
  let privateKey = getPrivateKey();
  return jwt.verify(token, privateKey, function(err, decoded) {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
}

const getPrivateKey = () => {
  return process.env.REACT_APP_PRIVATE_KEY_JWT;
}

const getMinutesExp = () => {
  let minutos = 1;
  return minutos;
}
