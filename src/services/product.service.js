import { productModel } from "../dao/models/product.model.js"

class productService{


    getProducts = ()=>{
        return productModel.find()
    }

    createProduct = (data) =>{
        return productModel.create(data)
    }

    updateById = (id, data)=>{
        return productModel.updateOne(id,data)
    }

    deleteById = (id)=>{
        return productModel.deleteOne(id)
    }

}


export default productService
