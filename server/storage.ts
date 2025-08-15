import { type User, type InsertUser, type GeneratedImage, type InsertImage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;

  // Image-related methods
  createGeneratedImage(image: InsertImage): Promise<GeneratedImage>;
  getGeneratedImages(limit?: number, offset?: number): Promise<GeneratedImage[]>;
  getUserGeneratedImages(userId: string, limit?: number, offset?: number): Promise<GeneratedImage[]>;
  getGeneratedImage(id: string): Promise<GeneratedImage | undefined>;
  deleteGeneratedImage(id: string): Promise<void>;

  // Contact submission methods
  createContactSubmission(data: {
    name: string;
    email: string;
    message: string;
    timestamp: string;
  }): Promise<any>;
  getContactSubmissions(): Promise<any[]>;
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

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    
    const updatedUser = { ...existingUser, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
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

  async deleteGeneratedImage(id: string): Promise<void> {
    this.generatedImages.delete(id);
  }

  async createContactSubmission(data: {
    name: string;
    email: string;
    message: string;
    timestamp: string;
  }): Promise<any> {
    // For now, we'll store in a simple JSON file since we don't have a contacts table
    // In production, you'd create a proper database table
    const fs = await import('fs/promises');
    const path = await import('path');

    const contactsFile = path.join(process.cwd(), 'contacts.json');

    try {
      let contacts = [];
      try {
        const existing = await fs.readFile(contactsFile, 'utf-8');
        contacts = JSON.parse(existing);
      } catch (error) {
        // File doesn't exist yet, start with empty array
      }

      const submission = {
        id: `contact_${Date.now()}`,
        ...data
      };

      contacts.push(submission);

      await fs.writeFile(contactsFile, JSON.stringify(contacts, null, 2));
      return submission;
    } catch (error) {
      console.error('Error saving contact submission:', error);
      throw error;
    }
  }

  async getContactSubmissions(): Promise<any[]> {
    const fs = await import('fs/promises');
    const path = await import('path');

    const contactsFile = path.join(process.cwd(), 'contacts.json');

    try {
      const data = await fs.readFile(contactsFile, 'utf-8');
      const contacts = JSON.parse(data);
      return contacts.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
      // File doesn't exist yet
      return [];
    }
  }
}

export const storage = new MemStorage();