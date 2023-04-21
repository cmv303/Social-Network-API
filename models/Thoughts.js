const { Schema, model, Types } = require("mongoose");
const reactionSchema = require('./Reactions');
const moment = require('moment');
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
        get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm a')
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
          virtuals: true,
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
