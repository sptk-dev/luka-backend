const express = require('express') // เรียกใช้ Express
const mysql = require('mysql') // เรียกใช้ mysql
const settings = require('../setting')


//MySQL Setting
exports.executeMySql = function (sql, callback) {
    let conn = new mysql.createConnection(settings.dbConfigMySql)
    conn.connect()
    conn.query(sql, function (err, rows, fields) {
        if (!err) {
            callback(rows)
        }
        else {
            callback(null, err)
        }
    })
    conn.end()
}

//module.exports = db.connect();