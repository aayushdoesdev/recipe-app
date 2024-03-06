import {users} from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const userRegister = async(req, res) => {
    const {username, password } = req.body
    try {
        const user = await users.findOne({username})
        if(user){
            return res.json({message: "User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new users({username, password: hashedPassword})
        await newUser.save()
        res.json(newUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const userLogin = async(req, res) => {
    const {username, password} = req.body
    try {
        const user = await users.findOne({username})
        if(!user){
            return res.json({message: "User dosen't exist"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.json({message: "User or Password is invalid"})
        }
        const token = jwt.sign({id: user._id}, "secret")
        res.json({userID: user._id, token})
    } catch (err) {
        res.status(500).json(err)
    }
    
}