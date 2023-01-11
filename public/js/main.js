const socket = io()


const productsContainer = document.getElementById("products-table-body")

const createProductForm = document.getElementById("create-product-form")

productsContainer.innerHTML = "<div> hola </div>"


socket.on("products", (products)=>{
    const allProducts = products.map(product=>
    `<tr>
        <td>${product.title} </td>
        <td>${product.price} </td>
        <td>${product.description} </td>
        <td> <img heigth = "72px" widht ="72px " src= ${product.thumbnail} /> </td>
    </tr>`
    ).join("")
    productsContainer.innerHTML = allProducts
})

createProductForm.addEventListener("submit", async (e)=>{
    e.preventDefault()

    const formData = new FormData(createProductForm)

    const product = {}

    for (const field of formData.entries()) {
        product[field[0]] = field[1]
    }
    socket.emit("addProduct", product)
    // await fetch("/api/products",{
    //     body: JSON.stringify(product),
    //     method: "POST",
    //     headers: {
    //         "Content-Type":"application/json"
    //     }
    // })
})