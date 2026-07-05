export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { question } = req.body || {};

  if (!question || !question.trim()) {
    return res.status(400).json({ error: "Missing 'question' in request body" });
  }

  const GEMINI_KEY = process.env.GEMINI_KEY;
  if (!GEMINI_KEY) {
    return res.status(500).json({ error: "GEMINI_KEY is not set on the server" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    "You are a friendly, patient study tutor for a student on the Shamibooks learning platform. " +
                    "Answer clearly and simply, and keep answers focused on helping the student learn.\n\n" +
                    "Student question: " + question
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(502).json({
        error: "Gemini API returned an error",
        details: data?.error?.message || "Unknown error"
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate an answer for that. Please try rephrasing your question.";

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Server error calling Gemini:", err);
    return res.status(500).json({ error: "Failed to reach Gemini API" });
  }
}
