const express = require("express");
const router = express.Router();
// const passport = require('passport');
const db = require("../../core/db");
const httpMsgs = require("../../core/httpMsgs");
const jwt = require("jsonwebtoken");
const key = require("../../conf/keys");
const jwt_decode = require("jwt-decode");
const moment = require("moment");
// const util = require("util")
// var http = require("http");
// "use strict"

function Padder(len, pad) {
  if (len === undefined) {
    len = 1;
  } else if (pad === undefined) {
    pad = "0";
  }

  var pads = "";
  while (pads.length < len) {
    pads += pad;
  }

  this.pad = function (what) {
    var s = what.toString();
    return pads.substring(0, pads.length - s.length) + s;
  };
}

module.exports.getprefix_ng = function getprefix_ng() {
  var today = new Date();
  var dd = today.getDate();
  var mm = ("0" + (today.getMonth() + 1)).slice(-2);
  var yyyy = today.getFullYear();
  const year = today.getFullYear().toString();
  var rs = year + "" + mm;
  return rs;
};

function getprefix() {
  var today = new Date();
  var dd = today.getDate();
  var mm = ("0" + (today.getMonth() + 1)).slice(-2);
  var yyyy = today.getFullYear();
  const year = today.getFullYear().toString();
  var rs = year + "" + mm;
  return rs;
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.random_buffercode = function random_buffercode(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

async function load_suffix_postjob() {
  const obj_await = await await_load_suffix_postjob();
  return obj_await;
}

function await_load_suffix_postjob() {
  return new Promise((resolve, reject) => {
    try {
      // get order between start month and end month
      var sql =
        " select count(*) as c  from op_jobtransaction where date_create  BETWEEN  ";
      sql +=
        " DATE_ADD(LAST_DAY(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)), INTERVAL 1 DAY) AND LAST_DAY(CURRENT_DATE()); ";
      var current_suffix,
        n_suffix,
        cn_suffix = 0;
      console.log(sql);
      db.executeMySql(sql, function (data_suffix, err) {
        if (err) {
          resolve(err);
        } else if (data_suffix.length == 0) {
          current_suffix = 0;
          n_suffix = new Padder(6);
          cn_suffix = n_suffix.pad(current_suffix + 1); // "0012"
          const resp = { ok: true, message: "success", suffix: cn_suffix };
          resolve(resp);
        } else {
          current_suffix = data_suffix[0].c;
          n_suffix = new Padder(6);
          cn_suffix = n_suffix.pad(current_suffix + 1); // "0012"
          const resp = { ok: true, message: "success", suffix: cn_suffix };
          resolve(resp);
        }
      });
    } catch (error) {
      const resp = { ok: false, message: "error", data: ax };
      resolve(resp);
    }
  });
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.load_suffix_ng = async function load_suffix_ng() {
  const obj_await = await await_load_suffix_ng();
  return obj_await;
};

function await_load_suffix_ng() {
  return new Promise((resolve, reject) => {
    try {
      // get order between start month and end month
      var sql =
        " select count(*) as c  from op_ng_entry where create_date  BETWEEN  ";
      sql +=
        " DATE_ADD(LAST_DAY(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)), INTERVAL 1 DAY) AND LAST_DAY(CURRENT_DATE()); ";
      var current_suffix,
        n_suffix,
        cn_suffix = 0;
      console.log(sql);
      db.executeMySql(sql, function (data_suffix, err) {
        if (err) {
          resolve(err);
        } else if (data_suffix.length == 0) {
          current_suffix = 0;
          n_suffix = new Padder(6);
          cn_suffix = n_suffix.pad(current_suffix + 1); // "0012"
          const resp = { ok: true, message: "success", suffix: cn_suffix };
          resolve(resp);
        } else {
          current_suffix = data_suffix[0].c;
          n_suffix = new Padder(6);
          cn_suffix = n_suffix.pad(current_suffix + 1); // "0012"
          const resp = { ok: true, message: "success", suffix: cn_suffix };
          resolve(resp);
        }
      });
    } catch (error) {
      const resp = { ok: false, message: "error", data: ax };
      resolve(resp);
    }
  });
}


/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.getNotiList = async function getNotiList(data) {
  const resp = await fa_getNotiList(data);
  return resp;
};


function fa_getNotiList(data) {
  return new Promise((resolve, reject) => {
    try {
      var sql =" SELECT * FROM pushnotifylog   AS logs "+
      "LEFT JOIN msrefrigerator AS mac ON  logs.macid = mac.code  AND logs.msorganisationuid = mac.msorganisationuid "+
      "WHERE "+
      "logs.deviceid = '"+data.deviceToken+"' "+
      "AND "+
      "logs.userid = '"+data.uid+"' "+
      "order by logs.uid desc LIMIT 10";
      console.log(sql);
      db.executePG_global(sql, function (rs_dat, err) {
        console.log("xx", rs_dat);
        if (err) {
          let resp = { ok: false, message: err };
          // throw resp;
          resolve(resp);
        } else if (rs_dat.length == 0) {
          let resp = { ok: false, message: "no data" };
          resolve(resp);
        } else {
          let resp = { ok: true, message: "success", data: rs_dat };
          resolve(resp);
        }
      });
    } catch (eror) {
      let resp = { ok: false, message: error.message };
      resolve(resp);
    }
  });
}


/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.saveuserlog = async function saveuserlog(data) {
  const chk_user_online = await fa_checkuseronline(data);
  var resp = null ;
  if(chk_user_online.ok == true){
    // const  fa_updatelog = await fa_log_updatelog(chk_user_online.data[0]);
    // resp  =  fa_updatelog
  }else{
    const  fa_createlog = await fa_log_createlog(data);
    resp  =  fa_createlog
  }
  return resp;
};



function fa_log_createlog(data) {
  return new Promise((resolve, reject) => {
    try {
      // " SELECT * FROM loginlog WHERE useruid = '"+data.uid+"' AND deviceid = '"+data.token+"' "+
      // " AND platfrom = '"+data.pfid+"' and statuslogin = 'Online' and fromapp='LUKA'  ";
      var sql =
        " insert into loginlog(useruid,deviceid,platfrom,statuslogin,fromapp,cwhen)  "+ 
        " VALUES('"+data.uid+"','"+data.token+"','"+data.pfid+"','Online','LUKA',CURRENT_TIMESTAMP" 
      console.log(sql);
      db.executePG_global(sql, function (rs_dat, err) {
        if (err) {
          let resp = { ok: false, message: err };
          resolve(resp);
        } else if (rs_dat.length == 0) {
          let resp = { ok: false, message: "no data" };
          resolve(resp);
        } else {
          let resp = { ok: true, message: "success", data: rs_dat };
          resolve(resp);
        }
      });
    } catch (eror) {
      let resp = { ok: false, message: error.message };
      resolve(resp);
    }
  });
}



function fa_log_updatelog(data) {
  return new Promise((resolve, reject) => {
    try {
      
      resolve(data.uid);
      var sql =
        "  ";
      console.log(sql);
      db.executePG_global(sql, function (rs_dat, err) {
        if (err) {
          let resp = { ok: false, message: err };
          // throw resp;
          resolve(resp);
        } else if (rs_dat.length == 0) {
          let resp = { ok: false, message: "no data" };
          resolve(resp);
        } else {
          let resp = { ok: true, message: "success", data: rs_dat };
          resolve(resp);
        }
      });
    } catch (eror) {
      let resp = { ok: false, message: error.message };
      resolve(resp);
    }
  });
}


function fa_checkuseronline(data) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        " SELECT * FROM loginlog WHERE useruid = '"+data.uid+"' AND deviceid = '"+data.token+"' "+
        " AND platfrom = '"+data.pfid+"' and statuslogin = 'Online' and fromapp='LUKA'  ";
      console.log(sql);
      db.executePG_global(sql, function (rs_dat, err) {
        if (err) {
          let resp = { ok: false, message: err };
          // throw resp;
          resolve(resp);
        } else if (rs_dat.length == 0) {
          let resp = { ok: false, message: "no data" };
          resolve(resp);
        } else {
          let resp = { ok: true, message: "success", data: rs_dat };
          resolve(resp);
        }
      });
    } catch (eror) {
      let resp = { ok: false, message: error.message };
      resolve(resp);
    }
  });
}


