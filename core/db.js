const express = require("express"); // เรียกใช้ Express
const mysql = require("mysql"); // เรียกใช้ mysql
const settings = require("../setting");
const Sequelize = require("sequelize");

const { Pool, Client } = require("pg");
// const { placeholder } = require("sequelize/types/lib/operators");
const client = new Client({
  user: "postgres",
  host: "db1.telecorp.co.th",
  database: "L_Luka",
  password: "postgres@Telecorp2563",
  port: 5432,
});

const pool = new Pool({
  user: "postgres",
  host: "db1.telecorp.co.th",
  database: "L_Luka",
  password: "postgres@Telecorp2563",
  port: 5432,
});
// pool.query('SELECT NOW()', (err, res) => {
// console.log(err, res)

// })

// const mssql = require("mm")
//MySQL Setting
exports.executeMySql = function (sql, callback) {
  let ret = [];
  let conn = new mysql.createConnection(settings.dbConf_sanbox); // dbConfigMySql
  conn.connect();
  conn.query(sql, function (err, rows, fields) {
    if (!err) {
      callback(rows);
    } else {
      callback(null, err);
    }
  });
  conn.end();
};

//MySQL Setting
exports.executeMySql_global = function (sql, callback) {
  let conn = new mysql.createConnection(settings.dbConf_sanbox);
  conn.connect();
  conn.query(sql, function (err, rows, fields) {
    if (!err) {
      callback(rows);
    } else {
      callback(null, err);
    }
  });
  conn.end();
};

exports.executePG_global = function (sql, callback) {
  pool.query(sql, (error, results) => {
    try {
      if (error) {
        throw error;
      }
      callback(results.rows);
    } catch (error) {
      callback(null, error);
    }
  });
};
