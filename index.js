const ProductManager = require("./productManager")

const manager = new ProductManager("products.json")

const test = async()=>{
    // manager.addProduct({
    //     name:"Pera",
    //     price: 240
    // })
    // console.log(await manager.getProducts())
    // await manager.updateProductIndex(5, {
    //     name: "Zapallo",
    //     price: 77
    // })
    console.log(await manager.getProducts())
    // console.log(await manager.getProductsById(5))
    await manager.deleteProduct(3)
    console.log(await manager.getProducts())
    

}

test()



    



