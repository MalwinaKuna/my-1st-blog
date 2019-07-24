const mysql = require('mysql'); 

const connection = mysql.createConnection({
    host: 'localhost',
    port: '53306',
    user: 'root',
    password: 'Secret123',
    database: 'new_db'
});

module.exports=connection;
