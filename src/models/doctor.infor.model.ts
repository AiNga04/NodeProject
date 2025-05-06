import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const doctorInforSchema = new mongoose.Schema(
  {
    doctorId: userSchema,
    priceId: String,
    provinceId: String,
    paymentId: String,
    addressClinic: String,
    nameClinic: String,
    note: String,
    count: Number,
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
doctorInforSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("doctor_infors", doctorInforSchema);

export default User;
