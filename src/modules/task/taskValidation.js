import Joi from "joi";

export const addTaskValidation = Joi.object({
    title: Joi.string().max(100).min(2).required(),
    description: Joi.string().max(500).min(20).required(),
    dueDate: Joi.date().min(new Date()).max(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).required(),
    priority: Joi.string().valid("high", "medium", "normal", "low"),
    status: Joi.string().valid('to do', 'in progress', 'completed'),
    assignedTo: Joi.array().items(Joi.string().hex().length(24)).required(),
    createdBy: Joi.string().hex().max(24)
})
export const getTasksValidation = Joi.object({
    title: Joi.string().max(100).min(2),
    description: Joi.string().max(500).min(20),
    dueDate: Joi.date().min(new Date()).max(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
    priority: Joi.string().valid("high", "medium", "normal", "low"),
    status: Joi.string().valid('to do', 'in progress', 'completed'),
    assignedTo: Joi.array().items(Joi.string().hex().length(24)),
    createdBy: Joi.string().hex().max(24)
})
export const updateTaskValidation = Joi.object({
    id: Joi.string().hex().length(24),
    title: Joi.string().max(100).min(2),
    description: Joi.string().max(500).min(20),
    dueDate: Joi.date().min(new Date()).max(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
    priority: Joi.string().valid("high", "medium", "normal", "low"),
    status: Joi.string().valid('to do', 'in progress', 'completed'),
    assignedTo: Joi.array().items(Joi.string().hex().length(24)),
    createdBy: Joi.string().hex().max(24)
})
export const deleteAndGetTaskValidation = Joi.object({
    id: Joi.string().hex().length(24).required(),

})