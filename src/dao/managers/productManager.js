import fs from "fs"

export class ProductManager {
    constructor(path){
        this.path = path
    }
    
    #read = ()=>{
        try{
            if (fs.existsSync(this.path)){
                return fs.promises.readFile(this.path,"utf-8").then (result=> JSON.parse(result))
            }
        }catch(e){
            console.log(e)
        }
        return[]
    }
    
    #write(data){
        return fs.promises.writeFile(this.path, JSON.stringify(data, null, 3))   
    }
            
    
    getNextId = list => { 
        const count = list.length
        return (count > 0) ? list[count-1].id +1 : 1 
    }

    getProducts = async ()=>{
                const data = await this.#read()
                return data
    }

    addProduct = async ({title, description, code, price, status, stock, category, thumbnails}) =>{
        const products= await this.getProducts()
        const nextId= this.getNextId(products)
        const newProduct = {id:nextId, title, description, code, price, status, stock, category, thumbnails}
        console.log(products, newProduct)
        products.push(newProduct)
        await this.#write(products)
        return newProduct
        // const existIdProduct = products.some(e=> e.id===newProduct.id)
        
        // if (existIdProduct){
        //     throw new Error("El codigo no se puede repetir.")
        // }
    }

    updateProductIndex = async (id, obj)=>{
        const products= await this.getProducts()
        const productiIdx= products.findIndex( product => product.id === id)
        if(productiIdx < 0 || productiIdx > products.length) return {error:"Producto no existe"}
        const product = products[productiIdx]
        products[productiIdx]= {...product, ...obj}
        await this.#write(products)
        return products[productiIdx]
    }

    getProductsById = async (id)=>{
        const list= await this.#read()
        const productInList = list.find(item=> item.id===id)
        if (productInList){
            return productInList
        }else{
            console.log("No se encuentra el producto con el id proporcionado.")
        }
        
    }

    deleteProduct = async (id)=>{
        const products = await this.getProducts();
        if( id-1 > products.length) return ({error:"Producto no existe"})
        products.splice(id-1, 1,)
        await this.#write(products)
    }
}


