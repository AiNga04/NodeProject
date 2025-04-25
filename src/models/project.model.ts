import mongoose, { Schema } from "mongoose";
import mongoose_delete from "mongoose-delete";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    description: String,
    customerInfor: userSchema,
    usersInfor: [{ type: Schema.Types.ObjectId, ref: "users" }],
    leader: userSchema,
    tasks: [{ type: Schema.Types.ObjectId, ref: "tasks" }],
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
projectSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Project = mongoose.model("projects", projectSchema);

export default Project;
