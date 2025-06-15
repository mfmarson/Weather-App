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
This section outlines the key milestones and progress made during the development of this weather application not found in commits.

### Initial Setup
- Created project repository and initialized Git.
- Set up root `README.md` with initial structure and tech stack.

### AWS Infrastructure Setup
- **AWS Account Setup**
- **IAM Role Creation:** Created `WeatherAppLambdaRole` with `AWSLambdaBasicExecutionRole` permissions for Lambda execution.
- **OpenWeatherMap API** 
- **Lambda Function Creation:** 
  - Created `weather-app-api` Lambda function using Node.js 20.x runtime
  - Configured ES module syntax (`export const handler`)
  - Added secure environment variable storage for `OPENWEATHER_API_KEY`
  - Implemented weather data fetching from OpenWeatherMap API
  - Added proper error handling and CORS headers
  - Successfully tested weather data retrieval
- **Backend Testing:** Verified Lambda function successfully calls OpenWeatherMap API and returns formatted weather data (city, temperature, description, humidity).

### Backend Project Initialization & TypeScript Setup
- *(To be completed)*

### Frontend Project Setup
- *(To be completed)*

## API Integration & Security
The OpenWeatherMap API integration is secured through AWS Lambda environment variables, preventing API key exposure to the frontend. The Lambda function handles all external API calls and returns formatted weather data to the client.

## Authentication Implementation
- **Database Setup:** Created User_Authentication DynamoDB table with userId primary key and GSI on email field for efficient lookups
- **Lambda Function:** Built UserAuthentication function with ES module syntax, routing logic for multiple endpoints, and comprehensive error handling
- **API Gateway Integration:** Extended existing HTTP API with authentication routes:
  - GET /auth/verify - Token verification
  - POST /auth/login - User login
  - POST /auth/register - User registration
  - OPTIONS /{proxy+} - CORS handling
- **Testing & Validation:** Successfully tested all endpoints via browser (GET) and fetch() API calls (POST) with proper HTTP status codes

## Error Handling
Lambda function includes try-catch blocks with proper HTTP status codes (200 for success, 500 for server errors) and structured error responses.

## Bonus Points Notes
- **TypeScript Usage:** Backend Lambda function uses ES module TypeScript syntax
- **AWS Lambda Deployment:** Successfully deployed serverless backend using AWS Lambda

## Submission Notes