/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.getUser = async function getUser(data) {
  const resp = await fa_getUser(data);
  return resp;
};

function fa_getUser(data) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        " SELECT * FROM  msuser where username = '" +
        data.username +
        "' and password_normal = '" +
        data.password +
        "'";
      console.log(sql);
      db.executePG_global(sql, function (rs_dat, err) {
        console.log("xx", rs_dat);
        if (err) {
          let resp = { ok: false, message: err };
          // throw resp;
          resolve(resp);
        } else if (rs_dat.length == 0) {
          let resp = { ok: false, message: "no data" };
          resolve(resp);
        } else {
          let resp = { ok: true, message: "success", data: rs_dat };
          resolve(resp);
        }
      });
    } catch (eror) {
      let resp = { ok: false, message: error.message };
      resolve(resp);
    }
  });
}

module.exports.postjob_transaction = async function postjob_transaction(
  data,
  auth
) {
  const prefix = await getprefix();
  const suffix = await load_suffix_postjob();
  console.log(prefix);
  console.log(suffix.suffix);

  const ax = await await_load_job(data);
  // console.log("DataAX", ax);
  if (ax.ok === true) {
    try {
      const a1 = await await_create_postjob(
        data,
        auth,
        ax.data,
        prefix,
        suffix.suffix
      );
      const a2 = await await_create_jobloss(data, auth, a1);
      const u_a1 = await await_for_update_u1(auth, ax.data);
      const resp = {
        ok: true,
        message: "Posted Job Tracnsaction",
        data: { data1: a1, data2: a2, data3: ax, data4: u_a1 },
      };
      return resp;
    } catch (error) {
      const resp = {
        ok: false,
        message: "error",
        data: error,
      };
      return resp;
    }
  } else {
    const resp = { ok: false, message: "No Machine For Plan", data: ax };
    return resp;
  }
};

