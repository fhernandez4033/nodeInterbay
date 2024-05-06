const express = require("express");
const router = express.Router();

const mysqlConnection = require("../conection/conection");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * from user", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});
router.get("/users", (req, res) => {
  mysqlConnection.query(
    "SELECT COUNT(id) AS users FROM user where status != 0",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/singin", (req, res) => {
  const { email, pass } = req.body;
  mysqlConnection.query(
    "SELECT id,nombre,email,rol FROM user where email=? and pass=?",
    [email, pass],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          let data = JSON.stringify(rows[0]);
          const token = jwt.sign(data, "smr");
          res.json({ token });
        } else {
          res.json("Usuario o clave incorrectos");
        }
      } else {
        console.log(err);
      }
    }
  );
});

router.post('/test',varifyTonken, (req,res) =>{
    res.json('Informacion Correcta');
})
function varifyTonken(req,res,next) {
    if (!req.headers.authorization) return res.status(401).json('No autorizado');

const token = req.headers.authorization.substr(7);

if (token !=='') {
    const conten = jwt.verify(token, 'smr')
    req.data = conten;
    next(); 
}else{
    res.status(401).json('Token no autorizado');
}
}

module.exports = router;
