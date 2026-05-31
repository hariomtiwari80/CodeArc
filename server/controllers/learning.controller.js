const groq =
  require("../config/groq");

const generateHint = async (
  req,
  res
) => {

  try {

    const { problem } = req.body;

    const prompt = `

Generate EXACTLY 3 DSA hints.

Return ONLY JSON.

{
  "hints": [
    "hint1",
    "hint2",
    "hint3"
  ]
}

Problem:
${problem}

`;

    const completion =
      await groq.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

      });

    const content =
      completion.choices[0]
        .message.content;

    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed =
      JSON.parse(cleaned);

    return res.json({
      hints: parsed.hints,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Hint generation failed",
    });

  }

};

const generatePseudocode =
  async (req, res) => {

  try {

    const { problem } = req.body;

    const prompt = `

You are a DSA mentor.

Generate beginner friendly pseudocode.

Rules:
- No real programming language
- Easy to understand
- Step-by-step
- Clean formatting

Problem:
${problem}

`;

    const completion =
      await groq.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

      });

    const pseudocode =
      completion.choices[0]
        .message.content;

    return res.json({
      pseudocode,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Pseudocode generation failed",
    });

  }

};

module.exports = {
  generateHint,
  generatePseudocode,
};