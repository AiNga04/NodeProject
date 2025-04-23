import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address: String,
        image: String,
        description: String,
    },
    {
        timestamps: true,
        statics: {}
    }
);

// Apply mongoose-delete plugin with overrideMethods: 'all' to override default methods
userSchema.plugin(mongoose_delete, {overrideMethods: 'all'});

const User = mongoose.model('users', userSchema);

export default User;