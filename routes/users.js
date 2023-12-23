import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,updateSocialProfiles
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
// Update social profiles
router.put('/:userId/social-profiles', verifyToken, updateSocialProfiles, async (req, res) => {
  const userId = req.params.userId;
  const { socialProfiles } = req.body;

  try {
    // Assuming you have a User model
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's social profiles
    user.socialProfiles = socialProfiles;

    // Save the updated user
    await user.save();
    updateSocialProfiles();

    res.status(200).json({ message: 'Social profiles updated successfully' });
  } catch (error) {
    console.error('Error updating social profiles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;