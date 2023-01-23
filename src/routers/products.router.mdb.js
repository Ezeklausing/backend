import { query, Router } from "express";
import { productModel } from "../dao/models/product.model.js";


const router= Router()

router.get("/", async (req,res)=>{
    try {
        let {limit, page, sort} = req.query;
        if (!limit) limit =5
        if(!page) page = 1
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
        
    res.render("products", result)
    console.log({
        result:"Success",
        payload:result
    })
    } catch (error) {console.error("Cannot get products from Mongo", error)}
})

router.get("/pjson", async(req,res)=>{
    const products = await productModel.find()
    res.send({
        result:"Success",
        payload: products
    })

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