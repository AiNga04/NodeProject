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

const markdownSchema = new mongoose.Schema(
  {
    doctorId: userSchema,
    clinicId: clinicSchema,
    specialtyid: String,
    contentHTML: String,
    contentMarkdown: String,
    description: String,
  },
  {
    timestamps: true,
    statics: {},
  }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
markdownSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("markdowns", markdownSchema);

export default User;
