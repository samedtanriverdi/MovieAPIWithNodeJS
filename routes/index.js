var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Models

const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Movie API' });
});

/* GET home page. */
router.post('/register', (req, res, next) => {
  const { userName, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    const user = new User({
      userName,
      password: hash
    });

    user.save().then(data => {
      res.json(data);
    }).catch(err => {
      res.json(err);
    });
  });
});

router.post('/auth', (req, res, next) => {

  const { userName, password } = req.body;

  User.findOne({
    userName
  }).then(user => {

    if (!user) {
      res.json({
        errorCode: '01',
        message: 'userNotFound',
        payLoad: ''
      })
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const payLoad = {
            userName
          };
          const token = jwt.sign(payLoad, req.app.get('api_secret_key'), {expiresIn: 720 });

          res.json({
            errorCode: '00',
            message: '',
            payLoad: token
          })
        }
        else
          res.json({
            errorCode: '02',
            message: 'wrong password',
            payLoad: ''
          })
      });
    }
  }).catch(err => {
    res.json(err);
  })
});

module.exports = router;
