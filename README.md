# Country Flag App

This React application displays country flags and information, allowing users to search for specific countries. It's built using technologies like Tailwind CSS, Headless UI, and Vite for a fast and efficient development experience.  

It fetches data from a Spring Boot API.

## Overview

The Country Flag App is a demo app that provides a user-friendly interface to browse and search for countries.  It fetches country data, including flags, names, and other relevant information, from a backend API.

## Technologies Used

* **React:** The JavaScript library for building user interfaces.
* **Tailwind CSS:** A utility-first CSS framework for rapidly styling the application.
* **Headless UI:** A set of unstyled, accessible UI components for building custom, fully accessible UI elements.
* **Vite:** A fast build tool and development server for modern web development.
* **Spring Boot API:** The backend service providing country data. 
* **Axios:**  For making HTTP requests to the Spring Boot API.

## Getting Started

### Prerequisites

* Node.js and npm (or yarn, pnpm)
* A running Spring Boot API providing country data (clone and run the API on `https://github.com/ayomirotoye/country_flags_api`).

### Installation

1. Clone the repository: `git clone https://github.com/ayomirotoye/country_flags_web`
2. Navigate to the project directory: `cd country_flag_app`
3. Install dependencies: `npm install` (or `yarn install`, `pnpm install`)

### Development

1. Start the development server: `npm run dev` (or `yarn dev`, `pnpm dev`)
2. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

1. Build the application: `npm run build` (or `yarn build`, `pnpm build`)
2. The built files will be in the `dist` directory.

### Running the Production Build

1. Serve the `dist` directory using a static file server (e.g., `serve`, `nginx`, `apache`).  For example, using `serve`:
   ```bash
   npm install -g serve
   serve -s dist