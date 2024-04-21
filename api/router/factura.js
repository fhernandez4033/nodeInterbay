const express = require("express");
const router = express.Router();

const mysqlConnection = require("../conection/conection");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM facturas WHERE status_s != 0 ",
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

router.get("/getfactura/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT nofactura,monto,DATE_FORMAT(fecha_s, '%d-%m-%Y') as fecha ,DATE_FORMAT(fecha_v, '%d-%m-%Y') as vence,DATE_FORMAT(fecha_p, '%d-%m-%Y') as fpago FROM facturas WHERE codcliente = ? AND status_s != 10 ORDER BY fecha_s DESC",
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
router.get("/getIdFactura/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT c.nombre,c.direccion,c.telefono, f.nofactura,f.monto,DATE_FORMAT(f.fecha_s, '%d-%m-%Y') as fecha ,DATE_FORMAT(f.fecha_v, '%d-%m-%Y') as vence,DATE_FORMAT(f.fecha_p, '%d-%m-%Y') as fpago FROM facturas f INNER JOIN client c ON c.idCliente = f.codcliente WHERE nofactura = ? AND status_s != 10 ORDER BY fecha_s DESC",
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

router.post("/temp", (req, res) => {
  const { codcliente, nofactura, monto, token:any } = req.body;

  mysqlConnection.query(
    "INSERT INTO temp(codcliente,factura,monto,token) VALUES(?,?,?,?)",
    [codcliente, nofactura, monto,token],
    (err, rows, fields) => {
      if (!err) {
        
        mysqlConnection.query(
          "SELECT  codcliente,factura,SUM(monto) as monto, token from temp WHERE codcliente = ? and token= ?",
          [codcliente,token],
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
