const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Hardcoded credentials
const VALID_USERNAME = 'Suyash.12585@stu.upes.ac.in';
const VALID_PASSWORD = 'yourpassword'; // Change this to your real password

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files (HTML, images, video)
app.use(express.static(path.join(__dirname)));

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    res.cookie('loggedin', '1', { httpOnly: false });
    return res.json({ success: true });
  } else {
    return res.json({ success: false, message: 'Wrong username or password.' });
  }
});

// Protect dashboard.html
app.get('/dashboard.html', (req, res, next) => {
  if (req.cookies && req.cookies.loggedin === '1') {
    return next();
  } else {
    return res.redirect('/index.html');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 