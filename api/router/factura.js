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

router.get("/facts", (req, res) => {
  mysqlConnection.query(
    "SELECT COUNT(nofactura) AS factura FROM facturas WHERE status_s != 0",
    (err, rows, fields) => {
      if (!err) {
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
    "SELECT nofactura,monto,DATE_FORMAT(fecha_s, '%d-%m-%Y') as fecha ,DATE_FORMAT(fecha_v, '%d-%m-%Y') as vence,DATE_FORMAT(fecha_p, '%d-%m-%Y') as fpago, status_s FROM facturas WHERE codcliente = ? AND status_s != 10 ORDER BY fecha_s DESC",
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
    "SELECT c.nombre,c.direccion,c.telefono, f.nofactura,f.monto,DATE_FORMAT(f.fecha_s, '%d-%m-%Y') as fecha ,DATE_FORMAT(f.fecha_v, '%d-%m-%Y') as vence,DATE_FORMAT(f.fecha_p, '%d-%m-%Y') as fpago, status_s FROM facturas f INNER JOIN client c ON c.idCliente = f.codcliente WHERE nofactura = ? AND status_s != 10 ORDER BY fecha_s DESC",
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
  const { nombre, ip, status } = req.body;
  mysqlConnection.query(
    "INSERT INTO temp(nombre,ip,status) VALUES(?,?,?)",
    [nombre,ip,status],
    (err, rows, fields) => {
      if (!err) {
        const {idCliente, act } = req.body;
       
        mysqlConnection.query(
          "UPDATE client SET idCliente=?,act=? WHERE idCliente=?;"
          ,
          [idCliente,act,idCliente],
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
router.put("/putfactura", (req, res) => {
  const { fecha,status,usuario_id,nofactura } = req.body;
  mysqlConnection.query(
    "UPDATE facturas SET fecha_p=?, status_s=?, usuario_id=? WHERE nofactura=?",
    [fecha,status,usuario_id,nofactura],
    (err, rows, fields) => {
      if (!err) {
        const {nofactura } = req.body;
       
        mysqlConnection.query(
          "SELECT * FROM facturas WHERE nofactura=?;"
          ,
          [nofactura],
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

router.get("/getIdTotal/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT COUNT(codcliente) as totalfactura, SUM(monto) AS totalmonto FROM  facturas WHERE codcliente =?",
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
router.get("/getIdOrden/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM  orden_de_servicios WHERE codcliente =?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
        console.log(res);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
