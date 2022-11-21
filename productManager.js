class ProductManager {
    constructor(){
        this.products = []

    }

    getNextId= ()=>{
        const count = this.products.length
        const NextId = (count > 0) ? this.products[count-1].id + 1 : 1;
        return NextId
    }

    getProducts =()=>{
        return this.products
    }

    getProductsById =(id)=>{
        const productInArray = this.products.find(item=> item.id===id)
        if (productInArray){
            return productInArray
        }else{
            console.log("No se encuentra el producto con el id proporcionado.")
        }
        
    }

    addProduct =(code,title,description,price,thumbnail,stock)=>{
        const productExist= this.products.find(item=> item.code === code)
        if (!productExist){
            const product = {
                id:this.getNextId(),
                code,
                title,
                description,
                price,
                thumbnail,
                stock,
            }
            this.products.push(product)
        } else{
            console.log("Este producto ya esta creado.")
        }  
    }

    
}

const manager = new ProductManager()

manager.addProduct(13,"producto Prueba 1", "la description", 140, "sin foto", 14 )
manager.addProduct(22,"producto Prueba 2", "la description", 130, "sin foto", 15 )
manager.addProduct(22,"producto Prueba 3", "la description", 150, "sin foto", 10 )

console.log(manager.getProducts())

