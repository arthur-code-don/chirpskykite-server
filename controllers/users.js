import User from "../models/User.js";
import mongoose from "mongoose";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


// GET USERS FRIENDS 
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );

    const formattedFriends = friends.map(({ _id, firstName, lastName, username, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, username, occupation, location, picturePath };
    });

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};





// export const getUserFriends = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({ _id, firstName, lastName, username, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, username, occupation, location, picturePath };
//       }
//     );
//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };




// ADD AND REMOVE FRIENDS

// export const addRemoveFriend = async (req, res) => {
//   try {
//     const { id, friendId } = req.params;
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);

//     if (!user || !friend) {
//       return res.status(404).json({ message: 'User or friend not found' });
//     }

//     if (user.friends.includes(friendId)) {
//       user.friends = user.friends.filter((userId) => userId.toString() !== friendId);
//       friend.friends = friend.friends.filter((userId) => userId.toString() !== id);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }

//     await user.save();
//     await friend.save();

//     const updatedUser = await User.findById(id);

//     const friends = await Promise.all(
//       updatedUser.friends.map((userId) => User.findById(userId))
//     );

//     const formattedFriends = friends.map(({ _id, firstName, lastName, username, occupation, location, picturePath }) => {
//       return { _id, firstName, lastName, username, occupation, location, picturePath };
//     });

//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };





/* ADD / REMOVE FRIEND */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found." });
    }

    // Check if friendId is a valid ObjectId
    if (!mongoose.isValidObjectId(friendId)) {
      return res.status(400).json({ message: "Invalid friendId." });
    }

    if (user.friends.includes(friendId) && friend.friends.includes(id)) {
      // Remove friendId from the friends array for the current user
      user.friends = user.friends.filter((friend) => friend.toString() !== friendId);

      // Remove id from the friends array for the friend user
      friend.friends = friend.friends.filter((friend) => friend.toString() !== id);
    } else {
      // Add friendId to the friends array for the current user
      user.friends.push(friendId);

      // Add id to the friends array for the friend user
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, username, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, username, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


// SAVE SOCIAL PROFILE URLS
export const updateSocialProfiles = async (req, res) => {
  const { userId } = req.params;
  const { socialProfiles } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's social profiles
    user.socialProfiles = socialProfiles;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Social profiles updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};