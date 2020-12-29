//const settings = require("../settings")

exports.sendJson = function (req, res, data) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8"  })
    if (data) {
        res.write(JSON.stringify({ status: 200, message: "OK", data }))
        //res.write(JSON.stringify(data))
    }
    res.end()
}

exports.sendJson201 = function (req, res, data) {
    res.writeHead(201, { "Content-Type": "application/json; charset=utf-8"  })
    if (data) {
        res.write(JSON.stringify({ status: 201, message: "OK", data }))
        //res.write(JSON.stringify(data))
    }
    res.end()
}

exports.send200 = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' })
    res.end()
}

exports.show200 = function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 200, message: "OK" }))
    res.end()
}

exports.show201 = function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 201, message: "Created" }))
    res.end()
}


exports.show204 = function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 204, message: "No Content" }))
    res.end()
}

exports.show400 = function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 400, message: "Bad Request" }))
    res.end()
}

exports.show401 = function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 401, message: "Unauthorized" }))
    res.end()
}

exports.show404 = function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 404, message: "Not Found" }))
    res.end()
}

exports.show405 = function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 405, message: "Method not supported" }))
    res.end()
}

exports.show409 = function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 409, message: "Conflict" }))
    res.end()
}

exports.show413 = function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 413, message: "Request Entity Too Large" }))
    res.end()
}

exports.show500 = function (req, res, err) {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    res.write(JSON.stringify({ status: 500, message: "Internal Server Error " + err }))
    res.end()
}

// exports.showHome = function (req, res) {
//     res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
//     res.write(JSON.stringify({ status: 200, message: "OK" }))
//     res.end()
// }