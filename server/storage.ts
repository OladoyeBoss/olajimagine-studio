import { type User, type InsertUser, type GeneratedImage, type InsertImage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Image-related methods
  createGeneratedImage(image: InsertImage): Promise<GeneratedImage>;
  getGeneratedImages(limit?: number, offset?: number): Promise<GeneratedImage[]>;
  getUserGeneratedImages(userId: string, limit?: number, offset?: number): Promise<GeneratedImage[]>;
  getGeneratedImage(id: string): Promise<GeneratedImage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private generatedImages: Map<string, GeneratedImage>;

  constructor() {
    this.users = new Map();
    this.generatedImages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === usernameOrEmail || user.email === usernameOrEmail,
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      ...user,
      createdAt: new Date(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  async createGeneratedImage(image: InsertImage): Promise<GeneratedImage> {
    const newImage: GeneratedImage = {
      id: randomUUID(),
      ...image,
      createdAt: new Date(),
    };
    this.generatedImages.set(newImage.id, newImage);
    return newImage;
  }

  async getGeneratedImages(limit = 20, offset = 0): Promise<GeneratedImage[]> {
    const allImages = Array.from(this.generatedImages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return allImages.slice(offset, offset + limit);
  }

  async getUserGeneratedImages(userId: string, limit = 20, offset = 0): Promise<GeneratedImage[]> {
    const userImages = Array.from(this.generatedImages.values())
      .filter(image => image.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return userImages.slice(offset, offset + limit);
  }

  async getGeneratedImage(id: string): Promise<GeneratedImage | undefined> {
    return this.generatedImages.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async createGeneratedImage(insertImage: InsertImage): Promise<GeneratedImage> {
    const id = randomUUID();
    const generatedImage: GeneratedImage = {
      ...insertImage,
      id,
      provider: insertImage.provider || "Flux",
      createdAt: new Date(),
    };
    this.generatedImages.set(id, generatedImage);
    return generatedImage;
  }

  async getGeneratedImages(limit: number = 20, offset: number = 0): Promise<GeneratedImage[]> {
    const allImages = Array.from(this.generatedImages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return allImages.slice(offset, offset + limit);
  }

  async getGeneratedImage(id: string): Promise<GeneratedImage | undefined> {
    return this.generatedImages.get(id);
  }
}

export const storage = new MemStorage();
