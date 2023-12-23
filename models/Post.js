import mongoose from "mongoose";

const commentsReplySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    replyText: {
      type: String,
      required: true,
      max: 187,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    hates: {
      type: Map,
      of: Boolean,
    },
    boomerangs: {
      type: Map,
      of: Boolean,
    },
    viewedProfile: {
      type: Map,
      of: Boolean,
    },
    impressions: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 13,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 13,
    },
    username: {
      type: String,
      required: true,
    },
    location: String,
    socialProfiles: String,
    description: {
      type: String,
      max: 187,
    },
    picturePath: String,
    videoPath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    hates: {
      type: Map,
      of: Boolean,
    },
    boomerangs: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: [
        {
          username: {
            type: String,
          },
          userId: {
            type: String,
            required: true,
          },
          commentText: {
            type: String,
            required: true,
          },
          likes: {
            type: Map,
            of: Boolean,
          },
          hates: {
            type: Map,
            of: Boolean,
          },
          boomerangs: {
            type: Map,
            of: Boolean,
          },
          replies: [commentsReplySchema],
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);


postSchema.methods.addCommentLike = function (commentIndex) {
  this.comments[commentIndex].likes.set(userId, true);
  return this.save();
};

postSchema.methods.addCommentHate = function (commentIndex) {
  this.comments[commentIndex].hates.set(userId, true);
  return this.save();
};

postSchema.methods.addCommentBoomerang = function (commentIndex) {
  this.comments[commentIndex].boomerangs.set(userId, true);
  return this.save();
};



const Post = mongoose.model("Post", postSchema);

export default Post;
