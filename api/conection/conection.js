const mysql = require('mysql')
const { promisify } = require('util')

const mysqlConnection = mysql.createConnection({
    host: 'smrosalia.com',
    user: 'smrosalia',
    password: 'elmoreno4033@',
    database: 'smrosalia_cobro',
    port: '3306'
});

mysqlConnection.connect( err => {
    if (err) {
        console.log('Error al conectarse');
        return;
    }else {
        console.log('BASE DE DATOS CONECTADA');
    }
});
mysqlConnection.query = promisify(mysqlConnection.query);
module.exports = mysqlConnection;