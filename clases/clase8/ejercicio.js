import express, { application } from 'express'

const app = express()
const server = app.listen(8080, () => console.log("Server running on port 8080"))

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

let frase = "Argentina va a ser campeon del mundial"

app.get("/api/frase", (req,res)=>{
    res.send({frase})
})

app.get ("/api/frase/:pos",(req,res)=>{
    const pos= req.params.pos

    const frasePartials = frase.split(" ")[pos-1]
    res.send({frasePartials})
})

app.post ("/api/palabras", (req,res)=>{
    const palabra = req.body.palabra
    frase = frase + " " + palabra
    const position = frase.split(" ").length

    res.send({palabra: palabra, pos: position,} )

}) 

app.put ("/api/palabras/:pos", (req,res)=>{
    const pos = req.params.pos
    const palabra = req.body.palabra
    const frasePartials = frase.split(" ")[pos-1]
    frase.split(" ")[pos-1] = frase + " " + palabra

    res.send ({nuevaPalabra: palabra, viejaPalabra: frasePartials })
})