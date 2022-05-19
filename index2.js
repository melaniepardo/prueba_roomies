// Paso 1
const url = require("url");
const http = require("http");
const fs = require("fs");
const axios = require("axios") //lo importé por si acaso
const { v4: uuidv4 } = require("uuid");
http
    .createServer(function (req, res) {
        const gastosJSON = JSON.parse(fs.readFileSync("gastos.json",
            "utf8"));
        const gastos = gastosJSON.gastos;
        if (req.url.startsWith("/GET") && req.method == "GET") {
            res.end(JSON.stringify(gastosJSON));
        }
        if (req.url.startsWith("/roommatePOST") && req.method == "POST") {
            let body;
            req.on("data", (payload) => {
                body = JSON.parse(payload); //debiera ser sin payload
            });
            req.on("end", () => {
                gastos = {
                    id: uuidv4().slice(30),
                    marca: body.marca,
                    modelo: body.modelo,
                    precio: body.precio,
                };
                gastos.push(gasto);
                fs.writeFileSync("gastos.json", //ojo gastos estaba con mayusc
                    JSON.stringify(gastosJSON));
                res.end();
            });
        }
        if (req.url.startsWith("/gasto PUT") && req.method == "PUT") {
            let body;
            req.on("data", (payload) => {
                body = JSON.parse(payload);
            });
            req.on("end", () => {
                gastosJSON.gastos = gastos.map((b) => {
                    if (b.id == body.id) {
                        return body;
                    }
                    return b;
                });
                fs.writeFileSync("gastos.json", //ojo gastos estaba con mayusc
                    JSON.stringify(gastosJSON));
                res.end();
            });
        }
        // Paso 2
        if (req.url.startsWith("/gasto DELETE") && req.method == "DELETE") {
            // Paso 3
            const { id } = url.parse(req.url, true).query;
            // Paso 4
            bicicletasJSON.bicicletas = bicicletas.filter((b) => b.id !== id);
            // Paso 5
            fs.writeFileSync("Bicicletas.json",
                JSON.stringify(bicicletasJSON));
            res.end();
        }
    })
    .listen(3000);
