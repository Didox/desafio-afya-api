const userRepository = require('../../services/Login');
const JwtToken = require('../../helpers/jwtToken');
const bcrypt = require('../../helpers/bcrypt');

async function auth(req, res) {
  const { login, password } = req.body;
  try {
    const user = await userRepository.getOne({ login });
    if (user && bcrypt.compare(password, user.password)) {
      delete user.password;
      user.token = JwtToken.makeToken(user);
      return res.status(201).json(user);
    }
    return res.send({
      message: 'Login ou senha inválidos',
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = { auth };
