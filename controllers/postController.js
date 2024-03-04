const Post = require('../models/post');
const User = require('../models/User');


const postsPerPage = 3;
const getUser = async (email)=>{
    console.log(email);
const user = await User.findOne({ email: email})

return user._id;
}

function getAllPosts(req, res) {
 
    const page = req.query.p || 0;
    Post.find({})
        .skip(page * postsPerPage)
        .limit(postsPerPage)
        .then(posts => {
            res.send(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Server error");
        });

    
}

async function createPost(req, res) {
    const userId = getUser(req.decoded.email);
    const newPost = new Post({
        title: req.body.title, 
        content: req.body.content,
        author : await userId 
    })
  
      newPost.save()
        .then((post) => res.send(post))
        .catch((err)=>{
            console.log(err);
            res.status(500).send("Server error");})
}

async function updatePost(req, res) {
    const postId = req.params.id;
    const update = {
        title: req.body.title,
        content: req.body.content
    };
    const userId = await  getUser(req.decoded.email);  

    Post.findOneAndUpdate(
      
        { _id: postId,author : userId }, // filter
        { $set: update }
      )
        .then((post) => {
          if (post) res.send("post updated successfully: ");
          else res.send("cannot update this post ");


        })
        .catch((error) => res.send( error.message));
}

async function deletePost(req, res) {
    const {id}= req.params;
    const userId = await  getUser(req.decoded.email); 
    Post.findOneAndDelete({_id:id, author:userId })

  .then((post) => {
    if (post) res.send("post deleted successfully: ");
    else res.send("cannot delete this post");
  })
.catch((error) => res.send("Error deleting post: "+ error));
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
};
