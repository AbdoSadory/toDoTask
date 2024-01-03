# ToDo App

A ToDo App API for a task manager application using NodeJS runtime environment and ExpressJS as the server framework.
The API will support creating, viewing, editing, and deleting tasks.

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the API](#running-the-api)
- [API Structure](#api-structure)
- [Endpoints](#endpoints)

## Prerequisites

Before you run the API, make sure you have the following prerequisites installed:

**MongoDB Server:** Ensure you have MongoDB Server installed. You can download and install MongoDB from [MongoDB official website](https://www.mongodb.com/try/download/community).

## Installation

To install dependencies:

```bash
npm install
```

## Running the API

To run in dev mode:

```bash
npm run dev
```

## API Structure

Following ExpressJS Structure:

- DB : for DB connection and Entities Schemas
- Src : for middlewares, modules (controllers,routes) , utils

```
  ├── DB
  |   ├── models
  |   ├── connection.js
  ├── src
  |   ├── middlewares
  │   ├── modules
  |   |      ├── users
  |   |      |      ├── controllers.js
  |   |      |      ├── routes.js
  |   |      ├── tasks
  |   |      |      ├── controllers.js
  |   |      |      └── routes.js
  |   ├── utils
  |   └── uploads
  ├── index.js
  ├── .env
  ├── README.md
  └── .gitignore
```

## Endpoints

### User

| Method | URL                        | Description                                     |
| ------ | -------------------------- | ----------------------------------------------- |
| GET    | `/users/profile`           | Get User Profile and must be logged In          |
| POST   | `/users/signUp`            | Create a new user account                       |
| POST   | `/users/login`             | Authenticate and get access token               |
| POST   | `/users/addProfileImage`   | Upload User Profile Image and must be logged In |
| PUT    | `/users/updateProfile`     | Update User Profile and must be logged In       |
| PUT    | `/users/changePassword`    | Change Password and must be logged In           |
| PUT    | `/users/deactivateAccount` | Deactivate User Profile and must be logged In   |
| DELETE | `/users/deleteProfile`     | Delete User Profile and must be logged In       |

### Tasks

| Method | URL                       | Description                                  |
| ------ | ------------------------- | -------------------------------------------- |
| GET    | `/tasks/allTasks`         | Retrieve all tasks                           |
| GET    | `/tasks/userTasks`        | Retrieve User tasks and must be logged In    |
| GET    | `/tasks/notDoneTasks`     | Retrieve not done tasks                      |
| POST   | `/tasks/addTask`          | Create new task and must be logged In        |
| PUT    | `/tasks/updateTask`       | Update task and must be logged In            |
| PUT    | `/tasks/assignTaskToUser` | Assign task to user and must be logged In    |
| DELETE | `/tasks/deleteTask`       | Delete a specific task and must be logged In |
