const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	todoTitle: String,
	todoContent: String,
	todoDate: String,
});

const Post = mongoose.model("todo", postSchema);

module.exports = Post;
