import { Request, Response } from "express";

type Sender = "user" | "ai";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body;

    // 1. Validate input
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    let conversationId = sessionId;

    // 4. Dummy AI reply
    const aiReply = "This is a dummy response from AI.";

    // 6. Respond to client
    return res.status(200).json({
      sessionId: conversationId,
      messages: [message, aiReply],
    });
  } catch (error) {
    console.error("sendMessage error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
