import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load local environment variables if available
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header and process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Secure API endpoint for generating high-end creative brand brief
app.post("/api/generate-brief", async (req, res) => {
  try {
    const { brandName, brandDescription } = req.body;

    if (!brandName || !brandDescription) {
      return res.status(400).json({ error: "Missing brandName or brandDescription parameters" });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY environment variable is missing.");
      // Provide a structured fallback instead of crashing
      return res.status(503).json({ 
        error: "Gemini API key is not configured yet. Please configure it in Settings > Secrets.",
        isDemoFallback: true,
        brandBrief: {
          brandName,
          brandDescription,
          creativeConcept: "Our brand represents a minimalist, bespoke fusion of luxury and performance. Every visual is calculated, spacious, and grounded in raw artistic discipline.",
          colors: ["#0A0A0A", "#E5E5E5", "#00FF66", "#1E1E1E"],
          typography: "Space Grotesk (Headers) paired with Inter (Body text). Gives a modern, high-tech structure with readable body layouts.",
          strategy: "Deploy an immersive 3D-feeling landing page with full-bleed editorial imagery, followed by a dark, high-contrast, interactive customer playground."
        }
      });
    }

    const systemInstruction = `You are Hiroshi Tanaka, Principal Creative Director and Visual Identity Architect at amTop Studio, an ultra-premium $500k-tier design house. 
Your tone is deeply analytical, architectural, confident, and deeply inspiring. 
Given a client's brand name and brief description, synthesize an absolute masterpiece of brand architecture and visual direction in strict JSON.`;

    const prompt = `Synthesize a luxury visual identity layout, color palette, and digital brand strategy for:
Brand Name: "${brandName}"
Brand Description: "${brandDescription}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brandName: { type: Type.STRING },
            brandDescription: { type: Type.STRING },
            creativeConcept: { 
              type: Type.STRING, 
              description: "A gorgeous, high-end, 3-paragraph creative direction briefing. Explains the mood, energy, negative space, and visual philosophy." 
            },
            colors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of exactly 4 or 5 hex color codes representing the mood perfectly (e.g., '#030303')."
            },
            typography: { 
              type: Type.STRING, 
              description: "Elegant typography recommendation. Suggest which high-quality fonts to use (e.g., 'Space Grotesk' for display headers and 'Inter' for body)." 
            },
            strategy: { 
              type: Type.STRING, 
              description: "Custom digital strategy and production milestones to execute a premium digital experience." 
            }
          },
          required: ["brandName", "brandDescription", "creativeConcept", "colors", "typography", "strategy"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini engine");
    }

    const parsedBrief = JSON.parse(text.trim());
    res.json({ brandBrief: parsedBrief });
  } catch (error: any) {
    console.error("Gemini brief generation error:", error);
    res.status(500).json({ 
      error: "Failed to generate brand brief due to a server-side exception.",
      details: error.message 
    });
  }
});

// Vite middleware / Static serving setup
async function setupFrontend() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupFrontend();
