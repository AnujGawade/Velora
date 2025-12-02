const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: 'User Already Exists! Please try again',
      });

    // Hash password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    // Create token for new user
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
        userName: newUser.userName,
        email: newUser.email,
      },
      'CLIENT_SECRET_KEY',
      { expiresIn: '60m' }
    );

    // Send response
    res
      .cookie('token', token, { httpOnly: true, secure: false })
      .status(200)
      .json({
        success: true,
        message: 'Registration Successful',
        user: {
          id: newUser._id,
          role: newUser.role,
          userName: newUser.userName,
          email: newUser.email,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred',
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please Register first",
      });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.json({
        success: false,
        message: 'Incorrect Password! Please try again',
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      'CLIENT_SECRET_KEY',
      { expiresIn: '60m' }
    );

    res.cookie('token', token, { httpOnly: true, secure: false }).json({
      success: true,
      message: 'Logged In Successfully',
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some Error Occurred',
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out successfully!',
  });
};

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Unauthorised user!',
    });

  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorised user!',
    });
  }
};
