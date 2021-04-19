const router = require("express").Router();
const Comment = require("../models/comment");
const Blog = require('../models/blog')


router.get("/", async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments.map((u) => u.toJSON()));
});

router.post("/", async (request, response) => {
  try {
    const comment = new Comment(request.body);
    const ret = await comment.save();
    response.status(201).json(ret);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
