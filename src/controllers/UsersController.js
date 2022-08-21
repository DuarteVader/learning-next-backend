const db = require("../database/models");



module.exports = {
  async getAllUsers(req,res) {
    try {
      const users = await db.User.findAll();

      return res.status(200).json({ msg: "All users!",users });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: "Server error.", err });
    }
  },

  async store(req, res) {
    const {
      userType,
      userName,
      userPassword,
      userEmail,
    } = req.body

    if (
      res.locals.user.userType !== 999 &&
      (userType === 999 || res.locals.user.userType >= userType)
    ) {
      return res.status(401).json({ msg: 'Access denied.' })
    } else if (userPassword === '') {
      return res.status(400).json({ msg: 'Password field is empty.' })
    }

    const checkUser = await db.User.findOne({ where: { userEmail } })

    if (checkUser)
      return res.status(400).json({ check: false, msg: 'User already exists.' })

    const passwordCrypt = await generateCryptPassword(userPassword)

    const user = await db.User.create({
      userType,
      userName,
      userPassword: passwordCrypt,
      userEmail,
    })
    return res.json({ check: true, msg: 'User created.', user })
  },
};