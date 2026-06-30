const mongoose = require("mongoose");

const generateDriverId = () => {
  return `DRV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["admin","manager","driver","user"],
        default:"user"
    },

    driverId: {
      type: String,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      enum: ["Available", "Busy", "On Leave"],
      default: "Available",
    }
},
{
    timestamps:true
});

userSchema.pre("save", function () {
  if (this.role === "driver" && !this.driverId) {
    this.driverId = generateDriverId();
  }
});
module.exports = mongoose.model("User",userSchema);