import { Router } from "express";
import * as inboxCruds from "./inbox.controller.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";

export const inboxRouter = Router()
inboxRouter.route('/getStarredInbox').get(protectedRoute, isAllowedTo('admin', 'user'), inboxCruds.getStarredInbox)

inboxRouter.route('/')
  .delete(protectedRoute, isAllowedTo('admin', 'user'), inboxCruds.deleteInbox)
inboxRouter.route('/:id')
  .post(protectedRoute, isAllowedTo('admin'), inboxCruds.addInbox)
  .get(protectedRoute, isAllowedTo('admin', 'user'), inboxCruds.getInbox)


inboxRouter.route('/markAllAsRead').put(protectedRoute, isAllowedTo('user', 'admin'), inboxCruds.markAllAsRead)
inboxRouter.route('/userInbox/:id').get(protectedRoute, isAllowedTo('admin', 'user'), inboxCruds.getUserInbox)
inboxRouter.route('/deleteAllInbox').delete(protectedRoute, isAllowedTo('admin', 'user'), inboxCruds.deleteAllInbox)
inboxRouter.route('/starredInbox').put(protectedRoute, isAllowedTo('admin', 'user'), inboxCruds.starredInbox)
