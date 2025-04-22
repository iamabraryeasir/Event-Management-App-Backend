# Event App Backend API

## Overview

This is the backend API for the Event App, a platform for creating, managing, and discovering events. The API provides endpoints for user authentication, event management, category management, and more.## Tech Stack

- Node.js
- Express.js- MongoDB- Mongoose
- JWT for authentication
- Cloudinary for image storage
- Other libraries: bcryptjs, cors, helmet, etc.## API Features
- User authentication (signup, login, logout)- Event CRUD operations
- Category management
- Banner management- Public endpoints for landing page data

## API Routes### Authentication

- POST `/api/v1/auth/signup`: Create a new user account
- POST `/api/v1/auth/login`: Log in to an existing account
- POST `/api/v1/auth/logout`: Log out the current user
- GET `/api/v1/auth/me`: Get current user information

### Events

- GET `/api/v1/events`: Get all events (with optional filters)

  - Query parameters:
    - `page`: Page number for pagination (default: 1)
    - `limit`: Number of events per page (default: 10)
    - `category`: Filter events by category ID
    - `location`: Filter events by location (case-insensitive partial match)

- GET `/api/v1/events/:id`: Get a specific event by ID
- POST `/api/v1/events`: Create a new event (protected route)
- PUT `/api/v1/events/:id`: Update an existing event (protected route)
- DELETE `/api/v1/events/:id`: Delete an event (protected route)

### Categories

- GET `/api/v1/categories`: Get all categories

  - Query parameters:
    - `page`: Page number for pagination (default: 1)
    - `limit`: Number of categories per page (default: 10)

- POST `/api/v1/categories`: Create a new category (admin only)
- PUT `/api/v1/categories/:id`: Update a category (admin only)
- DELETE `/api/v1/categories/:id`: Delete a category (admin only)### Banners
- GET `/api/v1/banners`: Get all banners
- POST `/api/v1/banners`: Create a new banner (admin only)- DELETE `/api/v1/banners/:id`: Delete a banner (admin only)

### Public

- GET `/api/v1/public/landing-page`: Get data for the landing page (banners and upcoming events)## Request and Response Formats

For detailed information on request parameters and response formats for each endpoint, please refer to the API documentation.## Environment Variables
Make sure to set up the following environment variables:

- `PORT`: The port number for the server- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Getting Started1. Clone the repository

2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file4. Run the development server: `npm run dev`

## Developer Information

This API was developed by [Your Name] as part of the Event App project. For any questions or concerns, please contact [your email address].
