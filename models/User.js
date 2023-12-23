import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
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
      unique: true,
      min: 4,
      max: 17,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  
   
    // friends: {
    //   type: Array,
    //   default: [],
    // },
    location: String,
    occupation: String,
    viewedProfile: {
      type: Number,
      default: 0,
    },
    impressions: {
      type: Number,
      default: 0,
    },
    socialProfiles: [
      {
        platform: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          default: "",
        },
      },
    ],
    /*posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },*/
},
  { timestamps: true }
);

// Mongoose middleware to increment 'viewedProfile' on profile view
UserSchema.pre("findOneAndUpdate", async function (next) {
  // 'this' refers to the query being executed
  const update = this.getUpdate();
  const hasViewedProfileIncrement = update.$inc && update.$inc.viewedProfile;

  if (hasViewedProfileIncrement) {
    this.update({}, { $inc: { viewedProfile: 1 } });
  }
  next();
});


// Mongoose middleware to increment 'impressions' on post interaction
UserSchema.pre("updateOne", async function (next) {
  console.log('Middleware triggered with update:', this.getUpdate());
  // 'this' refers to the query being executed
  const update = this.getUpdate();
  const impressionFields = ['likes', 'hates', 'boomerangs', 'comments'];

  const hasImpressionIncrement = Object.keys(update.$inc || {}).some((field) =>
    impressionFields.includes(field)
  );

  if (hasImpressionIncrement) {
    this.update({}, { $inc: { impressions: 1 } });
  }
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
