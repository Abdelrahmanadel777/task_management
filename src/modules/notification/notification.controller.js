import { Notifications } from "../../../database/models/notification.model.js";
import { catchError } from "../../utils/catchError.js";
import { Task } from "../../../database/models/task.model.js"
import { AppError } from "../../utils/AppError.js";
import { User } from "../../../database/models/user.model.js";


export const addNotification = catchError(async (req, res, next) => {
    req.body.createdBy = req.user._id
    let task = await Task.findById(req.body.relatedTask)
    if (!task) return next(new AppError('task not found', 500))


    let notification = await Notifications.insertOne(req.body)
    res.json({ message: "success", notification })

})
export const getUserNotification = catchError(async (req, res, next) => {
    let userNotification = await Notifications.find({ assignedTo: req.params.id })

    if (!userNotification) return next(new AppError('no notifications for that user', 500))


    res.json({ message: "success", userNotification })
})
export const deleteNotification = catchError(async (req, res, next) => {
    let note = await Notifications.findById(req.params.id)
    if (!note) return next(new AppError('notification not found', 404))
    let deletedNote = await Notifications.findByIdAndDelete(req.params.id)
    res.json({ message: "deleted", deletedNote })

})
export const updateNotification = catchError(async (req, res, next) => {
    let note = await Notifications.findById(req.params.id)
    if (!note) return next(new AppError('notification not found', 404))
    let updatedNote = await Notifications.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: "updated", updatedNote })

})
export const getNotification = catchError(async (req, res, next) => {
    let notification = await Notifications.findById(req.params.id)
    if (!notification) return next(new AppError('notification not found', 404))
    notification.isRead = true
    notification.save()
    res.json({ message: "success", notification })
})
