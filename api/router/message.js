const express = require("express");
const router = express.Router();

const mysqlConnection = require("../conection/conection");

const jwt = require("jsonwebtoken");

router.get("/getMessage/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM  message WHERE id =? and status != 0",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
