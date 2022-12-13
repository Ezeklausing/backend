import fs from "fs"

export class ProductManager {
    constructor(path){
        this.path = path
    }
    
    read = ()=>{
        try{
            if (fs.existsSync(this.path)){
                return fs.promises.readFile(this.path,"utf-8").then (result=> JSON.parse(result))
            }
        }catch(e){
            console.log(e)
        }
        return[]
    }
    
    write =  products =>{
            return fs.promises.writeFileSync(this.path, JSON.stringify(products))
        }

    getNextId = list => { 
        const count = list.length
        return (count > 0) ? list[count-1].id +1 : 1 
    }

    getProducts = async ()=>{
                const data = await this.read()
                return data
    }

    addProduct = async ({name, price}) =>{
        const products= await this.getProducts()
        const nextId= this.getNextId(products)
        console.log(products, nextId)
        const newProduct = {id:nextId, name, price}
        // const existIdProduct = products.some(e=> e.id===newProduct.id)
        
        // if (existIdProduct){
        //     throw new Error("El codigo no se puede repetir.")
        // }

        // //obj.id= nextId
        // products.push(newProduct)
        // await this.write(products)

        return newProduct
    }

    updateProductIndex = async (id,obj)=>{
        obj.id = id
        const list= await this. read()

        const idx= list.findIndex( e => e.id == id)
        if(idx < 0 ) return
        list [idx] = obj
        await this.write (list)
    }

    getProductsById = async (id)=>{
        const list= await this. read()
        const productInList = list.find(item=> item.id===id)
        if (productInList){
            return productInList
        }else{
            console.log("No se encuentra el producto con el id proporcionado.")
        }
        
    }

    deleteProduct = async (id)=>{
        const list = await this.getProducts();
        if(list[id-1]=== undefined){
            console.log("No se encuentra el producto a borrar.")
        }else{
            list.splice(id-1, 1,)
            await this.write(list)
        }
    }
}


