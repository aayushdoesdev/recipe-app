import express, { Router } from "express"
import { userLogin, userRegister } from "../controllers/users.controller.js"

const router = Router()

router.post("/register", userRegister)

router.post("/login", userLogin)

export {router as userRouter}