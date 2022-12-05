const express = require("express")

const app = express()

app.get("/saludo", (request, response)=>{
    response.send("endpoint saludo")

})

// const html= `<h1 style="color:blue">Bienvenidos</h1>`
// const user= {
//     nombre:"Ezequiel",
//     apellido:"Klausing",
//     edad: 30
// }

app.get("/",(req, res)=>{
    res.send({users})
})

app.get("/saludar/:nombre/:apellido", (req, res)=>{

    console.log(req.params)
    const saludo= `Saludos a ${req.params.nombre} ${req.params.apellido}`

    response.send("saludando a alguien")
})
// app.get("/user", (request, response)=>{
//     response.send(user)
// })


app.listen(8080, ()=>{
    console.log("Server listening on port 8080")
})
//http://localhost:8080/saludo
//es un endpoint.

