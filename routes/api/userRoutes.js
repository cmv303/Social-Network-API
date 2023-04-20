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


// GET all users /api/users
router.get('/', getAllUsers);

// GET a single user by ID /api/users/:userId
router.get('/:userId', getSingleUser);

// POST a new user /api/users
router.post('/', createUser);

// PUT update a user by ID /api/users/:userId
router.put('/:userId', updateUser);

// DELETE remove a user by ID /api/users/:userId
router.delete('/:userId', deleteUser);

// POST add a friend to a user's friend list /api/users/:userId/friends/:friendId
router.post('/:userId/friends/:friendId', addFriend);

// DELETE remove a friend from a user's friend list /api/users/:userId/friends/:friendId
router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;
