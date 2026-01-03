# 🧀 Käse App

A mobile-friendly web application for rating and managing cheese discoveries. Built for family use, allowing members to rate cheeses on a scale of 1-5 stars.

## Features

-   **User Profiles**: Switch between predefined users to manage your own ratings.
-   **Cheese Database**: Add, edit, and remove cheeses (Name, Type, Supplier, Description).
-   **Rating System**: 5-star rating system (0.5 steps). Ratings are stored per-user.
-   **Rich Search & Sort**: Filter by name, type, or supplier. Sort by name, rating (high/low), or newest.
-   **Mobile First Design**: Responsive, dark-themed UI with transparency effects.

## Tech Stack

-   **Frontend**: React, Vite, Lucide React (Icons).
-   **Backend Proxy**: PHP (Acts as an adapter/proxy).
-   **Upstream Backend**: Rust (Actix Web) + PostgreSQL (JSONB for ratings).

## Project Structure

```
/
├── api/                # PHP Backend scripts
│   └── kaese.php      # Main API proxy/adapter
├── frontend/           # React Application
│   ├── src/           # Source code
│   └── dist/          # Build output (static files)
└── deployment_guide.md # Detailed deployment instructions
```

## Setup & Development

### Prerequisites

-   Node.js (for frontend)
-   PHP with cURL extension (for local backend proxy)

### Local Development

1.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

2.  **Backend (PHP)**:
    Start a local PHP server in the root directory:
    ```bash
    php -S localhost:8000 -t .
    ```

    *Note: The frontend is configured to proxy `/api` requests to `http://localhost:8000` during development.*

## Configuration

The PHP backend (`api/kaese.php`) is configured to communicate with an upstream Actix API.
To change the upstream server or API key, edit `api/kaese.php`:

```php
$ACTIX_BASE_URL = 'https://your-upstream-api.com/api/kaese';
$API_KEY = 'your-api-key';
```

## Deployment

See [deployment_guide.md](deployment_guide.md) for detailed instructions on hosting this app on an Apache server.

## License

Private / Internal Use.
MIT

