import jwt from 'jsonwebtoken'
import { User } from "../../../database/models/user.model.js"
import { AppError } from "../../utils/AppError.js"

import { catchError } from "../../utils/catchError.js"



export const getUser = catchError(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (!user) return next(new AppError('this user is not exist', 501))

    res.json({ message: "success", user })
})
export const getUsers = catchError(async (req, res, next) => {
    let users = await User.find(req.body)
    if (!users) return next(new AppError('no user exist', 501))

    res.json({ message: "success", users })
})
export const addUser = catchError(async (req, res, next) => {

    let user = User(req.body)
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
    await user.save()
    res.json({ message: "success", user, token })
})
export const deleteUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndDelete(req.params.id)
    if (!user) return next(new AppError('this user is not exist', 501))
    res.json({ message: "deleted", user })
})




