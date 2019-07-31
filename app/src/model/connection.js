const mysql= require('mysql');
const connection= mysql.createConnection({
    
    host: 'localhost',
    port: '63306',
    user: 'root',
    password: 'Secret123',
    database: 'new_schema_blog'

});
module.exports=connection;