const { Schema, Types } = require("mongoose");
const formatDate = require('../utils/formatDate');



const reactionSchema = new Schema(
  {
    reaction_id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reaction_body: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
    },
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      created_at: {
        type: Date,
        default: Date.now,
        get: timestamp => formatDate(timestamp)
      },
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
);

module.exports = reactionSchema;
