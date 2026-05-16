import Post from "../models/post.models.js"

//create a new post
const createPost = async (req, res) => {
  try {
    const { name, description, age} = req.body;

    if(!name || !age || !description) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const post = await Post.create({name, description, age})
    res.status(200).json({
      message: "Posts created succesfully", post
    })

  } catch(error){
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts)
  } catch(error){
    res.status(500).json({
      message: "Internal Server Error", error
    })
  }
}

const updatePosts = async (req, res) => {
  try {
    //basic validation, this checks if any part of the data was updated
    if(Object.keys(req.body).length === 0){
      return res.status(400).json({
        message: "No data provided for update"
      })
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})

    if(!post) {
      return res.status(400).json({
        message: "Post not found"
      })
    }

    res.status(200).json({
      message: "Post updated successfully", post
    })

  } catch(error){
    res.status(500).json({
      message: "Internal Server Error", error
    })
  }
}

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id)

    if(!deleted) {
      return req.status(400).json({
        message: "Post not found"
      })
    }

    res.status(200).json({
      message: "Post deleted succesfully"
    })

  } catch(error){
    res.status(500).json({
      message: "Internal Server Error", error
    })
  }
}

export { createPost, getPosts, updatePosts, deletePost }