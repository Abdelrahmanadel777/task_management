import { Task } from "../../../database/models/task.model.js"
import { User } from "../../../database/models/user.model.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"

export const addTask = catchError(async (req, res, next) => {
    req.body.createdBy = req.user._id
    let task = await Task.insertMany(req.body)
    res.json({ message: "added", task })


})

export const getTask = catchError(async (req, res, next) => {
    const { id } = req.params
    let task = await Task.findById(id)
    if (!task) return next(new AppError('Task not found', 404))
    res.json({ message: "success", task })
})
export const getUserTasks = catchError(async (req, res, next) => {
    const { id } = req.params

    let tasks = await Task.find({ assignedTo: id }).populate('assignedTo').populate('createdBy')
    if (!tasks) return next(new AppError('no tasks for that user', 404))
    res.json({ message: "success", tasks })
})
export const getTasks = catchError(async (req, res, next) => {

    if (req.body.assignedTo) {
        req.body.assignedTo = { $all: req.body.assignedTo }
    }


    let tasks = await Task.find(req.body).populate('assignedTo').populate('createdBy')


    if (!tasks) return next(new AppError('no tasks available', 404))
    { tasks.length == 0 ? res.json({ message: "no tasks available" }) : res.json({ message: "success", tasks }) }
})
export const addToTrash = catchError(async (req, res, next) => {
    const { id } = req.params
    let task = await Task.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    if (!task) return next(new AppError('task not found', 404))
    res.json({ message: "updated", task })
})
export const getTrash = catchError(async (req, res, next) => {
    let trash = await Task.find({ isDeleted: true })
    if (!trash) return next(new AppError('trash is empty', 404))


    res.json({ message: "success", trash })
})
export const deleteTask = catchError(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        return next(new AppError('Task not found', 404));
    }

    res.json({ message: "Task deleted successfully" });
});

export const updateTask = catchError(async (req, res, next) => {
    const { id } = req.params
    let task = await Task.findByIdAndUpdate(id, req.body, { new: true })
    if (!task) return next(new AppError('task is not found', 500))
    res.json({ message: "updated", task })
})
export const uploadUserTask = catchError(async (req, res, next) => {
    console.log(req.file);

    let task = await Task.findById(req.body.taskId)
    if (!task) return next(new AppError('no task found', 404))
    let user = await User.findById(req.body.userId)
    if (!user) return next(new AppError('user not found', 404))
    let userExist = task.assignedTo.includes(req.body.userId)
    if (!userExist) return next(new AppError('this user is not assigned to this task', 400))
    user.completedTask.push({ taskId: req.body.taskId, task: req.file.filename })
    await user.save()
    res.json({ message: "success", user, task })
})
export const CompletedTask = catchError(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(id, { status: 'completed' }, { new: true });
    if (!task) return next(new AppError('No task found', 404));

    await Promise.all(task.assignedTo.map(async (userId) => {
        const user = await User.findById(userId);
        const hasCompleted = user.completedTask?.some(obj => obj.taskId.toString() === id);

        if (!hasCompleted) {
            return next(new AppError('This task is not completed by the user yet', 400));
        }
    }));

    res.json({ message: 'Task is marked as completed', task });
});








