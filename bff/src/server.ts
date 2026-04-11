import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

type GithubModelsTestRequest = {
  prompt?: string;
};

type GithubModelsMessage = {
  role: string;
  content: string;
};

type GithubModelsChatResponse = {
  choices?: Array<{
    message?: GithubModelsMessage;
  }>;
};

const app = express();
const port = process.env.PORT || "8080";
const corsAllowedOrigin = process.env.CORS_ALLOWED_ORIGIN || "*";

app.use(
  cors({
    origin: corsAllowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.post(
  "/api/github-models/test",
  async (req: Request<unknown, unknown, GithubModelsTestRequest>, res: Response) => {
    const token = (process.env.GITHUB_TOKEN || "").trim();
    if (!token) {
      return res.status(500).json({ message: "GITHUB_TOKEN is not set" });
    }

    const promptRaw = req.body?.prompt;
    const prompt =
      typeof promptRaw === "string" && promptRaw.trim()
        ? promptRaw.trim()
        : "Say hello from GitHub Models in one short sentence.";

    const model = (process.env.GITHUB_MODELS_MODEL || "gpt-4o-mini").trim();
    const baseUrl = (
      process.env.GITHUB_MODELS_BASE_URL || "https://models.inference.ai.azure.com"
    ).trim();
    const upstreamUrl = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;

    try {
      const upstreamResponse = await fetch(upstreamUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "developer", content: prompt }],
          temperature: 0.2,
          max_tokens: 200,
        }),
      });

      if (!upstreamResponse.ok) {
        const rawBody = (await upstreamResponse.text()).trim();
        return res.status(502).json({
          message: `upstream returned non-2xx: ${rawBody}`,
        });
      }

      const upstreamJson = (await upstreamResponse.json()) as GithubModelsChatResponse;
      const firstChoice = upstreamJson.choices?.[0];

      if (!firstChoice) {
        return res.status(502).json({ message: "upstream response has no choices" });
      }

      return res.status(200).json({
        model,
        reply: firstChoice.message?.content,
      });
    } catch {
      return res.status(502).json({ message: "upstream request failed" });
    }
  }
);

app.use("/api", (_req: Request, res: Response) => {
  res.status(404).json({ message: "not found" });
});

app.listen(port, () => {
  console.log(`BFF started on :${port}`);
});
