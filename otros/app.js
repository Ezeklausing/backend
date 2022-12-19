const express = require("express")
const productManager = require("./productManager")

const app = express()
const manager = new productManager("./db/products.json")

app.get("/products", async (req,res)=>{
    const products = await manager.getProducts()
    res.send(products)
})

app.get("/products/:limit", async (req, res)=>{
    const limit= req.params.limit
    const products = await manager.getProducts()
    if(limit < 1 || !limit ) return res.send(products)
    else{
        const limitProducts = products.slice(0,limit)
        res.send(limitProducts)
    }
})


app.get("/products/:limit/:id", async (req, res)=>{
    const id= req.params.id
    const product =  await manager.getProductsById(+id)
    res.send(product)
})


app.listen(8080)