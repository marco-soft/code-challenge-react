# Code Challenge - Marco Garofalo

## Submittals Application

This is a React application for basic managing submittals.

## Features

- Display submittals in a responsive table
- Create new submittals via a modal form
- Deep linking to individual submittal details

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- Material UI
- React Router v6
- Axios
- Jest & React Testing Library

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the app

## Project Structure

```
src/
  ├── components/        # React components
  ├── features/          # Feature-specific components
  ├── pages/             # Page components
  ├── routes/            # Route configuration
  ├── services/          # API services
  ├── store/             # Redux store configuration
  ├── styles/            # Global styles
  ├── types/             # TypeScript type definitions
  └── utils/             # Utility functions
```

## API Integration

The application uses Beeceptor for mock API endpoints:
- GET /submittals - Fetch all submittals
- POST /submittals - Create a new submittal

## Testing

Run the test suite:
```bash
npm test
```