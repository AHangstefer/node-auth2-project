const express = require("express")
const cookieParser = require("cookie-parser")
const allRouters = require("./routers/allRouters")
const db = require("./data/config")
const server = express()
const port = process.env.PORT || 3000


server.use(express.json())

server.use(cookieParser())

server.use("/api", allRouters)

server.use((err, req, res, next)=> {
    console.log(err)

    res.status(500).json({
        message: "something went wrooong"
    })
})

server.listen(port, ()=> {
    console.log(`Running at http://localhost:${port}`)
})