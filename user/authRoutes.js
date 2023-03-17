const { Router } = require("express");
const authController = require("./authController");


const router = Router();

// Sign up routes
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
// Log in routes
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
// Log out routes
router.get("/logout", authController.logout_get);

module.exports = router;