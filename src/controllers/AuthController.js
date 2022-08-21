const db = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordAuthenticator = async (passwordSend, user) => {
  console.log("user", user);
  const { userPassword } = user;

  return bcrypt.compareSync(passwordSend, userPassword);
};

// const generateCryptPassword = async (password) => {
//   const salt = 10

//   return bcrypt.hashSync(password, salt)
// }

const generateToken = async (id) => {
  const token = jwt.sign(id , process.env.SECRET_KEY);

  return token;
};

module.exports = {
  async auth(req, res) {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({
        where: {
          userEmail: email
        }
      });

      if (!user) return res.status(400).json({ msg: "User not found." });

      if (!(await passwordAuthenticator(password, user)))
        return res.status(400).json({ msg: "Invalid password." });

      const token = await generateToken(user.id);

      return res.status(200).json({ msg: "Login successful.",token, user });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: "Server error.", err });
    }
  },
  
  async getUserByToken(req, res) {
    try {
      const { token } = req.headers
      // console.log(token)
      const userInfo = jwt.decode(token)

      const user = await db.User.findByPk(userInfo.id)

      return res.status(200).json({ token: token, user: user })
    } catch (e) {
      console.log(e)

      return res.status(500).json({ message: 'Erro interno no servidor!' })
    }
  },
};