import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const bookingSchema = new mongoose.Schema(
  {
    statusId: String,
    doctorId: userSchema,
    patientid: userSchema,
    date: Date,
    timeType: String,
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
bookingSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("bookings", bookingSchema);

export default User;
