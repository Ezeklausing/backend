import { Router } from "express";
import passport from "passport";
import session from 'express-session'
import userModel from '../dao/models/user.model.js'
import {createHash, isValidPassword} from "../utils.js"


const router = Router()


//middleware de autenticacion. 
export function auth(req, res, next){
    if(req.session?.user) return next()
    return res.status(404).send("Error Authentication")
}

//registro

router.get('/register', async (req, res) => {
    res.render('sessions/register', {})
})

//crea usuario
router.post('/create', async (req, res) => {
    const userNew = req.body
    console.log(userNew);

    const user = new userModel(userNew);
    await user.save();

    res.redirect('/sessions/login')
})

router.get ("/login", async(req,res)=>{
    res.render('sessions/login', {})
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({email, password}).lean().exec()
    if(!user) {
        return res.status(401).render('errors/base', { error: 'Error en username y/o password'})
    }
    req.session.user = user
    req.session.user.rol = (email == 'adminCoder@coder.com') ? 'admin' : 'user'
    if(user.rol == "admin"){
        res.send("You are logged as an admin")
    }else{
        res.redirect('/api/products')
    } 
})


router.get ("/logout", async(req,res)=>{
    req.session.destroy(err =>{
        if(err){
            console.log(err)
            res.status(500).render("errors/base", {error:err})
        } res.redirect('/sessions/login')
    })
})


router.get("/private", auth, (req,res)=>{res.send("private page")})

export default router 