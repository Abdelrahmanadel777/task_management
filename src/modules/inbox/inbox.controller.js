import { Inbox } from "../../../database/models/inbox.model.js";
import { User } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";

export const addInbox = catchError(async (req, res, next) => {
    req.body.sender = req.user._id
    req.body.receiver = req.params.id
    let user = await User.findById(req.params.id)
    if (!user) return next(new AppError('this user is not exist', 404))
    let inbox = await Inbox.insertOne(req.body)
    res.json({ message: "success", inbox })
})
export const getUserInbox = catchError(async (req, res, next) => {
    const { id } = req.params
    let user = await User.findById(id)
    if (!user) return next(new AppError('this user is not exist', 404))
    let userInbox = await Inbox.find({ receiver: id })
    if (!userInbox) return next(new AppError('no inbox for that user', 404))
    res.json({ message: "success", userInbox })
})
export const getInbox = catchError(async (req, res, next) => {
    const { id } = req.params
    let inbox = await Inbox.findById(id)
    if (!inbox) return next(new AppError('no inbox found', 404))
    inbox.isRead = true
    inbox.save()
    res.json({ message: 'success', inbox })
})
export const markAllAsRead = catchError(async (req, res, next) => {
    let inboxes = await Inbox.updateMany(
        { isRead: false },
        { $set: { isRead: true } }
    )
    if (inboxes.modifiedCount == 0) return next(new AppError('something is wrong', 400))
    res.json({ message: "success", inboxes })

})

export const deleteInbox = catchError(async (req, res, next) => {
    let inboxes = await Promise.all(req.body.inboxes.map((inbox) => Inbox.findByIdAndDelete(inbox)))
    if (!inboxes) return next(new AppError('some inboxes is not exist', 404))
    res.json({ message: "deleted", inboxes })
})
export const deleteAllInbox = catchError(async (req, res, next) => {
    let deletedInbox = await Inbox.deleteMany({})
    if (deletedInbox.acknowledged !== true) {
        return next(new AppError('something is wrong', 400))
    } else {
        res.json({ message: "all inboxes have been deleted" })
    }
})
export const starredInbox = catchError(async (req, res, next) => {
    let inboxes = await Promise.all(req.body.inboxes.map((inboxId) => {
        return Inbox.findByIdAndUpdate(inboxId, { isStarred: true }, { new: true })
    }))
    if (!inboxes) return next(new AppError('no inbox found', 404))
    res.json({ message: "updated", inboxes })
})
export const getStarredInbox = catchError(async (req, res, next) => {
    let starredInboxes = await Inbox.find({ isStarred: true })
    if (!starredInboxes) return next(new AppError('empty inbox', 404))
    res.json({ message: "success", starredInboxes })
})
