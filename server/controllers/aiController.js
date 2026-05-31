const {generateRoadmapAI}=require("../services/groqService");
const generateRoadmap=async(req,res)=>{
  try{
    const { weakTopics } = req.body;
    const roadmap =
      await generateRoadmapAI(
        weakTopics
      );

    res.status(200).json({
      success: true,
      roadmap,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  generateRoadmap,
};