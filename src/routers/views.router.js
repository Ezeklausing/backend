import {Router} from "express";
import { ProductManager } from "../dao/managers/productManager.js";
import { productModel } from "../dao/models/product.model.js";

const router = Router()

// const manager = new ProductManager(`./src/db/products.json`)



// router.get ("/", async (req,res)=>{
//     const products = await manager.getProducts()
//     res.render("home", {products})
// })

// router.get("/realtimeproducts", (req,res)=>{
//     res.render("realTimeproducts")
// })


//CON MONGO DB

router.get("/", async(req,res)=>{
    const products = await productModel.find()
    res.render("home", {products})
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeproducts")
})

export default router