# Weather App Project

This repository contains a simple weather application, demonstrating skills in React, TypeScript, and AWS cloud services (Lambda, API Gateway, S3, CloudFront).

## Technologies Used

- **Frontend:** React, TypeScript
- **Backend:** AWS Lambda (Node.js with TypeScript), AWS API Gateway
- **Deployment:** AWS S3 (static hosting), AWS CloudFront (CDN)
- **Authentication:** JWT-based authentication with AWS Lambda and DynamoDB
- **Version Control:** Git, GitHub

## Project Overview

The application allows users to enter a city name to retrieve current weather details (temperature, conditions, humidity, etc.) from a 3rd-party weather API. All API requests are proxied securely through an AWS Lambda backend to prevent exposure of the API key on the frontend. The frontend is statically hosted on AWS S3/CloudFront with user authentication powered by AWS Lambda and DynamoDB.

## Setup & Local Development

*(This section will be expanded with detailed instructions later)*

### Prerequisites

- Node.js
- npm or yarn
- An AWS Account
- An API Key from a 3rd-party weather service (OpenWeatherMap)

## Development Log

This section outlines the progress made during the development of this weather application not found in commits.

## Current Status

- ✅ Weather API Integration
- ✅ User Registration and Login
- ✅ JWT Token Authentication
- 🚧 Frontend Development (In-progress)
- 🚧 Deployment & Integration
- 🚧 Final Testing

### Initial Setup

- Created project repository and initialized Git.
- Set up root `README.md` with initial structure and tech stack.

### Frontend Project Setup

- *(To be completed)*

## Backend Setup & AWS Infrastructure

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

#### Technical Challenges Resolved

- **AWS Library Errors:** Resolved SDK availability bug by identifying alternative approach using runtime-available APIs
- **API Gateway Format Differences:** Learned that HTTP API Gateway sends data in a different format than expected and updated code to handle both formats
- **Database Connection Issues:** When the standard database connection tools didn't work, created a backup plan to keep the authentication system functional

#### Authentication Flow Validation

- **Registration Testing:** Successfully created users with secure password storage and immediate JWT token response
- **Login Testing:** Verified credential validation against mock user database with proper password verification
- **Token Verification:** Confirmed JWT token validation with user information extraction
- **Security Testing:** Validated error responses for invalid credentials, expired tokens, and malformed requests

### Error Handling

Lambda functions include try-catch blocks with proper HTTP status codes (200 for success, 401 for authentication errors, 500 for server errors) and structured error responses with detailed logging via CloudWatch.

## Bonus Points Notes

- **TypeScript Usage:** Backend Lambda function uses ES module TypeScript syntax
- **AWS Lambda Deployment:** Successfully deployed serverless backend using AWS Lambda  
- **Authentication:** Complete JWT-based user authentication system with secure password hashing, token verification, and protected routes using AWS Lambda and DynamoDB

## Submission Notes
