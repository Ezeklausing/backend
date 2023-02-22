import { cartModel } from "../dao/models/cart.model.js";


class cartService {
    getCarts = ()=>{
        return cartModel.find()
    }

    getCartsPopulate = (cid)=>{
        const cart = cartModel.find({_id:cid})
        return cart
    }

    createCart = (data) =>{
        return cartModel.create(data)
    }

    updateCartById = (cid,data)=>{
        const result = cartModel.updateOne(
            {_id: cid},
            {$push: {products: data}}
        )

        return result
    }

    addProductById = (cid, pid)=>{
        const result = cartModel.updateOne(
            {_id: cid},
            {$push: {products: {product:pid, quantity:1}}}
        )

        return result
    }

    updateQuantityProduct = (cid, pid, quantity)=>{
        const result = cartModel.updateOne(
            {_id: cid},
            {"cart.product":{_id:pid}},
            { 
                $inc: {"cart.$.quantity":quantity}
            }, 
        )
        return result
    }


    deleteProductById = (cid, pid)=>{
        const result = cartModel.updateOne(
            {_id: cid},
            {$pull: {products: {product:{_id:pid}}}}
        )

        return result
    }

    deleteCartById = (cid)=>{
        return cartModel.deleteOne(cid)
    }

}



// const result = await cartModel.updateOne(
//     {_id: cid},
//     {$set: {products: {product:quantity}}})



export default cartService