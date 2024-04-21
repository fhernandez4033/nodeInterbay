const express = require("express");
const router = express.Router();

const mysqlConnection = require("../conection/conection");

router.get("/", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM client WHERE STATUS != 0",
    (err, rows, fields) => {
      if (!err) {
        ///console.log(res);
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/getclient/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM client WHERE  STATUS != 0 and idCliente = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
