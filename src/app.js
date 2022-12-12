import  express  from "express";
import userRoutes from "./routers/usersRouters.js"
import petsRoutes from "./routers/petsRouters.js"

const app = express()

app.use(express.json())

app.use("/api/users", userRoutes)

app.use("/api/pets", petsRoutes)

app.use("/", (req,res)=>{
    res.send("home")
})

app.listen(8080)