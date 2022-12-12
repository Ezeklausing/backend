const express = require("express")
//Url dinamica con params.

const app = express()

app.get("/saludar/:nombre", (req, res)=>{
    const saludo = `Saludando a ${req.params.nombre}`
    
    res.send(saludo)
})

app.get("/saludo/:nombre/:apellido", (req, res)=>{
    res.send(`Bienvenido ${req.params.nombre} ${req.params.apellido}`)
})

app.listen(8080, ()=>{console.log("server ok")})