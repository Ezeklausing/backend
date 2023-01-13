
import { Router } from "express";
import {chatModel} from "../dao/models/chat.model.js"

const router = Router()


router.get ("/", async(req,res)=>{
    try {
        const chats = await chatModel.find()
        res.json({
            status:"Success",
            payload: chats
        })
        
    } catch (error) {
        console.error("Cannot get chats from Mongo", error)
    }    
})


export default router