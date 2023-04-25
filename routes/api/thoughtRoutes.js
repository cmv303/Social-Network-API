const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require("../../controllers/thought");

// GET all thoughts
router.get("/", getAllThoughts);

// GET a single thought by ID
router.get("/:thoughtId", getSingleThought);

// POST a new thought
// router.post("/", createThought);

// PUT to update a thought by ID
router.put("/:thoughtId", updateThought);

// DELETE a thought by ID
router.delete("/:thoughtId", deleteThought);

// POST a new reaction to a thought by ID
router.post("/:thoughtId/reactions", addReaction);

// DELETE a reaction from a thought by ID and reaction ID
router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
