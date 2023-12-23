import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE POST*/
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, videoPath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      videoPath,
      likes: new Map(), // Initialize likes as a Map
      hates: new Map(), // Initialize hates as a Map
      boomerangs: new Map(), // Initialize boomerangs as a Map
      viewedProfile: new Map(),
      impressions: new Map(),
      comments: [], // Initialize comments as an empty array

    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};



/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE LIKES*/
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



/* UPDATE HATES*/
export const hatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isHated = post.hates.get(userId);

    if (isHated) {
      post.hates.delete(userId);
    } else {
      post.hates.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { hates: post.hates },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};




 /* UPDATE BOOMERANGS */
export const boomerangPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isBoomeranged = post.boomerangs.get(userId);

    if (isBoomeranged) {
      post.boomerangs.delete(userId);
    } else {
      post.boomerangs.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { boomerangs: post.boomerangs },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  
};




/* CREATE COMMENT */
export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, commentText } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }


    // Fetch the user's username based on userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }



    const newComment = {
      userId,
      username: user.username, // Include the username
      commentText,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};







// Add these functions to your comments controller

// Like a comment
export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLikedComment = post.likes.get(userId);

    if (isLikedComment) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};






// Similar functions for hateComment and boomerangComment





/* CREATE COMMENT REPLY */
export const commentReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, replyText } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }


    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Fetch the user's username based on userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReply = {
      userId,
      username: user.username, // Include the username
      replyText,
      createdAt: new Date(),
    };

    comment.replies.push(newReply);
    await post.save();

    res.status(201).json(newReply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
