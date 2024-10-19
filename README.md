# Automatic Timetable Generator

This project is an Automated Timetable Generator using the MERN stack (MongoDB, Express, React, Node.js). It helps colleges and universities create conflict-free schedules by automatically assigning subjects and teachers to available time slots, ensuring efficient and optimized timetables for all departments.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Folder Structure](#folder-structure)
3. [Available Scripts](#available-scripts)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Contributing](#contributing)
7. [License](#license)
8. [Links](#links)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js v14 or higher
- npm or yarn
- MongoDB (for database)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/Automatic-Timetable-Generator.git
    ```

2. Navigate to the project folder:

    ```bash
    cd Automatic-Timetable-Generator
    ```

3. Navigate to the client folder:

    ```bash
    cd client
    ```

4. Install the frontend dependencies:

    ```bash
    npm install
    ```

5. Navigate to the server folder:

    ```bash
    cd ../server
    ```

6. Install the backend dependencies:

    ```bash
    npm install
    ```

## Folder Structure

```plaintext
Automatic-Timetable-Generator/  # Project root
├── client/                      # Frontend (React) application
│   ├── .vercel/                 # Vercel deployment configuration
│   ├── build/                   # Build output directory
│   ├── node_modules/            # Node.js packages
│   ├── public/                  # Static files (images, etc.)
│   ├── src/                     # Source code (components, pages, etc.)
│   ├── .gitignore               # Files to ignore in version control
│   ├── package-lock.json        # npm lock file for dependencies
│   └── package.json             # Project metadata and dependencies
└── server/                      # Backend (Express) application
    ├── models/                  # Database models
    ├── routes/                  # API routes
    ├── controllers/             # Request handlers
    ├── config/                  # Configuration files (database, etc.)
    ├── .gitignore               # Files to ignore in version control
    ├── package-lock.json        # npm lock file for dependencies
    └── package.json             # Project metadata and dependencies
```
# Usage

To run the development servers for both frontend and backend, use the following commands:
```

1. For the server (backend):

```bash
cd server
npm run start
```

2. For the client (frontend):

```bash
cd ../client
npm run start
```
Open http://localhost:3000 to view the frontend in your browser.

## Technologies Used

- MongoDB - NoSQL database for storing timetable data.
- Express - Web framework for Node.js to build the backend API.
- React - A JavaScript library for building user interfaces.
- Node.js - JavaScript runtime for server-side development.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.

2. Create a new feature branch (**`git checkout -b feature/your-feature`**).

3. Commit your changes (**`git commit -m 'Add new feature'`**).

4. Push to the branch (**`git push origin feature/your-feature`**).

5. Open a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)

# Links

- Live site: [Scheduler](https://automatic-timetable-generator.vercel.app/) 
