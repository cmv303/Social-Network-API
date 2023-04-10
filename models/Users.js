const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
          username: {
            type: String,
            unique: true,
            required: true,
            trim: true
          },
          email: {
            type: String,
            unique: true,
            required: [true, "Email required"],
              match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
          },
          thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: "Thoughts",
            },
          ],
          friends: [
            {
              type: Schema.Types.ObjectId,
              ref: "Users",
            },
          ],
        },
        {
          toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false,
        }
      );

      // virtual to get the length of the user's friends array
      userSchema.virtual("friendCount").get(function () {
        return this.friends.length;
      });

      const Users = mongoose.model("Users", userSchema);

module.exports = Users;
