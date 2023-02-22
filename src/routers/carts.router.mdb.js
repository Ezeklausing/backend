import { Router } from "express";
import {cartModel} from "../dao/models/cart.model.js"
import cartService from "../services/cart.service.js";

const router = Router()

const cartServ = new cartService()


router.get ("/", async(req,res)=>{
    try {
        const carts = await cartServ.getCarts()
        res.json({
            status:"Success",
            payload: carts
        })
        
    } catch (error) {
        console.error("Cannot get carts from Mongo", error)
    }    
})


router.get("/:cid", async(req,res)=>{
    const {cid}= req.params
    const result = await cartServ.getCartsPopulate({_id:cid})
    res.json({status: "Success", payload: result})

})


router.post("/", async(req,res)=>{
    const result = await cartServ.createCart(req.body)
    res.send({
        result:"Success",
        payload: result
    })
})


router.post("/:cid/:pid", async (req, res)=>{
    const {cid}= req.params
    const {pid}= req.params
    
    const update = await cartServ.addProductById(cid,pid)

    res.send({status: "Success", payload: update})
})


router.put("/:cid", async(req,res)=>{  
    const {cid} = req.params
    const cartToReplace = req.body

    const result = await cartServ.updateCartById(cid, cartToReplace)

    res.send({status: "Success", payload: result})
})


router.put("/:cid/products/:pid", async(req,res)=>{
    const {cid} = req.params
    const {pid}= req.params
    const quantity = req.body
    const result = await cartServ.updateQuantityProduct(cid,pid,quantity)
    res.send({status: "Success", payload: result})
})


router.delete("/:cid", async(req,res)=>{
    const {cid}= req.params
    const result = await cartServ.deleteCartById({_id:cid})
    res.send({status:"Succes", payload: result})
})


router.delete("/:cid/products/:pid", async (req, res)=>{
    const {cid}= req.params
    const {pid}= req.params
    
    const update = await cartServ.deleteProductById(cid,pid)
    
    res.send({status: "Success", payload: result})
})


export default router