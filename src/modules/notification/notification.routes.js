import { Router } from "express";
import { addNotification, deleteNotification, getNotification, getUserNotification, updateNotification } from "./notification.controller.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import { checkUsers } from "../../middleware/checkUsers.js";
import { validate } from "../../middleware/validation.js";
import { addNotifyValidation, getUserNotificationValidation } from "./notification.validation.js";

export const notificationRouter = Router()
notificationRouter.route('/')
    .post(protectedRoute, isAllowedTo('admin'), validate(addNotifyValidation), checkUsers, addNotification)
notificationRouter.route('/:id')
    .get(protectedRoute, isAllowedTo('user', 'admin'), validate(getUserNotificationValidation), getNotification)
    .put(protectedRoute, isAllowedTo('user', 'admin'), validate(getUserNotificationValidation), updateNotification)
    .delete(protectedRoute, isAllowedTo('user', 'admin'), validate(getUserNotificationValidation), deleteNotification)
notificationRouter.route('/userNotes/:id')
    .get(protectedRoute, isAllowedTo('user', 'admin'), validate(getUserNotificationValidation), getUserNotification)
