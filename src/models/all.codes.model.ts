import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const allCodeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },

    valueEn: String,
    valueVi: String,
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
allCodeSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("all_codes", allCodeSchema);

export default User;
