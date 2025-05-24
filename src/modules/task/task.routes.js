import { Router } from "express";
import * as taskCruds from "./task.controller.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import { validate } from "../../middleware/validation.js";
import * as taskValidation from "./taskValidation.js";
import { checkUsers } from "../../middleware/checkUsers.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";



export const taskRouter = Router();

taskRouter
  .route('/')
  .post(protectedRoute, isAllowedTo('admin'), validate(taskValidation.addTaskValidation), checkUsers, taskCruds.addTask)
  .get(protectedRoute, isAllowedTo('admin'), taskCruds.getTasks);
taskRouter
  .route('/getTrash')
  .get(protectedRoute, isAllowedTo('admin'), taskCruds.getTrash);
taskRouter.route('/:id')
  .put(protectedRoute, isAllowedTo('admin'), validate(taskValidation.updateTaskValidation), taskCruds.updateTask)
  .delete(protectedRoute, isAllowedTo('admin'), validate(taskValidation.deleteAndGetTaskValidation), taskCruds.deleteTask)
  .get(protectedRoute, isAllowedTo('admin'), validate(taskValidation.deleteAndGetTaskValidation), taskCruds.getTask)

taskRouter.route('/userTasks/:id')
  .get(protectedRoute, validate(taskValidation.deleteAndGetTaskValidation), taskCruds.getUserTasks)


taskRouter
  .route('/trash/:id')
  .put(protectedRoute, isAllowedTo('admin'), validate(taskValidation.deleteAndGetTaskValidation), taskCruds.addToTrash)
taskRouter.route('/uploadTask')
  .post(protectedRoute, isAllowedTo('user', 'admin'), uploadSingleFile('task', 'image'), taskCruds.uploadUserTask)
taskRouter.route('/completedTask/:id')
  .put(protectedRoute, isAllowedTo('admin'), taskCruds.CompletedTask)  
