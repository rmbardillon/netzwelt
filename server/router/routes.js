const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", (req, res) => {
    res.send("API is working");
});

router.post("/insertTodos", (req, res) => {
    Post.create(req.body).then((post) => {
        res.send(post);
    }).catch((err) => {
        res.send(err.message);
    });
});

router.get("/getTodos", async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get("/getTodoById/:id", async (req, res) => {
	try {
		const posts = await Post.findById(req.params.id);
		res.json(posts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.put("/updateTodoById/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate({_id: req.params.id}, {todoTitle: req.body.todoTitle, todoContent: req.body.todoContent, todoDate: req.body.todoDate});
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/deleteTodoById/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete({_id: req.params.id});
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
