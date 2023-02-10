import { Router } from "express";
import passport from "passport";


const router = Router()


//middleware de autenticacion. 
export function auth(req, res, next){
    if(req.session?.user) return next()
    return res.status(401).send("Error Authentication")
}

//registro

router.get('/register', async (req, res) => {
    res.render('session/register', {})
})

router.post('/create', passport.authenticate('register', {failureRedirect: '/session/failregister'}), async (req, res) => {
    res.redirect('/session/login')
})
router.get('/failregister', async(req, res) => {
    console.error('Failed Stragtregy');
    res.send({error: 'Failed'})
})


//login

// router.post('/create', async (req, res) => {
//     const userNew = req.body
//     console.log(userNew);

//     const user = new userModel(userNew);
//     await user.save();

//     res.redirect('/sessions/login')
// })


router.get ("/login", async(req,res)=>{
    res.render('session/login', {})
})

router.post('/login', passport.authenticate('login', '/session/faillogin')   ,  async (req, res) => {
    
    if(!req.user) return res.status(400).send('Invalid credentials')
    req.session.user = req.user
   
    req.session.user.rol = (req.user.email == 'adminCoder@coder.com') ? 'admin' : 'user'
    if(req.user.rol == "admin"){
        res.send("You are logged as an admin")
    }else{
        res.redirect('/api/products')
    } 
})
router.get('/faillogin', (req, res) => {
    res.json({error: 'Failed login'})
})

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body

//     const user = await userModel.findOne({email, password}).lean().exec()
//     if(!user) {
//         return res.status(401).render('errors/base', { error: 'Error en username y/o password'})
//     }
//     req.session.user = user
//     req.session.user.rol = (email == 'adminCoder@coder.com') ? 'admin' : 'user'
//     if(user.rol == "admin"){
//         res.send("You are logged as an admin")
//     }else{
//         res.redirect('/api/products')
//     } 
// // })


// router.get ("/logout", async(req,res)=>{
//     req.session.destroy(err =>{
//         if(err){
//             console.log(err)
//             res.status(500).render("errors/base", {error:err})
//         } res.redirect('/sessions/login')
//     })
// })

//logout


router.get('/logout', (req, res) => req.session.destroy(err => {
    if(err) res.send(err)
    else res.redirect("/session/login")
}) )

//Login por 3ros

router.get(
    '/login-github',
    passport.authenticate('github', {scope: ['user:email']}),
    async (req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: 'session/login'}),
    async(req, res) => {
        console.log("Callback: ", req.user);
        req.session.user = req.user
        console.log(req.session);
        res.redirect('/api/products')
    }
)


router.get(
    '/login-google',
    passport.authenticate('google', {scope: ['email', 'profile']}),
    async (req, res) => {}
)

router.get(
    '/googlecallback',
    passport.authenticate('google', {failureRedirect: '/session/login'}),
    async(req, res) => {
        console.log("Callback Google: ", req.user);
        req.session.user = req.user
        console.log(req.session);
        res.redirect('/api/products')
    }
)


router.get("/private", auth, (req,res)=>{res.send("private page")})

export default router 