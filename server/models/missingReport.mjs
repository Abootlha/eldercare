import mongoose from "mongoose";

const missingPersonSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  lastSeenDate: { type: String, required: true },
  description: { type: String, required: true },
  contactInfo: { type: String, required: true },
  "media.Image": { type: String, required: true }, // URL to the image stored in Cloudinary
  createdAt: { type: Date, default: Date.now },
});

const MissingPerson = mongoose.model("MissingPerson", missingPersonSchema);

export default MissingPerson;
