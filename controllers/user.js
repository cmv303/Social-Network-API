const { Users } = require('../models/Users');
const { Thoughts } = require('../models/Thoughts');
const userController = {
    getAllUsers(req, res) {
        Users.find()
            .select("-__v")
            .then((userData) => {
                res.json(userData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    getSingleUser(req, res) {
        Users.findOne({_id: req.params.userId})
            .select("-__v")
            .populate("friends")
            .populate("thoughts")
            .then((userData) => {
                if(!userData) {
                    return res.status(404).json({message: "No user found!"})
                }
                res.json(userData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    // Create a new user
  createUser(req, res) {
    Users.create(req.body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // PUT a user by id
  updateUser(req, res) {
    Users.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found!' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // DELETE a user by id
  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found!' });
        }
        // Remove the user's thoughts
        return Thoughts.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'the User and their thoughts have been deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST a friend to a user's friend list
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No friend found!' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //DELTE a friend from a user's friend list
  deleteFriend(req, res) {
    Users.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "No friend found!" });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

module.exports = userController;