import Joi from "joi";

export const addNotifyValidation = Joi.object({
    assignedTo: Joi.array().items(Joi.string().hex().length(24)).required(),
    message: Joi.string().max(50).min(2).required(),
    type:Joi.string().valid('task_created', 'task_updated', 'task_due', 'general'),
    relatedTask: Joi.string().hex().length(24),
})
export const getUserNotificationValidation = Joi.object({
    id: Joi.string().hex().length(24).required(),

})
