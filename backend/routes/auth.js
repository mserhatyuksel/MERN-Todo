const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    // Generate new password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    // Save user and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    // Check username
    const user = await User.findOne({ username: req.body.username });
    if(!user){
		res.status(404).json("User not found!");
		return;
	}

    // Check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if(!validPassword){
		res.status(400).json("Incorrect username or password!");
		return;
	}

    res.status(200).json("Giriş başarılı!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
