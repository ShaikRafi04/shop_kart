# ShopKart 🛍️

ShopKart is a full-stack e-commerce web application built with **React** on the frontend and **Node.js, Express, and MongoDB** on the backend. It includes core shopping features such as product browsing, customer authentication, cart management, wishlists, order handling, and Razorpay payment integration.

> This project is under active development. Some setup or production-hardening work may be needed before deployment.

## Features

- **Product catalog** — browse products from the backend.
- **Customer authentication** — account-related routes protected with JWT-based authentication.
- **Shopping cart** — manage items before checkout.
- **Wishlist** — save products for later.
- **Order management** — create and manage customer orders.
- **Payment integration** — Razorpay configuration for checkout/payment workflows.
- **MongoDB persistence** — store customer, product, and order data.
- **Responsive React UI** — frontend powered by Vite, React Router, Axios, and Lucide icons.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, Axios, Lucide React |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcrypt, cookie-parser |
| Payments | Razorpay |

## Project Structure

```text
shop_kart/
├── backend/
│   ├── config/          # Service configuration (including Razorpay)
│   ├── controllers/     # Customer, product, cart, wishlist, and order logic
│   ├── middlewares/     # Authentication middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express API routes
│   ├── utils/           # Shared backend utilities
│   ├── index.js         # API server entry point
│   ├── seed.js          # Product/data seeding script
│   └── package.json
└── frontend/
    ├── src/             # React application source
    ├── public/           # Static assets
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) (a current LTS version is recommended)
- npm (included with Node.js)
- A MongoDB database, either local or [MongoDB Atlas](https://www.mongodb.com/atlas)
- Razorpay test credentials for payment testing

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ShaikRafi04/shop_kart.git
cd shop_kart
```

### 2. Configure the backend

Create a `.env` file inside `backend/` with your own credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

**Important:** Never commit real credentials or API secrets. If a credential has already been pushed to a public repository, revoke or rotate it and remove the secret from the repository history where appropriate. Keep `.env` out of version control.

### 3. Install backend dependencies

```bash
cd backend
npm install
```

Start the backend in development mode:

```bash
npm run dev
```

The API should start on `http://localhost:5000` by default. Opening that URL should return a JSON message indicating that the ShopKart backend is running.

### 4. Install frontend dependencies

Open a **second terminal** from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Vite runs the frontend at:

```text
http://localhost:5173
```

The Vite development server is configured to proxy API requests for `/customers`, `/products`, `/wishlist`, `/cart`, and `/orders` to the backend on port 5000.

### 5. Seed the database (optional)

If you want to load the sample data defined by the project:

```bash
cd backend
npm run seed
```

Ensure your backend `.env` contains a valid `MONGO_URI` before running the seed script.

## API Route Groups

The backend mounts these route groups:

| Base path | Purpose |
| --- | --- |
| `/customers` | Customer and authentication operations |
| `/products` | Product catalog operations |
| `/wishlist` | Wishlist operations |
| `/cart` | Shopping cart operations |
| `/orders` | Order and checkout operations |
| `/` | Backend health check |

The exact endpoints and request payloads are defined in the route files under `backend/routes/`.

## Available Scripts

### Backend (`backend/`)

| Command | Description |
| --- | --- |
| `npm run dev` | Restart the backend automatically when files change |
| `npm start` | Start the backend |
| `npm run seed` | Run the seed script |
| `npm test` | Placeholder script; automated tests are not configured yet |

### Frontend (`frontend/`)

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Security Notes

- Use your own environment variables; do not copy credentials from commits or screenshots.
- Use a strong, unique `JWT_SECRET`.
- Use Razorpay **test mode** while developing and never expose the Razorpay secret key in frontend code.
- Before production, restrict CORS to trusted origins and review authentication, cookie settings, input validation, error handling, and payment verification.
- Do not commit `node_modules`; install dependencies with npm instead.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Make your changes and test them locally.
4. Commit your changes and push the branch.
5. Open a pull request with a clear description.

## Author

**Shaik Rafi**  
GitHub: [@ShaikRafi04](https://github.com/ShaikRafi04)

---

Built as a full-stack learning project to explore e-commerce application development.
