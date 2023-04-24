const router = require("express").Router();
const { 
    getAllUsers, 
    getSingleUser,
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend
} = require("../../controllers/user");

// GET all users 
// router.get('/', getAllUsers);

// GET a single user by ID 
// router.get('/:userId', getSingleUser);

// POST a new user 
// router.post('/', createUser);

// PUT a user by ID 
// router.put('/:userId', updateUser);

// DELETE a user by ID 
// router.delete('/:userId', deleteUser);

// POST a friend to a user's friend list 
// router.post('/:userId/friends/:friendId', addFriend);

// DELETE a friend from a user's friend list 
// router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;
