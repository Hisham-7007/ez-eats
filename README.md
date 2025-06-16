# EZ EATS - Fullstack Restaurant Ordering System

A modern, responsive restaurant ordering application built with Next.js, TypeScript, MongoDB, and Paymob payment integration.

## Features

### Frontend

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **User Authentication**: Secure login with JWT tokens
- **Menu Browsing**: Categorized menu items with filtering
- **Shopping Cart**: Persistent cart with floating action button
- **Checkout Process**: Complete order management and payment
- **Payment Integration**: Paymob test environment integration

### Backend

- **RESTful API**: Built with Next.js API routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication system
- **Security**: Password hashing with bcrypt
- **Payment Processing**: Paymob payment gateway integration

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Paymob Payment Gateway
- **UI Components**: shadcn/ui, Lucide React Icons
- **Styling**: Tailwind CSS

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Paymob test account (for payment integration)

## Quick Start

### 2. Install Dependencies

npm install

### 5. Run the Application

npm run dev

# Production build

npm run build
npm start

## Demo Credentials

For testing purposes, use these credentials:

- **Email**: `admin@ezeats.com`
- **Password**: `password123`

### 3. Environment Setup

Create a `.env.local` file in the root directory:

-MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ezeats
-JWT_SECRET=your-super-secret-jwt-key-here
-PAYMOB_API_KEY=your-paymob-api-key
-PAYMOB_INTEGRATION_ID=your-paymob-integration-id

# Database

MONGODB_URI=mongodb://localhost:27017/ezeats

# or for MongoDB Atlas:

# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ezeats

# JWT Secret (use a strong, random string)

JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Paymob Configuration

PAYMOB_API_KEY=your-paymob-api-key

PAYMOB_INTEGRATION_ID=your-paymob-integration-id

⚠️ In payment/create/route.ts Add YOUR_IFRAME

### 🍽️ Adding New Menu Items

Menu items are automatically seeded on first login if the database is empty.

This happens inside the login API. After successful login, the system checks if there are any existing menu items.

If no items exist, it calls the seedMenuItems() function to insert 10 predefined sample dishes (appetizers, mains, desserts, beverages).

This ensures the app has data to display immediately without manual input.

### 1. Authentication

- Users log in with email and password
- JWT token is stored in localStorage and cookies
- Token persists across browser refreshes

### 2. Menu Browsing

- Browse menu items by category (All, Appetizers, Mains, Desserts, Beverages)
- View item details including image, name, description, and price
- Add items to cart with quantity selection

### 3. Shopping Cart

- Floating cart button shows item count and total price
- Persistent cart storage in localStorage
- Cart survives page refreshes and navigation

### 4. Checkout Process

- Review order summary with item details
- Modify quantities or remove items
- Calculate subtotal, tax (10%), and total
- Proceed to Paymob payment gateway

### 5. Payment & Confirmation

- Secure payment processing through Paymob
- Payment success/failure handling
- Order confirmation and cart clearing

## API Endpoints

### Authentication

`POST /api/auth/login` - User login

### Menu

`GET /api/menu` - Get all menu items (protected)

### Payment

- `POST /api/payment/create` - Create payment session (protected)
- `POST /api/payment/callback` - Handle payment callback

## Paymob Integration Setup

### 1. Create Paymob Account

## Database Schema

### User Model

\`\`\`typescript
{
email: String (unique, required)
password: String (hashed, required)
name: String (required)
timestamps: true
}
\`\`\`

### MenuItem Model

\`\`\`typescript
{
name: String (required)
description: String (required)
price: Number (required)
category: String (enum: appetizers, mains, desserts, beverages)
image: String (default: placeholder)
available: Boolean (default: true)
timestamps: true
}
\`\`\`

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware protection for sensitive endpoints
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup

## UI/UX Features

- **Mobile-First Design**: Responsive across all devices
- **Loading States**: User feedback during async operations
- **Error Handling**: Graceful error messages and fallbacks
- **Toast Notifications**: Real-time user feedback
- **Accessibility**: ARIA labels and keyboard navigation support

## Testing

### Test Payment Cards (Paymob)

Use these test card numbers in Paymob's test environment:

- **Successful Payment**: 4987654321098769
- **Failed Payment**: 4000000000000002

## 🚀 Deployment

### Environment Variables for Production

\`\`\`env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
PAYMOB_API_KEY=your-production-paymob-key
PAYMOB_INTEGRATION_ID=your-production-integration-id
\`\`\`

### Common Issues

1. **MongoDB Connection Error**

   - Verify MongoDB is running
   - Check connection string format
   - Ensure network access for MongoDB Atlas

2. **JWT Token Issues**

   - Clear localStorage and cookie and login again
   - Verify JWT_SECRET is set correctly

3. **Payment Integration Issues**

   - Verify Paymob credentials
   - Check API key permissions
   - Ensure webhook URL is accessible
   - ⚠️ Add YOUR_IFRAME in `payment/create/route.ts`

4. **Build Errors**
   - Clear `.next` folder and rebuild
   - Check for TypeScript errors
   - Verify all dependencies are installed

To modify the payment process:

1. Update payment creation logic in `/app/api/payment/create/route.ts`
2. Customize the checkout UI in `/app/checkout/page.tsx`
3. Handle additional payment methods as needed
