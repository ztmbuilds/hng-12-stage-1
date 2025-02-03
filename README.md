# Number Classification API

This project is a simple Express.js API that takes a number and returns interesting mathematical properties about it, along with a fun fact.

## Getting Started

### Prerequisites

The tools listed below are needed to run this application:

- Node
- Npm

You can check the Node.js and npm versions by running the following commands.

### Check node.js version

`node -v`

### Check npm version

`npm -v`

## Installation

To run this API on your local machine:

- Install project dependencies by running `npm install`.

- Start the server with `node index.js`

- Server will be listening for requests on port 3000

## API Documentation

### Endpoint URL

`GET /api/classify-number`

### Request

- parameters: number

### Success(200) Response

The response is a JSON object with the following format:

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11, // sum of its digits
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371" //gotten from the numbers API
}
```

### Bad Request(400) Response

The response is a JSON object with the following format:

```json
{
  "number": "alphabet",
  "error": true
}
```
