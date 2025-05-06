import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const clinicSchema = new mongoose.Schema(
  {
    address: String,
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
clinicSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("clinics", clinicSchema);

export default User;
