# The Daily Drizzle

## Project Overview

The application allows users to enter a city name to retrieve current weather details (temperature, conditions, humidity, etc.) from OpenWeather API. All API requests are proxied securely through an AWS Lambda backend to prevent exposure of the API key on the frontend. The frontend is statically hosted on AWS S3/CloudFront with user authentication and favorites powered by AWS Lambda and DynamoDB.

## Table of Contents

- [How to Use the App](#how-to-use-the-app)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Architecture](#project-architecture)
- [Development Log](#development-log)
- [Backend Setup and Infrastructure](#backend-setup-and-infrastructure)
- [Authentication Flow Validation](#authentication-flow-validation)
- [Challenges and Solutions](#challenges-and-solutions)
- [Error Handling](#error-handling)
- [Known Issues](#known-issues)
- [Bonus Points Notes](#bonus-points-notes)

## How to Use the App

The Daily Drizzle is deployed and ready to use! Simply visit the live application URL below to get started.

### Getting Started

1. **Visit the Application**: Navigate to https://d3vvhrujqzim5o.cloudfront.net/
2. **Choose Your Experience**:
   - **Registered User:** Use the <u>**pre-filled login credentials**</u> displayed in the input fields
   - **Guest User**: Skip login and start using the weather features immediately

### User Experience Options

#### For Registered Users

- **Login**: Use the demo credentials that are pre-populated in the login form
- **Access**: Full application features including example displays of mock favorite locations

#### For Guest Users

- **No Registration Required**: Jump straight into weather searching
- **Core Features**: Search weather by city name or use GPS location
- **Responsive Design**: Works seamlessly on desktop and mobile devices

#### New User Registration

- **Registration Available**: New users can create accounts through the registration form
- **Confirmation**: Registration data can be verified in browser cookies (Developer Tools → Application → Cookies)
- **Current Limitation**: Due to a DynamoDB connectivity issue, newly registered users cannot login with their credentials at this time

### App Features You Can Try

1. **Weather Search**: Enter any city name to get current weather conditions
2. **GPS Location**: Allow location access to get weather for your current position
3. **Dynamic Interface**: Experience responsive design and real-time weather icons
4. **User Authentication**: Test the login/logout flow with demo credentials

## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - HTML5 & CSS3
- **Backend:**
  - AWS Lambda(Node.js with Typescript)
  - AWS Gateway API (HTTP API)
  - AWS DynamoDB
- **Deployment & Hosting:**
  - AWS S3
  - AWS CloudFront
- **Authentication Mechanism:**
  - JWT (JSON Web Tokens)
  - Password Hashing (Node.js crypto module)
- **Development Tools & Practices:**
  - Node.js
  - npm
  - Git/GitHub
  - Virtual Studio Code
  
## Repository Structure

daily-drizzle/
├── frontend/              # React TypeScript application
├── backend/
│   ├── functions/
│   │   ├── auth/         # UserAuthentication Lambda function
│   │   └── weather/      # weather-app-api Lambda function
│   ├── infrastructure/
│   │   └── api-endpoints.md      # API documentation
│   └── package.json      # Backend dependencies
└── README.md


## Project Architecture

The application is built as a serverless, single-page application.

- **Frontend (React/TypeScript):** The user interface is a responsive React application. It handles user interactions, displays weather data, and manages user authentication flows.
- **Backend (AWS Lambda/API Gateway/DynamoDB):**
  - All external API requests are securely proxied through AWS Lambda functions, protecting sensitive API keys from being exposed on the client-side.
  - User authentication (signup, login, token verification) is managed by dedicated Lambda functions, which interact with DynamoDB for user data storage.
  - AWS API Gateway serves as the single entry point for all frontend-to-backend communication, providing secure and efficient routing to the respective Lambda Authentication and Weather Data functions.
- **Deployment:** The compiled React application is hosted as static files on AWS S3, delivered globally and securely via AWS CloudFront.

## Development Log

This section outlines the progress made during the development of this weather application not found in GitHub commit logs.

## Backend Setup and Infrastructure

**Note: Complete backend source code is available in the `/backend` directory of this repository.**

### AWS Account Setup

- **IAM Role Creation:** Created `WeatherAppLambdaRole` with `AWSLambdaBasicExecutionRole` permissions for Lambda execution.

### Weather API Lambda Function

- **Lambda Function Creation:**
  - Created `weather-app-api` Lambda function using Node.js 20.x runtime
  - Configured ES module syntax (`export const handler`)
  - Added secure environment variable storage for `OPENWEATHER_API_KEY`
  - Implemented weather data fetching from OpenWeatherMap API
  - Added proper error handling and CORS headers
  - Successfully tested weather data retrieval
- **Backend Testing:** Verified Lambda function successfully calls OpenWeatherMap API and returns formatted weather data (city, temperature, description, humidity).
- **API Security:** The OpenWeatherMap API integration is secured through AWS Lambda environment variables, preventing API key exposure to the frontend. The Lambda function handles all external API calls and returns formatted weather data to the client.

### Authentication Implementation

#### Database Setup

- **DynamoDB Table Creation:** Built User_Authentication table with userId primary key and email-index GSI for efficient user lookups
- **IAM Permissions:** Extended existing Lambda role with DynamoDB access permissions (AmazonDynamoDBFullAccess)

#### Core Security Features

- **Password Security:** Implemented salted password hashing
- **JWT Token System:** Built a token-based login system where users get a secure token after login that automatically expires after 24 hours
- **Authentication Logic:** Complete user registration, login verification, and token validation workflows

#### API Gateway Integration

- **Route Extension:** Extended existing HTTP API with authentication endpoints:
  - `POST /auth/register`
  - `POST /auth/login` - Credential verification and token generation
  - `GET /auth/verify` - JWT token validation and user info retrieval
  - `OPTIONS /{proxy+}` - CORS preflight handling
- **CORS Configuration:** Comprehensive CORS headers for cross-origin browser requests

## Authentication Flow Validation

- **Registration Testing:** Successfully created users with secure password storage and immediate JWT token response
- **Login Testing:** Verified credential validation against mock user database with proper password verification
- **Token Verification:** Confirmed JWT token validation with user information extraction
- **Security Testing:** Validated error responses for invalid credentials, expired tokens, and malformed requests

## Challenges and Solutions

This section highlights key technical hurdles encountered during development and how they were overcome.

- **AWS SDK Availability:** Identified alternative ways to utilize AWS services
- **API Gateway Format Differences:** Identified and adjusted the Lambda function to handle different data formats (HTTP API Gateway compared to REST API)
- **Database Connectivity:** When troubleshooting a connectivity problem didn't work, I decided to provide mock data. By providing detailed instruction, the user will be able to experience all application features until the issue is resolved
- **HTTPS for GPS** Identified browsers require HTTPS to utilize geolocation in production environment. Built a CloudFront distribution to implement all requirements
- **CORS Errors:** Solved "blocked by CORS policy" errors by moving all the permission headers to the Lambda functions

## Error Handling

- **Error Responses:** Confirmed Lambda functions were assigned with try-catch blocks
- **HTTPS Status Codes** Implemented HTTP status codes were returned for client and server side errors (200, 400, 201, 500)
- **CloudWatch Logs** Learned and utilized CloudWatch's real-time monitoring to identify bugs

## Bonus Points Notes

- **TypeScript Usage:** Backend Lambda function uses ES module TypeScript syntax
- **AWS Lambda Deployment:** Successfully deployed serverless backend using AWS Lambda
- **Authentication:** Complete JWT-based user authentication system with secure password hashing, token verification, and protected routes using AWS Lambda and DynamoDB
