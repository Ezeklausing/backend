import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";

import productService from "../services/product.service.js";

const productServ = new productService()

const router= Router()


router.get("/", async (req,res)=>{
    try {
        let {limit, page, sort} = req.query;
        if (!limit) limit =5
        if(!page) page = 1
        const user = req.session.user
        //revisar sort. 
        const filter = req.query?.query || ""
        const search = {}
        if(filter){
            search["$or"]=[
                {title:{$regex: filter}},
                {code:{$regex: filter}},
                {category:{$regex: filter}}
            ]
        }
        const result = await productModel.paginate( search, {limit, page, lean:true, sort:{price:sort} })
        //navegacion paginas.
        result.prevLink = result.hasPrevPage ? `/api/products?page=${result.prevPage}` : ''
        result.nextLink = result.hasNextPage ? `/api/products?page=${result.nextPage}` : ''
        result.isValid = !(page <= 0 || page>result.totalPages)
        
    res.render("products", {result, user})
    console.log({
        result:"Success",
        payload:result,
    })
    } catch (error) {console.error("Cannot get products from Mongo", error)}
})

router.get("/pjson", async (req,res)=>{
    const result  = await productServ.getProducts()

    res.send({result:"Success",payload: result})
})


router.post("/", async(req,res)=>{
    const result = await productServ.createProduct(req.body)
    res.send({result:"Success",payload: result})
})

router.put("/:uid", async(req,res)=>{
    const {uid} = req.params
    const productToReplace = req.body

    const result = await productServ.updateById({_id:uid}, productToReplace)

    res.send({status: "Success", payload: result})
})


router.delete("/:uid", async(req,res)=>{
    const {uid}= req.params
    const result = await productServ.deleteById({_id:uid})

    res.send({status:"Succes", payload: result})
})


export default router