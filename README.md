# Microservice Event Reminder System

This project demonstrates a microservices architecture using NestJS, BullMQ (for asynchronous job processing), Redis (as the BullMQ backend), and SQLite3 (for local data persistence).

It consists of three main services:

* **`api-gateway`**: The entry point for external HTTP requests, routing them to the appropriate backend microservices.
* **`backend`**: Manages core business logic (e.g., events, devices) and interacts with the database. It also acts as an RPC server for device data.
* **`reminder-service`**: A dedicated worker service responsible for scheduling and sending event reminders using BullMQ and Expo Push Notifications. It communicates with the `backend` service via RPC to fetch user device tokens.

  
<img width="1483" alt="Screenshot 2025-05-26 at 22 13 45" src="https://github.com/user-attachments/assets/7be85cc5-6dbd-4da7-b07d-fd64ad00b859" />

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

* **Docker Desktop**: Includes Docker Engine and Docker Compose.
    * [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
* **Node.js** (v20 or higher) and **npm** (preferred package manager for monorepos):
    * [Install Node.js](https://nodejs.org/en/download/)
    * Install npm globally: `npm install -g npm`

---

## Getting Started

Follow these steps to get the project up and running.

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/michaelgichia/recipe-scheduler-michaelgichia.git
cd recipe-scheduler-michaelgichia
```

### 2. Install Root Dependencies

Navigate to the project root directory (where `package.json` and `npm-lock.yaml` are located) and install the monorepo's dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

The `reminder-service` requires an `EXPO_ACCESS_TOKEN` to send push notifications. You'll need to obtain this from your Expo account if you're using push security.

**Create a `.env` file at the root of your project.**

```
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Database Configuration
DATABASE_URL=file:./data/database.sqlite

API_GATEWAY_PORT=3000
EVENT_SERVICE_PORT=3001

# Environment
NODE_ENV=development

EVENT_SERVICE_HOST="0.0.0.0"
EVENT_SERVICE_PORT=3001
```

### 4. Build and Run the Services with Docker Compose

From the project root directory, execute the following command to build the Docker images for all services and start them:

```bash
npm run build:shared
npm run dev
```

This command will:
1.  Start a **Redis** instance.
2.  Build and start the **`api-gateway`** service (exposed on port `3000`).
3.  Build and start the **`backend`** service (exposed on port `3001`).
4.  Build and start the **`reminder-service`** (exposed on port `3003`).

### 5. Verify Services Are Running

You can check the status of your running containers:

```bash
docker compose ps
```

You should see all four services (`microservice-api-gateway`, `microservice-backend`, `microservice-reminder-service`) in the `running` state.

You can also view the logs of all services to see their startup output:

```bash
docker compose logs -f
```

Press `Ctrl+C` to exit the log stream. To view logs for a specific service (e.g., `backend`):

```bash
docker compose logs -f backend
```

---

## Usage

Once all services are running:

* The **API Gateway** will be accessible at `http://localhost:3000`. You can send HTTP requests to this endpoint.
* For example, to create an event (which will trigger a reminder to be scheduled):
    * Make a `POST` request to `http://localhost:3000/events` (or your configured event creation endpoint) with a body similar to:

    ```json
    {
      "userId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "title": "My Important Meeting",
      "startTime": "2025-05-27T09:00:00.000Z" # Tomorrow 9:00 AM EAT
    }
    ```
    (Note: `startTime` should be in ISO 8601 format, and the `userId` must be a valid UUID v4).

* The `backend` service will process the event creation and, via RPC, instruct the `reminder-service` to enqueue a delayed job for the reminder.
* The `reminder-service` will pick up the job and, when the delay (e.g., 5 minutes before the event) expires, it will attempt to send a push notification via Expo.

---

## Stopping and Cleaning Up

To stop the running services:

```bash
npm run clean:docker
```
