// 1. Ocupar el módulo File System para la manipulación de archivos alojados en el
// servidor(3 Puntos)
// const url = require("url")
const http = require("http")
const fs = require("fs")
const axios = require("axios")
const { v4: uuidv4 } = require('uuid')//especificamos el atributo v4

http.createServer((req, res) => {
    if (req.url == "/" && req.method == "GET") {
        res.setHeader("content-type", "text/html")
        res.end(fs.readFileSync("index.html"))
    }
}).listen(3000, console.log("Server ON"))

const nuevoRoommate = async () => {
    try {
        const { data } = await axios.get("https://randomuser.me/api/")
        const roommate = data.results[0]
        const user = {
            id: uuidv4().slice(30),
            nombre: `${roommate.name.title} ${roommate.name.first} ${roommate.name.last}`
        }
        return user
    } catch (e) {
        throw e
    }
}

const guardarRoommate = (roommate) => {
    const roommatesJSON = JSON.parse(fs.readFileSync("roommates.json", "utf8"))
    roommatesJSON.roommates.push(roommate)
    fs.writeFileSync("roommates.json", JSON.stringify(roommatesJSON))
}

module.exports = { nuevoRoommate, guardarRoommate }