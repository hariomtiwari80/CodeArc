const mongoose =
  require("mongoose");

const progressSchema =
  new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },

    handle: {
      type: String,
      required: true,
      unique: true,
    },

    solvedProblems: [
      {
        type: String,
      },
    ],

    weakTopics: [
      {
        type: String,
      },
    ],

    roadmap: [
      {
        type: Object,
      },
    ],

    completion: {
      type: Number,
      default: 0,
    },

  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Progress",
    progressSchema
  );