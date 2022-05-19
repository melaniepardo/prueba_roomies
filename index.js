// 1. Ocupar el módulo File System para la manipulación de archivos alojados en el
// servidor(3 Puntos)
const url = require("url")
const http = require("http")
const fs = require("fs")
const axios = require("axios")

http.createServer((req, res) => {
    if (req.url == "/" && req.method == "GET") {
        res.setHeader("content-type", "text/html")
        res.end(fs.readFileSync("index"))
    }
}).listen(3000, console.log("Server ON"))
