import { Router } from "express";
import * as userCruds from "./user.controller.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import * as userValidation from "./user.validation.js";
import { validate } from "../../middleware/validation.js";



export const userRouter = Router();

userRouter
  .route('/')
  .get(protectedRoute, isAllowedTo('admin'), validate(userValidation.getUsersValidation), userCruds.getUsers)
  .post(protectedRoute, isAllowedTo('admin'), validate(userValidation.addUserValidation), checkEmail, userCruds.addUser);

userRouter
  .route('/:id')
  .get(protectedRoute, isAllowedTo('admin'), validate(userValidation.getAndDeleteUserValidation), userCruds.getUser)
  .delete(protectedRoute, isAllowedTo('admin'), validate(userValidation.getAndDeleteUserValidation), userCruds.deleteUser);
