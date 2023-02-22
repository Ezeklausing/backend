import  express  from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import config from "./config/config.js";

import handlebars from "express-handlebars"

import { Server as HttpServer} from "http";
import { Server as IoServer} from "socket.io";

import { productModel } from "./dao/models/product.model.js";
import { chatModel } from "./dao/models/chat.model.js";


import passport from 'passport'
import initializePassport from './config/passport.config.js'

import sessionRouter from "./routers/session.router.js"
import { auth } from "./routers/session.router.js";
import productsRouter from "./routers/products.router.mdb.js"
import cartsRouter from "./routers/carts.router.mdb.js"
import viewsRouter from "./routers/views.router.js"
import chatsRouter from "./routers/chats.router.mdb.js"



const dbUri = config.mongoUrl
 
const app = express()

mongoose.set('strictQuery', false) 
mongoose.connect(dbUri, {dbName: "ecommerce"},error =>{
    if (error){
        console.error("Cannot connect to db", error);
        process.exit()
    }
}
)

app.use(session({
    secret: "klausing",
    store: MongoStore.create({
        mongoUrl:dbUri,
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        dbName: "ecommerce",
        ttl:100000
    }),
    secret:"123456",
    resave: true,
    saveUninitialized:true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


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



app.set("io", io)

app.use("/", viewsRouter )
 
app.use(express.static("public")) 


app.use("/session", sessionRouter)
app.use("/api/products",auth, productsRouter)
app.use("/api/carts", auth, cartsRouter)
app.use("/api/chats", chatsRouter)


const server = httpServer.listen(config.port, ()=>console.log(`Server running on port ${server.address().port}`))

server.on("error", (error)=>console.log(error))


let messages=[]

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

    socket.on("message", async (data) =>{
        await chatModel.create(data)
        io.emit("messageLogs", await chatModel.find()) // publicamos los mensajes para todos.  
    })
    socket.on("authenticated", user =>{
        socket.broadcast.emit("newUser", user)
    })
})

