# Firma Backend (Spring Boot + MongoDB)

This is a minimal scaffold for the Firma backend. It exposes a simple Product API and connects to MongoDB.

Quick start (requires Java 17+, Maven, and MongoDB running locally):

```bash
# from workspace root
cd backend
mvn spring-boot:run
```

Default server port: `8080`
MongoDB connection: `mongodb://localhost:27017/firma`

Next steps:
- Implement authentication (JWT + BCrypt) and user endpoints.
- Add image storage (GridFS or object storage) and accept multipart uploads.
- Add pagination, search, filters on `/api/products`.
- Harden CORS, validation, and security.
