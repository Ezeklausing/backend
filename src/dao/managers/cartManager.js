import fs from "fs"

export class cartManager {
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

    getCarts = async ()=>{
                const data = await this.#read()
                return data
    }

    getById = async (id)=>{
        const data = await this.#read()

        return data.find(p=>p.id == id)
        
    }

    create = async () =>{
        const carts= await this.#read()
        const nextId= this.getNextId(carts)
        const newCart={id:nextId,products:[]}

        carts.push(newCart)
        await this.#write(carts)
        return newCart
    }

    update = async (id, obj)=>{
        obj.id = id
        const list = await this.#read()

        for (let i = 0; i < list.length; i++) {
            if ( list[i].id == id){
                list [i] = obj
                break
            }
        }

        await this.#write(list)
    }


    addproduct = async (cartId, productId)=>{

        const cart = await this.getById(cartId)
        let found = false
        for (let i = 0; i < cart.products.length; i++) {
            console.log(cart.products[i].id)
            if(cart.products[i].id == productId){
                cart.products[i].quantity++
                found= true
                break
            }
        }
        if (!found){
            cart.products.push({id: productId, quantity:1})
        }
        await this.update(cartId, cart)
        return cart
    }
}


