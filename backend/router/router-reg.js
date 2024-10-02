const express = require('express');
const router = express.Router();

const authController = require('../controller/reg-controller');
const signupSchema = require("../validators/reg-validator");
const validate = require("../middleware/validate-middleware");
const auth_middle = require("../middleware/validator-user"); 

router.get('/home', authController.home);
router.post('/login', authController.login);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/user").get(auth_middle,authController.user);

module.exports = router;
