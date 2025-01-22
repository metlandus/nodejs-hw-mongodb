import express from "express"
import cors from "cors"

function setupServer() {
    app.get("/", (req, res) => {
        res.send("Hello World!")
    })
    app.listen(port, () => {
        console.log(example)
    })
}