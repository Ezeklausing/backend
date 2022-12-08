const express = require("express")


const app = express()

//Incluyendo un html
const html = `<h1 style="color:blue;">Bienvenidos</h1>`

app.get("/bienvenida", (req,res)=>{
    res.send(html)
})

const user = {
    name:"Ezequiel",
    lastname:"Klausing",
    age:30
}

app.get("/user", (req,res)=>{
    res.send(user)
})


app.listen(8080, ()=>{
    console.log("listening on port 8080")
})