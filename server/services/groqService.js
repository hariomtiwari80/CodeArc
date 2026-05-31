const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateRoadmapAI = async (
  weakTopics
) => {

  try {

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",

            content: `
You are an expert competitive programming mentor.

The student is weak in ONLY these topics:
${weakTopics.join(", ")}

Generate a COMPLETE personalized roadmap.

IMPORTANT RULES:
- Generate ONLY for weak topics.
- Do NOT add unrelated topics.
- Each topic should contain:
  1. Topic Name
  2. Theory Explanation
  3. Important Algorithms
  4. Key Concepts
  5. 5 Codeforces Problems
  6. Practice Tips
  7. Contest Advice

IMPORTANT FOR PROBLEMS:
- ALWAYS include:
  Contest ID + Problem Index + Problem Name + Link

EXAMPLE FORMAT:

### Topic: Graphs

Theory:
- Graph is a data structure...
- BFS is used for...
- DFS helps traverse graphs.

Important Algorithms:
- BFS
- DFS
- Dijkstra

Key Concepts:
- Graph Traversal
- Connected Components
- Shortest Path

Codeforces Problems:

1. 580C - Kefa and Park
https://codeforces.com/problemset/problem/580/C

2. 977A - Wrong Subtraction
https://codeforces.com/problemset/problem/977/A

3. 510A - Fox And Snake
https://codeforces.com/problemset/problem/510/A

4. 339A - Helpful Maths
https://codeforces.com/problemset/problem/339/A

5. 236A - Boy or Girl
https://codeforces.com/problemset/problem/236/A

Practice Tips:
- Solve 2 graph problems daily
- Revise BFS & DFS
- Practice implementation carefully

Contest Advice:
- Focus on implementation speed
- Avoid brute force
- Read statements carefully

IMPORTANT:
- Use EXACT same formatting.
- Give beginner-friendly explanations.
- Problems should be relevant to the topic.
- Include REAL Codeforces links.
- Generate for ALL weak topics provided.
- Keep roadmap structured and practical.
`,
          },
        ],

        model: "llama-3.3-70b-versatile",

        temperature: 0.7,

        max_tokens: 4000,
      });

    return completion.choices[0]
      .message.content;

  } catch (error) {

    console.log(error);

    return `
Failed to generate roadmap.
Please try again later.
`;

  }
};

module.exports = {
  generateRoadmapAI,
};