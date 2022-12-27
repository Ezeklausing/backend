import { Router } from "express";
import {ProductManager} from "../managers/productManager.js";


const manager = new ProductManager(`./src/db/products.json`)
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
    res.send({status: "success", product:newProduct})
})

router.put ("/:pid", async (req,res)=>{
    try {
        const id = Number(req.params.pid)
        const obj = req.body
        const updateProductbyId= await manager.updateProductIndex(id,obj)
        res.send ({success:true, product: updateProductbyId})
    } catch (error) {
        console.log(error)
    }
})

router.delete ("/:pid", async (req, res)=>{
    try {
        const id = Number(req.params.pid)
        await manager.deleteProduct(id)
        res.send({success: true, product:"Eliminado"})

    }catch (error) {
        console.log(error)
    }
})


export default router