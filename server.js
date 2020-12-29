const express = require("express"); // เรียกใช้ Express
const app = express(); // สร้าง Object เก็บไว้ในตัวแปร app เพื่อนำไปใช้งาน
const bodyParser = require("body-parser");
var db = require("./conf/db");
const httpMsgs = require("./core/httpMsgs");

/* Master */
const users = require("./controller/users");
/* Master */


var basicAuth = require("basic-auth");

app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));

app.use(function (req, res, next) {
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    if (req.method === "OPTIONS") return res.send(200);
  }
  next();
});

// https://localhost/api/test/load_alldata
app.use("/api/lukaservice", users);


/** concern loop */
/*
var bauth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    httpMsgs.show401(req, res)
    console.log(htpMsgs.show401(req, res));
    
  }
  if (user.name === 'dev@inter' && user.pass === 'WjL6RJ84TMBRLWfShi6KPddM4VoXJsrN') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    httpMsgs.show401(req, res)
    console.log(htpMsgs.show401(req, res));
  }
}*/

const middleware = (req, res, next) => {
  /* ตรวจสอบว่า authorization คือ Boy หรือไม่*/
  //s console.log(req.headers);
  if (req.headers.authorization === "pjtessys") next();
  //อนุญาตให้ไปฟังก์ชันถัดไป
  else httpMsgs.show401(req, res);
};
//  Token Zone

//  Token Zone





/** close  concern loop */
app.get("/", (req, res) => {
  //เพิ่ม middleware ขั้นกลาง
  // httpMsgs.show200(req, res)
  res.json("Welcome to API");
});
/** do not concern loop */
app.get("/sp", (req, res) => {
  //เพิ่ม middleware ขั้นกลาง
  httpMsgs.show200(req, res);
});
/** close do not concern loop */

app.listen("5500", () => {
  //
  console.log("start port 5500");
});
