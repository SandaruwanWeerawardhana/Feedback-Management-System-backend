# Feedback Management System

## Backend and Frontend Links
- **Frontend GitHub Repository:** [Feedback Management System Frontend](https://github.com/SandaruwanWeerawardhana/Feedback-Management-System-frontend)
- **Backend GitHub Repository:** [Feedback Management System Backend](https://github.com/SandaruwanWeerawardhana/Feedback-Management-System-backend.git)


A simple Node.js/Express application for managing feedback entries with a MySQL database.

## Features
- Add, view, update, and delete feedback entries
- RESTful API endpoints
- Uses environment variables for sensitive configuration
- Modular code structure (controllers, routes, services)

## Project Structure
```
server/
  src/
    config/
      db.js            # Database connection and initialization
    controller/
      feedbackController.js  # Request handlers for feedback
    routes/
      feedbackRoute.js       # API route definitions
    service/
      feedbackService.js     # Business logic and DB queries
  .env                  # Environment variables (not committed)
  package.json
  server.js             # App entry point
```

## Setup
1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env` and set your DB credentials, or edit `.env` directly:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=shop
     ```
4. **Start the server**
   ```sh
   node server.js
   ```

## API Endpoints
| Method | Endpoint        | Description                |
|--------|----------------|----------------------------|
| GET    | /api/feedback  | Get all feedback entries   |
| GET    | /api/feedback/:id | Get feedback by ID      |
| POST   | /api/feedback  | Create new feedback        |
| PUT    | /api/feedback/:id | Update feedback by ID   |
| DELETE | /api/feedback/:id | Delete feedback by ID   |

## Example Feedback Object
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "comments": "Great service!"
}
```

## License
MIT
