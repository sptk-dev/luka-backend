const db = require("../../core/db")
const httpMsgs = require("../../core/httpMsgs")


exports.check_token = function (req, res,reqBody) {
    try {
        let data = JSON.parse(reqBody)
        //s console.log(data);
         if (typeof data.buffer_code !== 'undefined' ){
            // httpMsgs.sendJson(req, res, data)
             var sql = "SELECT * FROM tb_token where "
                sql += " buffer_code='" + data.buffer_code + "'"
                
                db.executeMySql(sql, function (data, err) {
                    if (err) {
                        httpMsgs.show500(req, res, err)
                    }
                    else if (data.length == 0) {
                        httpMsgs.show204(req, res)
                    }
                    else {
                      //ss  console.log(data);
                        httpMsgs.sendJson(req, res, data)
                       // res.json(data)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browsers
                    }
                });

         }else{
            httpMsgs.show400(req, res)
         }

    }  catch (ex){
        httpMsgs.show500(req, res, err)
    }    
    
}


exports.add_token = function (req, res,reqBody) {
try {
    let data = JSON.parse(reqBody)
    //console.log(data);
    if (typeof data.buffer_code !== 'undefined' &&  data.token_code !== 'undefined'
    &&  data.token_type !== 'undefined'  &&  data.timeout !== 'undefined'&&  data.date_create !== 'undefined'
    &&  data.date_modify !== 'undefined' &&  data.token_expiredate !== 'undefined' ){
       // httpMsgs.sendJson(req, res, data)
   var sql = "insert into tb_token(token_code,token_type,"
       sql += "buffer_code,timeout,date_create,date_modify,"
       sql += "token_expiredate,token_description)"   
       sql += " VALUES('" + data.token_code + "','" + data.token_type + "',"
       sql += "'" + data.buffer_code + "','" + data.timeout + "','" + data.date_create + "','" + data.date_modify + "',"
       sql += "'" + data.token_expiredate + "','" + JSON.stringify(data.token_description) + "')"

       /*  Demo   {
               "token_code": "ssdfmakfmaslkfmsa",
               "token_type": "cust_regis",
               "buffer_code": "sdfmkfmalskfmas",
               "timeout": "30",
               "date_create": "2019-12-01 00:00:00",	
               "date_modify": "2019-12-01 00:00:00",
               "token_expiredate":"2019-12-01 00:30:00",
               "token_description" : {
                   "email":"abc@gmail.com",
                   "password":"password"
               }
           }*/
           
           console.log(sql);
           db.executeMySql(sql, function (data, err) {
               if (err) {
                   httpMsgs.show500(req, res, err)
               }
               else {
                   httpMsgs.show201(req, res)
               }
           })

    }else{
       httpMsgs.show400(req, res)
    }
    
}  catch (ex){
    httpMsgs.show500(req, res, err)
} 
     
}
