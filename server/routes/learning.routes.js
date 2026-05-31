const express = require("express");

const {
  generateHint,
  generatePseudocode,
} = require(
  "../controllers/learning.controller"
);

const router = express.Router();

router.post(
  "/hint",
  generateHint
);

router.post(
  "/pseudocode",
  generatePseudocode
);

module.exports = router;