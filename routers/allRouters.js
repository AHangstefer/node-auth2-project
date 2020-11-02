const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./helpers")

const router = express.Router()

router.get("/users", async (req, res, next)=> {
    try{
        res.json(await Users.find())
    }
    catch(err){
        next(err)
    }
})

router.post("/register", async (req, res, next)=> {
    try {
        const {username, password, department} = req.body
        const user = await Users.findByUsername(username)

        if(user){
            return res.status(409).json({
                message: "Username is already taken"
            })
        }

        const newUser = await Users.add({
            username,
            password: await bcrypt.hash(password, 12),
            department
        })

        res.status(201).json(newUser)
    }
    catch(err){
        next(err)
    }
})

router.post("/login", async (req, res, next)=> {
    try{
        const { username, password } = req.body
        const user = await Users.findByname(username)

        if(!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const passwordValid = await bycrypt.compare(password, user.password)

        if(!passwordValid) {
            return res.status(401).json({
                message: "This password is invalid"
            })
        }

        const token = jwt.sign({
            userID: user.id,
            userDepartment: user.department
        }, process.env.JWT_SECRET)

        res.cookie("token:", token)

        res.json({
            message: `Welcome ${user.username}!`
        })
    } catch(err){
        next(err)
    }
})

module.exports = router