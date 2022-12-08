const http = require("http")

const server = http.createServer((request,response)=>{
    response.end("Saludos eze")
})


server.listen(8080, ()=>{
    console.log("listening on port 8080")
})

