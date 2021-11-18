const express = require("express");
const router = express.Router();
const async = require("async");


router.get("/", async (req, res) => {
   res.render("index");
  });

  //Export
module.exports = router;