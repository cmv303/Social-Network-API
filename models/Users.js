const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
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
              validate: {
                  validator: function(v) {
                      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                  },
                  message: (props) => `${props.value} is not a valid email or password`,
              },
          },
          thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: "Thought",
            },
          ],
          friends: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          ],
        },
        {
          toJSON: {
            virtuals: true,
          },
          id: false,
        }
      );

      // virtual to get the length of the user's friends array
      userSchema.virtual("friendCount").get(function () {
        return this.friends.length;
      });

      const User = mongoose.model("User", userSchema);

module.exports = Users;
