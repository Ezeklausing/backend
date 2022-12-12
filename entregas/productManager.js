const fs = require("fs")


class ProductManager {
    constructor(path){
        this.path = path

    }

    getNextId = list => { 
        const count = list.length
        return (count > 0) ? list[count-1].id +1 : 1 
    }


    read = ()=>{
        if (fs.existsSync(this.path)){
            return fs.promises.readFile(this.path,"utf-8").then (result=> JSON.parse(result))
        }
        return[]
    }
    
    write =  list =>{
            return fs.promises.writeFile(this.path, JSON.stringify(list))
        }

    getProducts = async ()=>{
                const data = await this.read()
                return data
    }

    addProduct = async (obj) =>{
        const list= await this.read()
        const nextId= this.getNextId(list)
        obj.id= nextId
        list.push(obj)
        await this.write(list)

        return obj
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


module.exports = ProductManager