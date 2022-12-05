import express from 'express'

const app = express()
const server = app.listen(8080, () => console.log("Server running..."))

const users = []

app.use(express.json()) // Para obtener json del body
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => res.send('OK'))

app.post('/api/user', (req, res) => {
    const user = req.body

    if(!user.firstname) {
        return res.status(400).send({status: "error", error: "Valores incompletos"})
    }

    users.push(user)

    res.send({status: "success", message: "User Created"})
})