import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const scheduleSchema = new mongoose.Schema(
  {
    currentNumber: Number,
    maxNumber: Number,
    date: Date,
    timeType: String,
    doctorId: userSchema,
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
scheduleSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("schedules", scheduleSchema);

export default User;
