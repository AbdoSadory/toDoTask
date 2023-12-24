import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [10, 'title should not be less than 10 characters'],
      maxLength: [200, 'title should not be more than 200 characters'],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['toDo', 'doing', 'done'],
      required: true,
      default: 'toDo',
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

export default Task
