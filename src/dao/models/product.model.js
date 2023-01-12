import mongoose from "mongoose";        


//Nombre Coleccion
const productCollection = "products"

//Esquema del documento 
const productSchema= new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnails: String
})

//Creacion del modelo  . coll +schema
export const productModel = mongoose.model(productCollection, productSchema)