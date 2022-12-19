import { Router } from "express";
import {cartManager} from "../managers/cartManager.js";


const manager = new cartManager("./src/db/carts.json")
const router= Router()

router.get("/", async(req,res)=>{
    const carts = await manager.getCarts()
    res.json({carts})
})


router.get("/:id", async (req, res)=>{
    const id= parseInt(req.params.id)
    const cart =  await manager.getById(id)
    res.send({cart})
})

router.post ("/", async (req,res)=>{
    const cartAdd = await manager.create()
    
    res.send({status: "success", cartAdd})
})


router.post ("/:cid/product/:pid", async (req,res)=>{
    const cartId =  parseInt(req.params.cid) 
    const productId =  parseInt(req.params.pid)
    const cart = await manager.addproduct(cartId, productId)

    res.send({status: "success", cart})
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