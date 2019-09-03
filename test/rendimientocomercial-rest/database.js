var mysql = require('mysql');
var appEnv = require('./environments/environment');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: appEnv.db_host,
    user: appEnv.db_user,
    password: appEnv.db_password,
    database: appEnv.db_database,
    debug: false
});

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) return reject(err);
            resolve(connection);
        });
    });
};

query = (sqltext) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) return reject(err);
            connection.query(sqltext, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
            connection.release();
        });
    });
};

exports.getConnection = getConnection;
exports.query = query;
