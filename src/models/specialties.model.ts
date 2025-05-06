import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const specialtySchema = new mongoose.Schema(
  {
    description: String,
    image: String,
    name: String,
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
specialtySchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("specialties", specialtySchema);

export default User;