function await_for_update_u1(auth, data) {
  return new Promise((resolve, reject) => {
    try {
      // console.log(data)
      var sql =
        "update op_planning_import set flaq_success='1' , " +
        " user_update ='" +
        auth.data.username +
        "' , date_update = CURRENT_TIMESTAMP() where xid = '" +
        data.xid +
        "'  ";
      //  console.log(sql)
      db.executeMySql(sql, function (rs_data, err) {
        if (err) {
          var response = { ok: false, message: "error", data: err };
          resolve(response);
        } else if (rs_data.length == 0) {
          var response = { status: "204", message: "No Content" };
          resolve(response);
        } else {
          let data_x = { ok: true, message: "success", data: rs_data };
          resolve(data_x);
        }
      });
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
}

function await_load_job(data) {
  return new Promise((resolve, reject) => {
    try {
      console.log("await_load_job", data);

      let date_x = moment(data.dop).format("YYYY-MM-DD");
      // var date_x_add1 = moment(data.dop).add(1, "day").format("YYYY-MM-DD");
      // console.log(b)
      var sql =
        "select xid,mcno,partid,partprocess,manno from op_planning_import where " +
        " mcno='" +
        data.mc_code.text +
        "' and partprocess='" +
        data.part_code.text +
        "' and effect_date = '" +
        date_x +
        "' and flaq_success = 0 and shift = '" +
        data.shift_of +
        "' limit 1";
      console.log(sql);
      db.executeMySql(sql, function (rs_data, err) {
        if (err) {
          var response = { ok: false, message: "error", data: err };
          resolve(response);
        } else if (rs_data.length == 0) {
          var response = { status: "204", message: "No Content" };
          resolve(response);
        } else {
          let data_x = { ok: true, message: "success", data: rs_data[0] };
          resolve(data_x);
        }
      });
      // resolve(data);
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
}

function await_create_postjob(data, auth, ax, prefix, suffix) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        "insert into op_jobtransaction(job_prefix,job_suffix,job_order,job_route,job_ct,job_start_time," +
        "job_end_time,job_pause_time,job_total_time,job_qty_target," +
        "job_qty_good,job_qty_ng,job_qty_total,job_wc," +
        "job_mc,trans_shift,trans_type,item_id," +
        "item_code,status_id,status_code,date_create," +
        "date_update,user_create,user_update,user_xid,emp_code,emp_name,shift,act_time) values" +
        "('" +
        prefix +
        "','" +
        suffix +
        "','" +
        data.job_no +
        "','','','" +
        data.time_std.start_time +
        "'," +
        "'" +
        data.time_std.end_time +
        "','" +
        data.time_pause +
        "','','" +
        data.target +
        "'," +
        "'" +
        data.good_pcs +
        "','" +
        data.ng_pcs +
        "','" +
        data.total_wpcs +
        "','" +
        ax.manno +
        "'," +
        "'" +
        data.mc_code.text +
        "','','PD','" +
        data.part_code.id +
        "','" +
        data.part_code.text +
        "','1','ACTIVE',CURRENT_TIMESTAMP()," +
        "CURRENT_TIMESTAMP(),'" +
        auth.data.name +
        "','" +
        auth.data.name +
        "','" +
        auth.data.userId +
        "','" +
        data.empcode +
        "','" +
        data.empname +
        "','" +
        data.shift_of +
        "','" +
        data.act_fac_min +
        "')";

      console.log(sql);
      db.executeMySql(sql, function (rs_data, err) {
        if (err) {
          var response = { ok: false, message: "error", data: err };
          resolve(response);
        } else if (rs_data.length == 0) {
          var response = { status: "204", message: "No Content" };
        } else {
          // console.log('create_postjob',rs_data)
          let data_x = { ok: true, message: "success", data: rs_data };
          resolve(data_x);
        }
      });
    } catch (error) {
      resolve(error);
    }
  });
}

function await_create_jobloss(data, auth, postJobData) {
  return new Promise((resolve, reject) => {
    try {
      // console.log(auth.data.user)
      // console.log(postJobData)

      var sql =
        "insert into op_joblosstime(job_order,job_route,loss_id,loss_code," +
        "item_id,item_code,status_id,status_code," +
        "date_create,date_update,user_create,user_update," +
        "user_xid,jobtran_xid,act_time) values" +
        "";
      let data_length = data.LossDetail.length;
      let cc = 1;
      data.LossDetail.forEach((element) => {
        // console.log("element", element);
        sql +=
          "('" +
          data.job_no +
          "','','" +
          element.losscode +
          "','" +
          element.name +
          "'," +
          "'" +
          data.part_code.id +
          "','" +
          data.part_code.text +
          "','1','ACTIVE'," +
          "CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP(),'" +
          auth.data.username +
          "','" +
          auth.data.username +
          "'," +
          "'" +
          auth.data.userId +
          "','" +
          postJobData.data.insertId +
          "','" +
          element.act_time +
          "')";
        if (data_length <= cc) {
          sql += ";";
        } else {
          sql += ",";
        }
        cc++;
      });
      db.executeMySql(sql, function (rs_data, err) {
        if (err) {
          var response = { ok: false, message: "error", data: err };
          resolve(response);
        } else if (rs_data.length == 0) {
          var response = { status: "204", message: "No Content" };
        } else {
          // console.log('create_postjob',rs_data)
          let data_x = { ok: true, message: "success", data: rs_data };
          resolve(data_x);
        }
      });
      // resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.user_jwt_decode = async function user_jwt_decode(data) {
  const resp = await await_user_jwt_decode(data);
  return resp;
};

function await_user_jwt_decode(data) {
  return new Promise((resolve, reject) => {
    try {
      var token = data;
      var decoded = jwt_decode(token);
      // console.log(decoded);
      var decodedHeader = jwt_decode(token, { header: true });
      // console.log(decodedHeader);
      var resp = { ok: true, message: "success", data: decoded };
      resolve(resp);
    } catch (error) {
      var resp = { ok: false, message: "error", data: error };
      resolve(resp);
    }
  });
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.getstdworktime = async function getstdworktime(data) {
  const resp = await await_getstdworktime(data);
  return resp;
};

function await_getstdworktime(data) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        " select * from  ma_std_worktime where  ( N_shift = '" +
        data.shift +
        "'  and  std_type='STD' ) ";
      data.ot === true
        ? (sql +=
            "  or ( std_type = 'OT' and N_shift = '" + data.shift + "' ) ")
        : (sql += "");

      db.executeMySql(sql, function (data_res, err) {
        if (err) {
          var resp = { ok: false, message: "Error", data: err };
          resolve(resp);
        } else if (data_res.length == 0) {
          let data_x = {
            ok: false,
            message: "nodata",
          };
          resolve(data_x);
        } else {
          if (data.ot === false) {
            var result_q = {
              start_time: data_res[0].start_time,
              end_time: data_res[0].stop_time,
              total_min: data_res[0].total_min,
              total_hr: data_res[0].total_hr,
            };
          } else if (data.ot === true) {
            let t_min = data_res[0].total_min + data_res[1].total_min;
            let t_hr = data_res[0].total_hr + data_res[1].total_hr;

            var result_q = {
              start_time: data_res[0].start_time,
              end_time: data_res[1].stop_time,
              total_min: t_min,
              total_hr: t_hr,
            };
          }
          let data_x = { ok: true, message: "success", data: result_q };
          resolve(data_x);
        }
      });
    } catch (error) {
      let resp = { ok: false, message: error };
      resolve(resp);
    }
  });
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.getiteminfo = async function getiteminfo(item_pp) {
  const resp = await await_getiteminfo(item_pp);
  return resp;
};

function await_getiteminfo(item_pp) {
  return new Promise((resolve, reject) => {
    try {
      var sql = "select * from ma_items where itm_code ='" + item_pp + "'";
      db.executeMySql(sql, function (data_res, err) {
        if (err) {
          var resp = { ok: false, message: "Error", data: err };
          resolve(resp);
        } else if (data_res.length == 0) {
          let data_x = {
            ok: false,
            message: "nodata",
          };
          resolve(data_x);
        } else {
          let data_x = { ok: true, message: "success", data: data_res };
          resolve(data_x);
        }
      });
    } catch (error) {
      let data_x = { ok: false, message: "error", data: error };
      resolve(data_x);
    }
  });
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.load_history = async function load_history() {
  const resp = await await_load_history();
  return resp;
};

function await_load_history() {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        "select plan_group,date_create,effect_date,count(*) as count_row from  " +
        " op_planning_import  group by plan_group";
      db.executeMySql(sql, function (data_res, err) {
        if (err) {
          var resp = { ok: false, message: "Error", data: err };
          resolve(resp);
        } else if (data_res.length == 0) {
          let data_x = {
            ok: false,
            message: "nodata",
          };
          resolve(data_x);
        } else {
          let data_x = { ok: true, message: "success", data: data_res };
          resolve(data_x);
        }
      });
    } catch (error) {
      let data_x = { ok: false, message: "error", data: error };
      resolve(data_x);
    }
  });
}
/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.load_historybyGroupId = async function load_historybyGroupId(
  data
) {
  const resp = await await_load_historybyGroupId(data);
  return resp;
};

function await_load_historybyGroupId(data) {
  return new Promise((resolve, reject) => {
    var sql =
      "select * from  " +
      " op_planning_import where plan_group ='" +
      data +
      "'";
    db.executeMySql(sql, function (data_res, err) {
      if (err) {
        var resp = { ok: false, message: "Error", data: err };
        resolve(resp);
      } else if (data_res.length == 0) {
        let data_x = {
          ok: false,
          message: "nodata",
        };
        resolve(data_x);
      } else {
        let data_x = { ok: true, message: "success", data: data_res };
        resolve(data_x);
      }
    });
  });
}
/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.check_plan_clear = async function check_plan_clear(data) {
  const resp = await await_check_plan_clear(data);
  return resp;
};

function await_check_plan_clear(data) {
  return new Promise((resolve, reject) => {
    var sql =
      "select xid,mcno,partid,partprocess,manno,zone,date_create,date_update,user_create from  " +
      "op_planning_import where plan_group ='" +
      data +
      "' and flaq_success = '0'";
    db.executeMySql(sql, function (data_res, err) {
      if (err) {
        var resp = { ok: false, message: "Error", data: err };
        resolve(resp);
      } else if (data_res.length == 0) {
        let data_x = { ok: true, message: "plan ถูกปิดหมดแล้ว" };
        resolve(data_x);
      } else {
        let data_x = {
          ok: false,
          message: "มี plan ที่ยังไม่ได้ปิด",
          data: data_res,
        };
        resolve(data_x);
      }
    });
  });
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.check_planning_group = async function check_planning_group(
  data
) {
  const resp = await await_load_planning(data);
  return resp;
};

function await_load_planning(data) {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT plan_group from  op_planning_import WHERE XID = (SELECT MAX(XID) from op_planning_import)";
    db.executeMySql(sql, function (data_res, err) {
      if (err) {
        var resp = { ok: false, message: "Error", data: err };
        resolve(resp);
      } else if (data_res.length == 0) {
        var resp = {
          ok: false,
          message: "No Content ",
          data: sql,
          data_rs: data_res,
        };
        resolve(resp);
      } else {
        let data_x = { ok: false, message: "success", data: data_res };
        resolve(data_x);
      }
    });
  });
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.get_userdetal = async function get_userdetal(data) {
  const call_userdetail = await load_userdetail(data);
  return call_userdetail;
};

function load_userdetail(data) {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.get_userlogin = async function get_userlogin(data) {
  const call_user = await load_user(data);
  return call_user;
};

function load_user(data) {
  return new Promise((resolve, reject) => {
    //resolve(data)
    var sql =
      "select * from  ma_users where user_username='" +
      data.Username +
      "' and user_password='" +
      data.Password +
      "'";
    db.executeMySql(sql, function (data_res, err) {
      if (err) {
        var resp = { status: 504, message: "Error", data: err };
        resolve(resp);
      } else if (data_res.length == 0) {
        var resp = {
          status: 204,
          message: "No Content ",
          data: sql,
          data_rs: data_res,
        };
        resolve(resp);
      } else {
        const payload = {
          userId: data_res[0].user_id,
          name: data_res[0].user_name,
          lastname: data_res[0].user_lastname,
          id_card: data_res[0].user_id_card,
          username: data_res[0].user_username,
        };
        // console.log(payload);
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: "12h" },
          (err, token) => {
            console.log(token);
            var resp = { ok: true, message: "Success", token: token };
            resolve(resp);
          }
        );
      }
    });
  });
}

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */

module.exports.create_item = async function create_item(data) {
  // const call_user = await load_user(data);
  const call_user = data;
  return call_user;
};

/* -----------------------------  */
/* -----------------------------  */
/* -----------------------------  */
