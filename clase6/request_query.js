const express = require("express")

//Peticiones por query.

const app= express()
app.use(express.urlencoded({extended:true}))

const users = [
    {id:1, nombre:"Ezequiel", lastname: "Klausing", gender:"M"},
    {id:2, nombre:"Sebastian", lastname: "Bullian", gender:"M"},
    {id:3, nombre:"Anabella", lastname: "Molino", gender:"F"},
    {id:4, nombre:"Ezequiel", lastname: "Orsinger", gender:"M"},
    {id:5, nombre:"Gonzalo", lastname: "Bullian", gender:"M"},
    {id:6, nombre:"Priscila", lastname: "Klausing", gender:"F"},

]
//filtra por genero
app.get("/", (req, res)=>{  
    const gender = req.query.gender
    //siempre hay que validad que la query exista. if gender
if(gender && gender.toUpperCase()== "M" || gender.toUpperCase()== "F"){
    const userFiltered = users.filter( u=> u.gender===gender)
    res.send(userFiltered)
}else{
    res.send({users})
}
})

app.get("/ejemploquery", (req,res)=>{
    console.log(req.query);
    const age= req.query.age

    res.send (req.query)

})



app.listen(8080)