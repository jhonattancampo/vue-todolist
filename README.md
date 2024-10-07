# ToDo List Application

A full-stack ToDo List application with a Node.js backend and Vue.js frontend.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Version Control](#version-control)
- [Design Patterns](#design-patterns)
- [Deployment](#deployment)

## Features

- Create and delete tasks.
- Mark tasks as completed.
- Set deadlines for each task (date and time).
- List all created tasks.
- Sort tasks by date.
- Show a summary with the number of completed and uncompleted tasks.
- Confirmation prompt before deleting a task.

## Technologies

### Backend:
- Node.js
- Express
- MongoDB with Mongoose
- TypeScript
- Yarn

### Frontend:
- Vue.js with TypeScript
- Tailwind CSS
- Axios

## Setup

### Backend

1. Navigate to the Backend Directory:
    ```bash
    cd todo-backend
    ```

2. Install Dependencies:
    ```bash
    yarn install
    ```

3. Configure Environment Variables:  
   Create a `.env` file in the `todo-backend` directory with the following content:
    ```env
    PORT=4000
    MONGODB_URI=mongodb+srv://<username>:<password>@todolistbraintly.t9bky.mongodb.net/?retryWrites=true&w=majority
    ```

4. Seed the Database with Test Tasks:
    ```bash
    yarn seed
    ```

5. Start the Backend Server:
    ```bash
    yarn dev
    ```

The backend server will run on [http://localhost:4000](http://localhost:4000).

### Frontend

1. Navigate to the Frontend Directory:
    ```bash
    cd todo-frontend
    ```

2. Install Dependencies:
    ```bash
    yarn install
    ```

3. Start the Frontend Development Server:
    ```bash
    yarn serve
    ```

The frontend will run on [http://localhost:8080](http://localhost:8080).

## Design Patterns

- The application follows Clean Architecture and utilizes the Observer and Repository patterns.

## Deployment

The backend is deployed to **Render**, and the frontend is deployed to **Netlify**. You can interact with the project live without installing it locally.

- **Backend (Render)**: The Node.js backend is hosted on Render, handling the API requests for the tasks.
- **Frontend (Netlify)**: The Vue.js frontend is hosted on Netlify, providing the user interface to interact with the ToDo List.

To view the live project, visit the following URLs:

- Frontend: [Frontend Link](https://vue-todo-frontend.netlify.app/)  
- Backend: [Backend Link](https://todo-deploy-backend.onrender.com/)
