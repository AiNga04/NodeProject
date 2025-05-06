import mongoose, { Schema } from "mongoose";
import mongoose_delete from "mongoose-delete";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: String,
    description: String,
    usersInfor: userSchema,
    projectInfor: projectSchema,
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
projectSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Task = mongoose.model("tasks", taskSchema);

export default Task;
