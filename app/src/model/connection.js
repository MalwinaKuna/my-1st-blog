const mysql = require('mysql'); 
const connection = mysql.createConnection({
    host: 'localhost',
    port: '43306',
    user: 'root',
    password: 'Secret123',
    database: 'new_schema_23_07'
});

