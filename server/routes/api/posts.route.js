const express = require("express");
const mongodb = require("mongodb");
const Post = require("../../models/post.model");
const router = express.Router();
const checkAuth = require("../../middlewares/check-auth");

//get

router.get("/", async (req, res) => {
  const posts = Post.find();

  posts
    .then(posts => {
      res.status(200).json({
        posts
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Fetching total post failed"
      });
    });
});

//add

router.post("/", checkAuth, async (req, res) => {
  const { title, content } = req.body;

  const post = new Post({
    title,
    content
  });

  await post
    .save()
    .then(createdPost => {
      res.json({
        message: "Post Added seccesfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Creating a Post failed!"
      });
    });
});

//del

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Post.deleteOne({ _id: id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Post Deleted seccesfully"
        });
      } else {
        res.status(401).json({
          message: "Sorry, this post was not made by you"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Couldnt update post!"
      });
    });
});

module.exports = router;
