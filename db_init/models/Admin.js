const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema(
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
  },
  { collection: "admin_user" }
);

module.exports = Admin = mongoose.model("admin", AdminSchema);
