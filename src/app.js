const express = require("express")
const productManager = require("./productManager")

const app = express()
const manager = new productManager("products.json")

app.get("/", async (req, res)=>{
    const products = await manager.getProducts()

    res.json(products)
})

app.get("/add", async (req, res)=>{

    const body = req.query 
    const obj = await manager.addProduct(body)

    res.json(obj)
})







app.listen(8080)