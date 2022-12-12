const express = require("express")


const app = express()

const users = [
    {id:1, nombre:"Ezequiel", lastname: "Klausing"},
    {id:2, nombre:"Sebastian", lastname: "Bullian"},
    {id:3, nombre:"Anabella", lastname: "Molino"},

]

app.get("/", (req, res)=>{  
    res.send({users})
})

app.get("/:id",(req,res)=>{
    const id = req.params.id
    console.log(id)
    const user = users.find(u=> u.id===id)
    if (!user) return res.send({error:"user not found"})
    
    res.send({user})
})

app.listen(8080, ()=>{console.log("server ok")})