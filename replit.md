# Olajimagine Studio

## Overview

Olajimagine Studio is a modern web application for AI-powered image generation. Built with React, TypeScript, and Express.js, it provides users with an intuitive interface to create stunning images using multiple AI providers with automatic fallback. The application features a clean, responsive design with form-based input for prompts and customizable generation parameters like image size, quality, and style.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Design**: RESTful API endpoints with proper error handling
- **Development**: Hot reload with Vite middleware integration
- **Build**: ESBuild for production bundling

### Data Storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema**: Shared schema definitions between client and server
- **Storage Implementation**: Dual storage approach with memory storage for development and database storage for production

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Generated Images Table**: Stores image metadata including prompts, URLs, style preferences, size, quality, provider used, and timestamps

### Authentication & Authorization
- Session-based authentication system (infrastructure present but not fully implemented)
- User management capabilities with secure password handling

### Form Validation & Type Safety
- Zod schemas for runtime validation and TypeScript type generation
- Shared validation schemas between frontend and backend
- Form validation integrated with UI components for real-time feedback

## External Dependencies

### Third-Party Services
- **Multi-Provider Image Generation**: Robust fallback system with multiple AI image generation providers via GiftedTech API:
  - **Primary**: Flux API - state-of-the-art quality and speed
  - **Secondary**: Stable Diffusion API - reliable open-source alternative  
  - **Tertiary**: DeepSeek API - additional fallback option
- **Neon Database**: PostgreSQL hosting service for production data storage

### Key Libraries & Frameworks
- **UI Components**: Extensive Radix UI component library for accessible, customizable interface elements
- **Styling**: Tailwind CSS with PostCSS for utility-first styling approach
- **Icons**: Font Awesome for consistent iconography throughout the application
- **Date Handling**: date-fns for timestamp formatting and date manipulation
- **Development Tools**: Replit-specific plugins for development environment integration

### Build & Development Tools
- **Vite**: Fast build tool with HMR support and plugin ecosystem
- **TypeScript**: Full type safety across the entire application stack
- **ESLint & Prettier**: Code quality and formatting (configured but not shown in files)
- **Drizzle Kit**: Database migration and schema management tools