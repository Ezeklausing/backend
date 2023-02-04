import {Router} from "express";
import { ProductManager } from "../dao/managers/productManager.js";
import { chatModel } from "../dao/models/chat.model.js";
import { productModel } from "../dao/models/product.model.js";



const router = Router()

// const manager = new ProductManager(`./src/db/products.json`)


//CON MONGO DB

router.get("/", async (req,res)=>{
    

    res.render("home")
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeproducts")
})

router.get("/chat", async (req,res)=>{
    // const chats = await chatModel.find().lean()
    res.render("chat.hbs", {})
})

export default router