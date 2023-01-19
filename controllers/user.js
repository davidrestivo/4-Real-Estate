
const { User } = require("../models/User");

// CREATE new user

  exports.createNewUser = async (req, res) =>{
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      req.session.save(() => {
        req.session.loggedIn = true;

        res.status(200).json(newUser);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  // login
  exports.userLogin = async (req, res) => {
    try {
      const userLogin = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!userLogin) {
        res
          .status(400)
          .json({ message: "Incorrect email or password. Please try again!" });
        return;
      }

      const validPassword = await userLogin.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: "Incorrect email or password. Please try again!" });
        return;
      }

      req.session.save(() => {
        req.session.loggedIn = true;

        res
          .status(200)
          .json({ user: userLogin, message: "You are now logged in!" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  // Logout
  exports.userLogout = async (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  }

// module.exports = router;

