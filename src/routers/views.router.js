import {Router} from "express";
import { ProductManager } from "../managers/productManager.js";

const router = Router()

const manager = new ProductManager(`./src/db/products.json`)

router.get ("/", async (req,res)=>{
    const products = await manager.getProducts()
    res.render("home", {products})
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeproducts")
})

export default router