# Library API - Books Resource

## Endpoints

- **GET /books**
  - List all books
  - Success: 200 OK

- **GET /books/{id}**
  - Get one book by ID
  - Success: 200 OK

- **POST /books**
  - Create a new book
  - Request body:
    ```json
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year": 1925
    }
    ```
  - Success: 201 Created

- **PUT /books/{id}**
  - Update an existing book
  - Request body:
    ```json
    {
      "title": "The Great Gatsby (Updated)",
      "year": 1926
    }
    ```
  - Success: 200 OK

- **DELETE /books/{id}**
  - Delete a book by ID
  - Success: 204 No Content

- **GET /books?author=Name**
  - List books by a specific author
  - Success: 200 OK

## Error Codes

- **400 Bad Request**
  - Example: Missing required field `title` when creating a book

- **404 Not Found**
  - Example: Requesting `/books/999` when no book with ID 999 exists
