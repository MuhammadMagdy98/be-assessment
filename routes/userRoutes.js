const { Router } = require("express");
const validateSignUp = require("../middlewares/validateSignUp");
const signup = require("../controllers/signup");
const login = require("../controllers/login");
const verifySignup = require("../controllers/verifySignup");
const authenticate = require("../middlewares/auth");
const {addCheck, removeCheck} = require("../controllers/checks");

const router = Router();

router.post("/signup", validateSignUp, signup);

router.post("/login", login);

router.get("/verify/:token", verifySignup);

router.post("/check/add", authenticate, addCheck);

router.post("/check/remove", authenticate, removeCheck);

module.exports = router;
