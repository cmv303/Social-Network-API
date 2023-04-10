const router = require("express").Router();
const { 
    getAllUsers, 
    getSingleUser
} = require("../../controllers/user");