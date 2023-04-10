const { Model, DataTypes } = require("mongoose");

class Thoughts extends Model {}

Thoughts.init(
  {
    thoughts_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.String,
      unique: true,
      allowNull: false,
      trim: true
    },
    thought_text: {
      type: DataTypes.String,
      unique: true,
      allowNull: false,
    },
    created_at: {
        type: DataTypes.String,
        unique: true,
        allowNull: false,
      },
      reaction: {
        type: DataTypes.String,
        unique: true,
        allowNull: false,
      }
    },
);


module.exports = Thoughts;
