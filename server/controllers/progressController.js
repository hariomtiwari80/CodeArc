const Progress =
  require("../models/Progress");
const saveProgress =
  async (req, res) => {

    try {

      const {
        userId,
        handle,
        solvedProblems,
        weakTopics,
        roadmap,
        completion,
      } = req.body;

      let progress =
        await Progress.findOne({
          handle,
        });
      if (progress) {

        progress.solvedProblems =
          solvedProblems;

        progress.weakTopics =
          weakTopics;

        progress.roadmap =
          roadmap;

        progress.completion =
          completion;

        await progress.save();

        return res.status(200).json({
          success: true,
          message:
            "Progress Updated",
          progress,
        });

      }

      progress =
        await Progress.create({
            userId,
          handle,

          solvedProblems,

          weakTopics,

          roadmap,

          completion,

        });

      res.status(201).json({
        success: true,
        message:
          "Progress Saved",
        progress,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });

    }
  };

const getProgress =
  async (req, res) => {

    try {

      const { handle } =
        req.params;

      const progress =
        await Progress.findOne({
          userId,
        });

      res.status(200).json({
        success: true,
        progress,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });

    }
  };

module.exports = {
  saveProgress,
  getProgress,
};