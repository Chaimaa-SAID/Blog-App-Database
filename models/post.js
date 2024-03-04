const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author :{ type: mongoose.Types.ObjectId, ref:'User'} // ref is the model name of User
  },
  {
    timestamps: true ,
  });
  const Post = mongoose.model('post', postSchema);
  module.exports = Post ;