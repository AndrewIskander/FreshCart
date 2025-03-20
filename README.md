FreshCart - E-Commerce Application

FreshCart is a sample e-commerce application built with React. This project is designed to help you quickly set up an online store, featuring product listings, a shopping cart, and a checkout process. It uses Redux for state management and integrates mock data to simulate real-world e-commerce operations.
Features

    Product Listing: Display a collection of products with details such as name, description, price, and image.
    Shopping Cart: Add and remove products from the cart, and adjust quantities.
    Checkout Flow: Simplified checkout process where users can review their cart and submit orders.
    State Management: Global state management using Redux to handle cart items and user interactions.
    API Integration: Connects to a backend (or mock API) for fetching products and processing orders.

Getting Started
Prerequisites

Make sure you have the following installed:

    Node.js
    npm or yarn

Installation

Clone this repository to your local machine:

git clone https://github.com/AndrewIskander/FreshCart.git
cd FreshCart

Install the dependencies:

npm install

Available Scripts
npm start

Runs the app in development mode. Open http://localhost:3000 to view it in the browser. The page will reload if you make changes, and any lint errors will appear in the console.
npm test

Launches the test runner in interactive watch mode. It allows you to test various features such as cart functionality, checkout process, etc.
npm run build

Builds the app for production in the build folder. This is optimized for performance and ready for deployment.
npm run eject

Note: This is a one-way operation! After ejecting, you cannot revert back. Ejecting gives you full control over the build configuration files (Webpack, Babel, etc.), but it is not required for most users.
Project Structure

/src
  /components     // Product listing, cart, and checkout components
  /redux          // Redux store and reducers
  /api            // API requests for fetching product data and orders
  /styles         // Styles for the app
  /utils          // Utility functions (e.g., price calculations)
  /views          // Pages like home, product details, cart, and checkout
App.js            // Main entry point for the app
index.js          // React rendering entry point

Deployment

To deploy the app, build the production version:

npm run build

Deploy the contents of the build/ folder to any hosting service like Netlify, Vercel, or AWS.
Learn More

    React Documentation
    Redux Documentation
    Create React App Documentation

License

This project is licensed under the MIT License.
