import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // 1. Log to console
      console.log("Received contact form submission:", { name, email, message });

      // 2. Save to local file (as a backup/database)
      const messagesPath = path.join(__dirname, "messages.json");
      let messages = [];
      try {
        const data = await fs.readFile(messagesPath, "utf-8");
        messages = JSON.parse(data);
      } catch (e) {
        // File doesn't exist yet
      }
      messages.push({ name, email, message, timestamp: new Date().toISOString() });
      await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2));

      // 3. Attempt to send email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'flavmbish@gmail.com',
          pass: process.env.EMAIL_PASS // This should be an App Password
        }
      });

      const mailOptions = {
        from: email,
        to: 'flavmbish@gmail.com',
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email
      };

      // Only attempt to send if credentials are provided
      if (process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message sent successfully via Email" });
      } else {
        res.status(200).json({ message: "Message received and saved locally (Demo Mode)" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
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

startServer();
