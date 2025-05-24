import { AppError } from "../utils/AppError.js"

export const validate = (schema) => {

    return (req, res, next) => {
        let { error } = schema.validate({ ...req.body, ...req.params, ...req.query })



        if (!error) return next()

        next(new AppError(error.message, 400))



    }
}