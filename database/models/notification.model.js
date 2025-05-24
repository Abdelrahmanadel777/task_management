import { model, Schema } from "mongoose";

const notificationSchema = new Schema({
    assignedTo: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['task_created', 'task_updated', 'task_due', 'general'],
        default: 'general'
    },
    relatedTask: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        default: null
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true, versionKey: false
})

export const Notifications = model('Notifications', notificationSchema);
