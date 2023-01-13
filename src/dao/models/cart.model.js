import mongoose from "mongoose";        



const cartCollection = "carts"


const cartSchema= new mongoose.Schema({
    title: String,
    price: Number,
    thumbnails: String
})


export const cartModel = mongoose.model(cartCollection, cartSchema)