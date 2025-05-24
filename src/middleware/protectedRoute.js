import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/AppError.js"
import jwt from 'jsonwebtoken'
import { catchError } from "../utils/catchError.js"

export const protectedRoute = catchError(async (req, res, next) => {
    let token = req.headers.token
    let userPayLoad = null
    if (!token) return next(new AppError('token is unsend', 401))
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) return next(new AppError('invalid token', 401))
        userPayLoad = payload
    })
    let user = await User.findById(userPayLoad.userId)
    if (!user) return next(new AppError('user is not found', 401))
    let time = parseInt(user.passwordChangedAt?.getTime() / 1000)
    if (time > userPayLoad.iat) return next(new AppError('unauthorized', 401))
    req.user = user

    next()




})