const express = require("express");

const {
  generateRoadmap,
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/roadmap",
  generateRoadmap
);

module.exports = router;