# 🧀 Käse App Deployment Guide

## Overview
This application consists of a **React Frontend** and a **PHP Proxy Backend**.
The PHP backend (`api/kaese.php`) does **not** connect to a database directly. Instead, it acts as a secure proxy to an upstream Rust/Actix API (`statustracker.ernilabs.com`).

## Prerequisites
-   **Web Server**: Apache or Nginx.
-   **PHP**: Version 7.4 or higher.
-   **PHP Extensions**: `php-curl` (Required for the proxy to work).
-   **Node.js**: Only required on your local machine to build the frontend.

## 1. Building the Frontend
1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the project:
    ```bash
    npm run build
    ```
    This creates a `dist` folder containing the optimized static files.

## 2. Deployment
1.  **Frontend Files**:
    Upload the **contents** of the `frontend/dist/` folder to your server's public web root (e.g., `/var/www/html/` or `public_html/`).
    
    *Structure check:* You should see `index.html` and `bgimg.jpg` directly in your web root, not inside a `dist` subfolder.

2.  **Backend Files**:
    Create an `api` folder in your web root and upload `api/kaese.php` into it.

    *Final Server Structure:*
    ```
    /var/www/html/
    ├── index.html
    ├── bgimg.jpg
    ├── vite.svg
    ├── assets/
    │   ├── index-xxxx.js
    │   └── index-xxxx.css
    └── api/
        └── kaese.php
    ```

3.  **Permissions**:
    Ensure the web server has read permissions for all files.
    ```bash
    chmod -R 755 /var/www/html
    ```

## 3. Configuration
The connection to the external database/API is configured in `api/kaese.php`.

If the upstream API URL or Key changes, edit these variables at the top of the file:
```php
$ACTIX_BASE_URL = 'YOUR-BACKEND-URL';
$API_KEY = 'YOUR-API-KEY';
```
