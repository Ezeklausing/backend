import  express  from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars"
import productsRouter from "./routers/products.router.mdb.js"
import cartsRouter from "./routers/cartsRouter.js"
import viewsRouter from "./routers/views.router.js"
import { ProductManager } from "./dao/managers/productManager.js";
import { productModel } from "./dao/models/product.model.js";
import __dirname from "./dirname.js";
import { Server as HttpServer} from "http";
import { Server as IoServer} from "socket.io";


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://ezedrums:ATxMPVifSQ03xJmJ@cluster0.abi5soe.mongodb.net/?retryWrites=true&w=majority",
error =>{
    if (error){
        console.error("Cannot connect to db", error);
        process.exit()
    }
}
)

const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)


app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs"
}))


app.set("views", __dirname + "/views")
app.set ("view engine", "hbs")

app.set("io", io)

app.use("/", viewsRouter )
 
app.use(express.static("public")) 

app.use("/api/products", productsRouter)

app.use("/api/carts", cartsRouter)


const server = httpServer.listen(8080, ()=>console.log(`Server running on port ${server.address().port}`))

server.on("error", (error)=>console.log(error))


io.on("connection", async (socket) =>{
    console.log(`New client connected, Id: ${socket.id}`)
    io.sockets.emit("hello", "HOLA.")

    // const manager = new ProductManager(`./src/db/products.json`)
    // const products = await manager.getProducts()
    const products = await productModel.find()
    io.sockets.emit("products", products)

    socket.on("addProduct", async (product)=>{
        console.log(product)
        await productModel.create(product)
        // await manager.addProduct(product)
        //se vuelven a enviar los productos. 
        // io.sockets.emit("products", await manager.getProducts())
        io.sockets.emit("products", await productModel.find())
    })
})

