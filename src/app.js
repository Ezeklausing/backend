import  express  from "express";
import productsRouter from "./routers/productsRouter.js"
import cartsRouter from "./routers/cartsRouter.js"


const app = express()

app.use(express.json())
app.use("/static",express.static("public")) 
app.use(express.urlencoded({extended:true}))


app.use("/api/products", productsRouter)

app.use("/api/carts", cartsRouter)

app.use("/", (req,res)=>res.send("home"))

app.listen(8080)