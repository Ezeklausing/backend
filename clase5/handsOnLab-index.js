const userManager = require("./userFunctionalities")


const run = async ()=>{
    const manager = new userManager()
    await manager.createUser(
        {
            nombre: "Paula",
            lastname: "Bebedere",
            username: "paula",
            password: "secret"
        }

    ) 
    await manager.createUser(
        {
            nombre: "Ezequiel",
            lastname: "Klausing",
            username: "eze",
            password: "drummer"
        }

    ) 

    console.log(await manager.getUsers())
    
    await manager.validateUser("eze", "drummer")
}


run()
