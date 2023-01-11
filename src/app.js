import  express  from "express";
import handlebars from "express-handlebars"
import productsRouter from "./routers/productsRouter.js"
import cartsRouter from "./routers/cartsRouter.js"
import viewsRouter from "./routers/views.router.js"
import { ProductManager } from "./managers/productManager.js";
import __dirname from "./dirname.js";
import { Server as HttpServer} from "http";
import { Server as IoServer} from "socket.io";


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)


app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs"
}))


app.set("views", __dirname + "/views")
app.set ("view engine", "hbs")

// //para emitir en dif. rutas
// app.use((req,res,next)=>{
//     req.io = io
//     next()
// })

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

    const manager = new ProductManager(`./src/db/products.json`)
    const products = await manager.getProducts()
    io.sockets.emit("products", products)

    socket.on("addProduct", async (product)=>{
        console.log(product)
        await manager.addProduct(product)
        //se vuelven a enviar los productos. 
        io.sockets.emit("products", await manager.getProducts())
    })
})