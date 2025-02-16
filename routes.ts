import { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertTaskSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.post("/api/tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const taskData = insertTaskSchema.parse({
      ...req.body,
      userId: req.user.id,
    });
    
    const task = await storage.createTask(taskData);
    res.status(201).json(task);
  });

  app.get("/api/tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const tasks = await storage.getTasks(req.user.id);
    res.json(tasks);
  });

  app.get("/api/tasks/:category", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const tasks = await storage.getTasksByCategory(req.user.id, req.params.category);
    res.json(tasks);
  });

  const httpServer = createServer(app);
  return httpServer;
}
