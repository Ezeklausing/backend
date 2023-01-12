import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";


const router= Router()

router.get("/", async(req,res)=>{
    try {
        const products = await productModel.find()
        res.send({
            result:"Success",
            payload: products
        })
    } catch (error) {
        console.error("Cannot get products from Mongo", error)
    }
})

router.post("/", async(req,res)=>{
    const result = await productModel.create(req.body)
    res.send({
        result:"Success",
        payload: result
    })
})

router.put("/:uid", async(req,res)=>{
    const {uid} = req.params
    const productToReplace = req.body

    const result = await productModel.updateOne({_id:uid}, productToReplace)

    res.send({status: "Success", payload: result})
})


router.delete("/:uid", async(req,res)=>{
    const {uid}= req.params
    const result = await productModel.deleteOne({_id:uid})

    res.send({status:"Succes", payload: result})
})


export default router