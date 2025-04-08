# Product Filter API

A simple Express.js API that filters products based on provided IDs.

## Features

- Filter products by IDs
- CORS enabled
- Health check endpoint
- Error handling

## API Endpoints

### POST /api/products
Filter products by IDs

Request body:
```json
{
  "ids": ["id1", "id2", "id3"]
}
```

Response:
```json
{
  "id1": {
    // product data
  },
  "id2": {
    // product data
  }
}
```

### GET /health
Health check endpoint

Response:
```json
{
  "status": "OK"
}
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on port 8000 by default.

## Deployment

This application can be deployed to Render.com:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variable: `PORT=10000` (or your preferred port) 