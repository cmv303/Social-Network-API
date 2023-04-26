const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

//starts at /api, and then this procedes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

router.use((req, res) => res.send(
    "oops! Nothing here either!"));
    
module.exports = router;