const { Users, Thoughts } = require('../models');
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
}