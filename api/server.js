const express = require("express");
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

const server = express()

server.use([helmet(), morgan("common"), express.json(), cors()])
// server.use(helmet());
// server.use(morgan("common"));
// server.use(express.json());
// server.use(cors());

const Mons = require("../data/dbConfig");

server.post("/api/monsters", (request, response, next) => {
    Mons.add(request.body)
        .then((newMonster) => {
            response.status(200).json({ ...newMonster })
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json({ message: "internal server error. scream at devs pls" })
        })
})

server.delete("/api/monsters", (request, response, next) => {
    const { monsterName } = request.body
    Mons.remove({ monsterName })
        .then((thing) => {
            response.status(200).json({ stuff: thing })
        })
        .catch((error) => {
            console.log(error)
            response.status(500).json({ message: "internal server error. scream at devs pls" })
        })
})

module.exports = server;