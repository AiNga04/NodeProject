import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const clinicSchema = new mongoose.Schema({
  address: String,
  description: String,
  name: String,
});

const specialtySchema = new mongoose.Schema({
  description: String,
  name: String,
});

const doctorClinicSpecialtySchema = new mongoose.Schema(
  {
    doctorId: userSchema,
    clinicId: clinicSchema,
    date: Date,
    specialtyId: specialtySchema,
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
doctorClinicSpecialtySchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("specialties", doctorClinicSpecialtySchema);

export default User;
