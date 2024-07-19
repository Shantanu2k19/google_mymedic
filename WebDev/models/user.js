import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, default:"default_username"},
        email: { type: String, required: true },
        password: { type: String, required: false },
        image: { type: String, required: false, default:"/assets/user.svg" },
        isgooglelogin: { type:Boolean, require:true, default:false }, 
        age: { type: Number, required: false, default:-1 },
        gender: { type: String, required: false, default:"_" },
    }, 
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;