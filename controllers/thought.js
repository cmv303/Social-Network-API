const { Thoughts, Users } = require("../models/Thoughts");

const thoughtController = {
    //GET all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //GET single Thought
    getSingleThought( { params}, res) {
        Thoughts.findById(params.id)
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No thought found with matching ID!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //POST new Thought
    addThought({ body }, res) {
        Thought.create(body)
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.status(500).json(err));
      },
    
      // PUT Thought by its id
      updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(params.id, body, {
          new: true,
          runValidators: true,
        })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "Cannot update thought with that id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.status(500).json(err));
      },
    
      // DELETE Thought by its id
      deleteThought({ params }, res) {
        Thought.findByIdAndDelete(params.id)
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "Cannot delete thought by this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.status(500).json(err));
      },
    
      // POST reaction to a Thought
      addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
          params.thoughtId,
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .populate({
            path: "reactions",
            select: "-__v",
          })
          .select("-__v")
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "Cannot add your reaction to this thought!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.json(err));
      },
    
      // DELETE reaction from a Thought
      deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate(
          params.thoughtId,
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
        .populate({
            path: "reactions",
            select: "-__v",
          })
          .select("-__v")
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "Cannot delete your reaction from this thought!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.json(err));
}
}