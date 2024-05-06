const express = require("express");
const router = express.Router();

const mysqlConnection = require("../conection/conection");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  mysqlConnection.query(
    "SELECT OD.id, OD.codcliente, C.nombre, C.telefono, OD.comentario, OD.solucion, OD.create_at, OD.dateup_at, OD.`status` FROM orden_de_servicios OD INNER JOIN client C ON OD.codcliente = C.idCliente AND DATE_FORMAT(OD.create_at, '%m') = '05' ORDER BY OD.id DESC  ",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});
router.get("/ords", (req, res) => {
  mysqlConnection.query(
    "SELECT COUNT(id) AS orden FROM orden_de_servicios where status != 0 ",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/getIdOrden/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM  orden_de_servicios WHERE codcliente =? and status !=0",
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

router.get("/getByOrden/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT  ORD.id ,ORD.comentario,ORD.solucion,DATE_FORMAT(ORD.create_at, '%d-%m-%Y')AS fecha_creacion,DATE_FORMAT(ORD.dateup_at, '%d-%m-%Y') AS fecha_solucion, c.idCliente,c.nombre, c.direccion, ORD.`status` from orden_de_servicios ORD INNER JOIN client c ON c.idCliente = ORD.codcliente WHERE ORD.id =?",
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

router.post("/postOrdens", (req, res) => {
  const { codcliente, comentario } = req.body;
  mysqlConnection.query(
    "INSERT INTO orden_de_servicios(codcliente,comentario) VALUES(?,?)",
    [codcliente, comentario],
    (err, rows, fields) => {
      if (!err) {
        const { codcliente } = req.body;

        mysqlConnection.query(
          "SELECT id FROM  orden_de_servicios WHERE codCliente=?;",
          [codcliente],
          (err, rows, fields) => {
            if (!err) {
              if (rows.length > 0) {
                //res = json(data)
                res.json(rows);
              } else {
                res.json(rows);
              }
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});
router.put("/putOrdens", (req, res) => {
 
  const { codcliente, comentario,fecha,status } = req.body;
  mysqlConnection.query(
    "UPDATE orden_de_servicios SET codcliente=?, solucion=?, dateup_at=?, status=? WHERE codcliente=?",
    [codcliente, comentario,fecha,status, codcliente],
    (err, rows, fields) => {
      if (!err) {
        const { codcliente } = req.body;

        mysqlConnection.query(
          "SELECT id FROM  orden_de_servicios WHERE codCliente=?;",
          [codcliente],
          (err, rows, fields) => {
            if (!err) {
              if (rows.length > 0) {
                //res = json(data)
                res.json(rows);
              } else {
                res.json(rows);
              }
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
