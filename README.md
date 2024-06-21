# Slidely Backend

## Overview

This backend application is designed to handle form submissions for Slidely. It provides the following functionalities:

- **/ping**: A GET request that always returns `True`.
- **/submit**: A POST request to submit form data with parameters `name`, `email`, `phone`, `github_link`, and `stopwatch_time`.
- **/read**: A GET request to read a specific form submission based on the provided index.

The form submissions are stored in a `db.json` file.

## Setup Instructions

Follow these steps to set up and run the backend server locally:

### Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager) installed.

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repo/slidely-backend.git
    cd slidely-backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

### Configuration

1. **Ensure you have a `db.json` file**:

    In the root directory of your project (where `index.ts` and `routes.ts` are located), create a `db.json` file with the following initial content:

    ```json
    {
        "submissions": []
    }
    ```

### Running the Server

1. **Compile TypeScript files**:

    ```bash
    npx tsc
    ```

2. **Start the server**:

    ```bash
    npm run dev
    ```

### API Endpoints

- **/ping**: 
  - **Method**: GET
  - **Description**: Returns `True` to indicate the server is running.
  - **Example**: `GET http://localhost:7000/ping`

- **/submit**: 
  - **Method**: POST
  - **Description**: Submits form data.
  - **Parameters**:
    - `name` (string)
    - `email` (string)
    - `phone` (string)
    - `github_link` (string)
    - `stopwatch_time` (string)
  - **Example**: `POST http://localhost:7000/routes/submit`

    ```json
    {
      "name": "Deepak pm",
      "email": "iamdeepakpm282@gmail.com",
      "phone": "1234567890",
      "github_link": "https://github.com/deepakpm282",
      "stopwatch_time": "00:01:23"
    }
    ```

- **/readByEmail**: 
  - **Method**: GET
  - **Description**: Reads all the forms submitted
  - **Query Parameter**: `index` (0-based integer)
  - **Example**: `GET http://localhost:7000/routes/readByEmail?email={email}`
  - **set email = "test1@gmail.com"**

- **/read**: 
  - **Method**: GET
  - **Description**: Reads all the forms submitted
  - **Query Parameter**: `index` (0-based integer)
  - **Example**: `GET http://localhost:7000/routes/read?index=0`

- **/get-total**: 
  - **Method**: GET
  - **Description**: Gets number of forms.
  - **Example**: `GET http://localhost:7000/routes/get-total`

## Troubleshooting

- **Common Errors**:
  - Ensure that the `db.json` file exists and is in the correct format.
  - Check that all required parameters are provided in the `/submit` request.
  - Make sure the server is running on the correct port (7000 by default).

- **Debugging**:
  - Use the browser or tools like Postman to test the endpoints.
  - Check server logs for any error messages.
