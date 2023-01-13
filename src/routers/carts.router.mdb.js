import { Router } from "express";
import {cartModel} from "../dao/models/cart.model.js"

const router = Router()

router.get ("/", async(req,res)=>{
    try {
        const carts = await cartModel.find()
        res.json({
            status:"Success",
            payload: carts
        })
        
    } catch (error) {
        console.error("Cannot get carts from Mongo", error)
    }    
})

router.get("/:cid", async (req, res)=>{
    // const id= parseInt(req.params.id)
    const {cid}= req.params
    const cart =  await cartModel.findById({_id:cid})
    res.send({status: "Success", payload: cart})
})

router.post("/", async(req,res)=>{
    const result = await cartModel.create(req.body)
    res.send({
        result:"Success",
        payload: result
    })
})

router.put("/:cid", async(req,res)=>{
    const {cid} = req.params
    const cartToReplace = req.body

    const result = await cartModel.updateOne({_id:cid}, cartToReplace)

    res.send({status: "Success", payload: result})
})

router.delete("/:cid", async(req,res)=>{
    const {cid}= req.params
    const result = await cartModel.deleteOne({_id:cid})

    res.send({status:"Succes", payload: result})
})




export default router