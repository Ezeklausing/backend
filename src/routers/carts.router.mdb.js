import { Router } from "express";
import {cartModel} from "../dao/models/cart.model.js"
import {productModel} from "../dao/models/product.model.js"
import { mongoose } from "mongoose";

const router = Router()
//buscar los carritos
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
//agregar carrito
router.post("/", async(req,res)=>{
    const result = await cartModel.create(req.body)
    res.send({
        result:"Success",
        payload: result
    })
})

//Agrega producto
router.post("/:cid/:pid", async (req, res)=>{
    const {cid}= req.params
    const {pid}= req.params
    
    const result = await cartModel.updateOne(
        {_id: cid},
        {$push: {products: {product:pid, quantity:1}}})
    
    res.send({status: "Success", payload: result})
})

//populate
router.get("/:cid", async(req,res)=>{
    const {cid}= req.params
    const cart =  await cartModel.find({_id:cid})
    res.json({status: "Success", payload: cart})

})

//Actualiza carrito
router.put("/:cid", async(req,res)=>{  
    const {cid} = req.params
    const cartToReplace = req.body
    

    const result = await cartModel.updateOne(
        {_id: cid},
        {$push: {products: cartToReplace}})

    res.send({status: "Success", payload: result})
})



//Actualizar cant. 
router.put("/:cid/products/:pid", async(req,res)=>{
    const {cid} = req.params
    const {pid}= req.params
    const quantity = req.body
    const result = await cartModel.updateOne(
        {"cart.product":pid },
        { 
            $inc: {"cart.$.quantity":quantity}
        }, 
    )
    res.send({status: "Success", payload: result})
})

router.put("/:cid/products/:pid", async(req,res)=>{
    const {cid} = req.params
    const {pid}= req.params
    const quantity = req.body

    const result = await cartModel.updateOne(
        {_id: cid},
        {$set: {products: {product:quantity}}})
    
    res.send({status: "Success", payload: result})

    res.send({status: "Success", payload: result})
})




//Elimina carrito
router.delete("/:cid", async(req,res)=>{
    const {cid}= req.params
    const result = await cartModel.deleteOne({_id:cid})
    res.send({status:"Succes", payload: result})
})


//Elimina producto de carrito
router.delete("/:cid/products/:pid", async (req, res)=>{
    const {cid}= req.params
    const {pid}= req.params
    
    const result = await cartModel.updateOne(
        {_id: cid},
        {$pull: {products: {product:pid}}})
    
    res.send({status: "Success", payload: result})
})




export default router