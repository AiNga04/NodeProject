import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const historySchema = new mongoose.Schema(
  {
    patientid: userSchema,
    doctorid: userSchema,
    description: String,
    files: String,
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
historySchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("histories", historySchema);

export default User;
