
import { authRouter } from "./modules/authentication/authentication.routes.js"
import { inboxRouter } from "./modules/inbox/inbox.routes.js"
import { notificationRouter } from "./modules/notification/notification.routes.js"
import { taskRouter } from "./modules/task/task.routes.js"
import { userRouter } from "./modules/user/user.routes.js"
import { AppError } from "./utils/AppError.js"


export const bootstrap = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/task', taskRouter)
    app.use('/api/user', userRouter)
    app.use('/api/notification', notificationRouter)
    app.use('/api/inbox', inboxRouter)
    app.use('*', (req, res, next) => {
        next(new AppError('error in endpoint', 404))
    })
}