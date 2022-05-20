// Paso 1 Se importan los modulosurl, http, fs, uuid
const url = require("url")
const http = require("http")
const fs = require("fs")
const axios = require("axios")
const { v4: uuidv4 } = require("uuid")
const { nuevoRoommate, guardarRoommate } = require("./roommates")


http//se crea un servidor con el módulo http.
    .createServer(function (req, res) {
        if (req.url == "/" && req.method == "GET") {
            res.setHeader("content-type", "text/html")
            res.end(fs.readFileSync("index.html"))
        }

        if (req.url.startsWith("/gastos") && req.method == "GET") {//Crear la ruta “/GET” tomando en consideración el método de consulta(GET).
            const gastosJSON = JSON.parse(fs.readFileSync("gastos.json",
                "utf8"))//se almacena en una variable la data del archivo gastos.json.
            res.end(JSON.stringify(gastosJSON));
        }

        if (req.url.startsWith("/roommates") && req.method == "GET") {//Crear la ruta “/GET” tomando en consideración el método de consulta(GET).
            const data = JSON.parse(fs.readFileSync("roommates.json",
                "utf8"))//se almacena en una variable la data del archivo gastos.json.
            res.end(JSON.stringify(data));
        }

        if (req.url.startsWith("/roommates") && req.method == "POST") {
            let gastosJSON = JSON.parse(fs.readFileSync("roommates.json",
                "utf8"))//se almacena en una variable la data del archivo gastos.json.
            let gastos = gastosJSON.gastos;
            let body;
            req.on("data", (payload) => {
                body = JSON.parse(payload); //debiera ser sin payload
            });
            req.on("end", () => {//Responder la consulta con la data en JSON
                gastos = {
                    id: uuidv4().slice(30),
                    roommate: body.roommate,
                    descripcion: body.descripcion,
                    monto: body.monto,
                };
                gastos.push(gasto);
                fs.writeFileSync("gastos.json",
                    JSON.stringify(gastosJSON));
                res.end();
            });
        }
        if (req.url.startsWith("/gasto") && req.method == "PUT") {//crea la ruta del metodo post
            let body;// crea una var body para guardar data parseada
            req.on("data", (payload) => {
                body = JSON.parse(payload);
            });
            //Usar el evento “data” del método “on()” del parámetro request para extraer el
//payload y parsearlo.Además asignale este valor a la variable body
            req.on("end", () => {
                gastosJSON.gastos = gastos.map((b) => {
                    if (b.id == body.id) {
                        return body;
                    }
                    return b;
                });
                //Sobrescribir el archivo gastos.json con el nuevo gasto
                fs.writeFileSync("gastos.json", //ojo gastos estaba con mayusc
                    JSON.stringify(gastosJSON));
                res.end();
            });
        }
        // Crear la ruta /gasto condicionando el método DELETE.
        if (req.url.startsWith("/gasto") && req.method == "DELETE") {
            // Guardar en una constante el id extraído de los parámetros de la consulta
            const { id } = url.parse(req.url, true).query;
            // Filtrar el arreglo dejando fuera el elemento que tenga el mismo id
//recibido como parámetro en la consulta
            gastosJSON.gastos = gastos.filter((b) => b.id !== id);
            // Sobrescribe el archivo
            fs.writeFileSync("gastos.json",
                JSON.stringify(gastosJSON));
            res.end();
        }
    })
    .listen(3000);
