import express, { application } from 'express'

const app = express()
const server = app.listen(8080, () => console.log("Server running on port 8080"))

let users = []

app.use(express.json()) // Para obtener json del body
app.use(express.urlencoded({extended: true}))


app.get("/api/user", (req,res)=> res.send({users}))

app.post('/api/user', (req, res) => {
    const user = req.body

    if(!user.firstname) {
        return res.status(400).send({status: "error", error: "Valores incompletos"})
    }

    users.push(user)

    res.send({status:"success", message:"user created"})
})  

app.put("/api/user", (req,res)=>{
    const user =req.body
//validamos que venga el 1er nombre.
    if(!user.firstname) {
        return res.status(400).send({status: "error", error: "Valores incompletos"})
    }
//buscamos el user y obt. el index
    const idx = users.findIndex(u=> u.firstname== user.firstname)
//validamos q encontro el user. 
    if(idx < 0 ) {return res.status(404).send({status: "error", error: "user not found"})}
    users [idx]= user //update del user. 

    res.send({status: "success", message: "user updated"}) //devolvemos res. 

}) 

app.delete("/api/user/:name", (req, res)=>{
    const name = req.params.name
    const actualTotal = users.length //tamaño actual antes de filtrar 
    users = users.filter(u=> u.firstname != name)

    if(users.length == actualTotal){ //validamos si encontro user con el nombre
        return res.status(404).send({status: "error", error: "user not found"})
    } res.send({status: "success", message: "user deleted"})
})