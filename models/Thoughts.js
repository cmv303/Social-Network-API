const { Schema, Types } = require("mongoose");
const reactionSchema = require('./Reactions');
const formatDate = require('../utils/formatDate');

const thoughtSchema = new Schema(
  {
    thought_text: {
      type: String,
      required: true,
      minLenth: 1,
      maxLength: 280
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: timestamp => formatDate(timestamp)
      },
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      reactions: [reactionSchema]
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})

const Thoughts = model("Thoughts", thoughtSchema)


module.exports = Thoughts;
