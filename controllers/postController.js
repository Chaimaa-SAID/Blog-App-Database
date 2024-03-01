const Post = require('../models/post');



function getAllPosts(req, res) {
    const post = Post.find({}).then((posts)=> {
        res.send(posts);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Server error");
    });
}


function createPost(req, res) {
    const newPost = new Post({
        title: req.body.title, 
        content: req.body.content
    })
      newPost.save()
        .then((post) => res.send(post))
        .catch((err)=>{
            console.log(err);
            res.status(500).send("Server error");})
}

function updatePost(req, res) {
    const postId = req.params.id;
    const update = {
        title: req.body.title,
        content: req.body.content
    };
    Post.findOneAndUpdate(
        { _id: postId},
        { $set: update }
      )
        .then((post) => {
          if (post) res.send("post updated successfully: ");
          else res.send("post not found");
        })
        .catch((error) => res.send("Error fetching posts: "+ error));
}

function deletePost(req, res) {
    const {id}= req.params;
    Post.findOneAndDelete({_id:id})
  .then((post) => {
    if (post) res.send("post deleted successfully: ");
    else res.send("post not found");
  })
.catch((error) => res.send("Error deleting post: "+ error));
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
};
