import { Router } from "express";

const router= Router()

const carts = []

router.get("/", (req,res)=>{
    res.json({carts})
})

router.post ("/", (req,res)=>{
    const pet = req.body
    pets.push(pet)
    res.json({status: "success"})
})

export default router