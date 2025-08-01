import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  url: String,
  category: String,
  title: String,
  content: String,
  image: String,
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
