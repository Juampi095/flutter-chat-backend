/*
    path:api/login
*/

const { Router, response } = require("express");
const {
  createUser,
  logIn,
  renewJWT,
} = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validateFields } = require("../middleware/validate-fields.middleware");
const { validateJWT } = require("../middleware/validate-jwt.middleware");

const router = Router();

router.post(
  "/new",
  //validaciones
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
  ],
  validateFields,
  createUser
);

router.post(
  "/",
  [
    check("password", "password is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
  ],
  logIn
);

router.get("/renew", validateJWT, renewJWT);

module.exports = router;
