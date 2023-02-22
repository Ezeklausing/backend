import mongoose from "mongoose";     
import mongoosePaginate from "mongoose-paginate-v2"   


const productCollection = "products"


const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnails: String
})


productSchema.plugin(mongoosePaginate)


export const productModel = mongoose.model(productCollection, productSchema)