import { model, Schema, Types } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        image: String,
        passwordChangedAt: Date,
        completedTask: [
            {
                taskId: Types.ObjectId,
                task: String
            }
        ]
    },
    {
        timestamps: true, versionKey: false
    }
);
userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)
})
userSchema.post('init', function (data) {
    if (data.image) data.image = `http://localhost:3000/uploads/${data.image}`
    if (data.completedTask) data.completedTask.forEach((obj) => { if (obj.task) obj.task = `http://localhost:3000/uploads/${obj.task}` })
})




export const User = model("User", userSchema)


