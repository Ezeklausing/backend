import passport from "passport";
import local from "passport-local"
import {createHash, isValidPassword} from "../utils.js"
import userModel from "../dao/models/user.model.js"
import GitHubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oauth2'




const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true, usernameField: 'email'
        },
        async (req, username, password, done) => {
            const {first_name, last_name, rol, email } = req.body
            try {
                const user = await userModel.findOne({email: username})
                if(user) {
                    console.log('User already exist');
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    rol,
                    password: createHash(password)
                }
                console.log(newUser)
                const result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done("Error to register " + error)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email'},
        async(username, password, done) => {
            try {
                const user = await userModel.findOne({email: username}).lean().exec()
                if(!user) {
                    console.error('User doesnt exist');
                    
                    return done(null, false)
                }

                if(!isValidPassword(user, password)) return done(null, false)

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))

    //github strategy

    passport.use('github', new GitHubStrategy(
        {
            clientID: "Iv1.b2ad683ef9ebbb0b",
            clientSecret: "99b08b28e68dc15d2e6e73b0c947477a432f2258",
            callbackURL: "http://localhost:8080/session/githubcallback"
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log(profile);

            try {
                const user = await userModel.findOne({email: profile._json.email})
                if(user) {
                    console.log('User already exist');
                    return done(null, user)
                }

                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    rol: "user",
                    password: ''
                }
                const result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('error to login with github' + error)
            }
        }
    ))

// Google strategy

    passport.use('google', new GoogleStrategy(
    {
        clientID: "265378359112-is275soplcd0laij11q191bd3ltumd79.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/session/googlecallback",
        passReqToCallback: true
    },
    async(request, accessToken, refreshToken, profile, done) => {
        console.log(profile);

        try {
            const user = await userModel.findOne({email: profile._json.email})
            if(user) {
                console.log('User already exist');
                return done(null, user)
            }

            const newUser = {
                first_name: profile._json.given_name,
                last_name: profile._json.family_name,
                email: profile._json.email,
                rol: "user",
                password: ''
            }
            const result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) {
            return done('error to login with github' + error)
        }
    }
    ))    

    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })

}

export default initializePassport