# Project & Portfolio

### Tiffany Seals

![Degree Program](https://img.shields.io/badge/degree-web%20development-blue.svg)

[Log](./docs/logs.md)

<br>

# Off Ramp Band Web Application

A full-stack web application for the Off Ramp Band that showcases their media, gigs, and allows users to submit booking requests.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Live Site](#live-site-link)
- [Client Usage](#client-usage)
- [Deploymnet](#deployment)
- [Folder Structure](#folder-structure)
- [Security](#security)

---

## Demo

![Off Ramp Band Screenshot](./docs/ORSS.png)  

---

## Features

- Browse pictures and videos of the band
- View upcoming gigs with date and time
- Submit booking requests via contact form
- Responsive design for desktop and mobile
- Admin access to manage content (future feature)

---

## Tech Stack

- **Frontend:** React, Vite, React Router, CSS
- **Backend:** Node.js, Express, Nodemailer
- **Email:** Gmail SMTP for booking requests
- **Linting & Formatting:** ESLint (Airbnb Style Guide), Prettier
- **Other:** CORS, dotenv for environment variables

---

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/DayTiffany-FS/2508-WDV349-SealsTiffany.git
    cd 2508-WDV349-SealsTiffany
    ```

2. Install dependencies for both client and server:

    ```bash
    # Frontend
    cd client
    npm install

    # Backend
    cd ../server
    npm install
    ```

3. Set up environment variables in `server/.env`:

    ```env
    GMAIL_USER=youremail@gmail.com
    GMAIL_PASS=your_app_password
    PORT=3000
    ```

4. Run the project:

    ```bash
    # Start backend
    cd server
    nodemon index.js

    # Start frontend
    cd ../client
    npm run dev
    ```

## Live Site

https://2508-wdv-349-seals-tiffany-git-main-daytiffany-fs-projects.vercel.app/

## Client Usage

### Viewing the Site
- Visit the live site link above

### Booking Requests
- Fill out the contact form
- Submissions are sent to the band's email

### Managing Content
- Use admin login (credentials provided separately)

## Deployment

- Frontend hosted on Vercel
- Backend hosted on Render
- Database: MongoDB Atlas

Environment variables must be configured in the hosting platform.

## Folder Structure

/client → React frontend  
/server → Express backend  

## Future Features

 - Photo albums per gig
 - Easy video additions

 ## Security 

 Sensitive data such as API keys and email credentials are stored in environment variables and are not included in this repository.