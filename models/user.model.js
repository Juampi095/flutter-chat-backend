const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

// Define el método "toJson" para excluir campos sensibles
UserSchema.method("toJson", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id; // Renombra "_id" a "uid"
  return object;
});

module.exports = model("User", UserSchema);
