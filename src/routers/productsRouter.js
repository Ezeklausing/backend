import { Router } from "express";
import {ProductManager} from "../managers/productManager.js";


const manager = new ProductManager("./src/db/products.json")
const router= Router()


router.get("/", async(req,res)=>{
    const products = await manager.getProducts()
    const {limit} = req.query

    if(!limit || limit < 1 ) return res.send({products})
    else{
        const partialProducts = products.slice(0,limit)
        res.send(partialProducts)
    }
})


router.get("/:id", async (req, res)=>{
    const id= req.params.id
    const product =  await manager.getProductsById(+id)
    res.send(product)
})

router.post ("/", async (req,res)=>{
    const newProduct = req.body
    await manager.addProduct(newProduct)
    res.json({status: "success"})
})


export default router