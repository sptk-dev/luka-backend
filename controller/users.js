const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("./../core/db");
const httpMsgs = require("./../core/httpMsgs");
const util = require("util");
// var http = require("httpsss");

("use strict");
var func = require("./lib/function");

router.post("/getUser", (req, res) => {
  let v = req.body;
  func.getUser(v).then((v) => {
    res.json(v);
  });
});

router.post("/MsaveUserLog", (req, res) => {
  let v = req.body;
  func.saveuserlog(v).then((v) => {
    res.json(v);
  });
});

router.get("/getuserlogin/:id", (req, res) => {
  let body_parameter = req.params.id;
  console.log(body_parameter);
  const obj = { userid: body_parameter };
  res.json(obj);
});



router.get("/getuserlogin/:id", (req, res) => {
  let body_parameter = req.params.id;
  console.log(body_parameter);
  const obj = { userid: body_parameter };
  res.json(obj);
});



router.post("/getNotiList", (req, res) => {
  let v = req.body;
  func.getNotiList(v).then((resp) => {
    res.json(resp);
  });
});

module.exports = router;
