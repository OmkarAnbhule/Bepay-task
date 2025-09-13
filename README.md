# BePay Backend Task

Simple Node.js backend with MongoDB aggregation using `$lookup` to join Orders and Users.

## Quick Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB** (make sure it's running on localhost:27017)

3. **Seed database**
   ```bash
   npm run seed
   ```

4. **Start server**
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/orders` - **Main endpoint** with `$lookup` aggregation
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `POST /api/orders` - Create order

## Test the Aggregation

```bash
curl http://localhost:3000/api/orders
```

This returns orders with user details using MongoDB `$lookup` aggregation pipeline.
