# CSC Solutions Frontend

A React-based frontend application for CSC Solutions, built with Vite, React Router, and TailwindCSS. This application provides user authentication, product management, and payment integration using Razorpay.

## Features

- User authentication (Login/Signup)
- Protected routes with PrivateRoute component
- Product display and management
- Payment integration with Razorpay
- Google reCAPTCHA for security
- Responsive design with TailwindCSS

## Architecture

The application follows a component-based architecture using React:

### Folder Structure

```
src/
├── Components/
│   ├── nav.jsx          # Navigation bar component
│   ├── PaymentComponent.jsx  # Razorpay payment integration
│   ├── PrivateRoute.jsx      # Route protection for authenticated users
│   └── ProductCard.jsx       # Product display component
├── Pages/
│   ├── Home.jsx         # Main dashboard/home page
│   ├── Login.jsx        # User login page
│   └── Signup.jsx       # User registration page
├── App.jsx              # Main application component with routing
├── App.css              # Global styles
└── main.jsx             # Application entry point
```

### Key Components

- **App.jsx**: Sets up React Router with protected and public routes
- **PrivateRoute**: Higher-order component that checks authentication before rendering protected pages
- **Nav**: Navigation component for site-wide navigation
- **PaymentComponent**: Handles Razorpay payment processing
- **ProductCard**: Displays individual product information

### Pages

- **Home**: Main application page (requires authentication)
- **Login**: User authentication page
- **Signup**: User registration page

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Configuration

Create a `.env` file in the root of the frontend directory with the following variables:

```env
VITE_RAZORPAY_KEY=your_razorpay_key_here
VITE_BACKEND_URL=http://localhost:5000
```

### Environment Variables

- `VITE_RAZORPAY_KEY`: Your Razorpay API key for payment processing
- `VITE_BACKEND_URL`: URL of the backend API server

**Note**: The reCAPTCHA site key is currently hardcoded in `index.html`. For production, consider moving it to environment variables as well.

## Running the Application

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Build for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint for code quality checks:

```bash
npm run lint
```

## Technologies Used

- **React 19**: Frontend framework
- **Vite**: Build tool and development server
- **React Router DOM**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **Razorpay**: Payment gateway integration
- **Google reCAPTCHA**: Bot protection
- **ESLint**: Code linting

## Backend Integration

This frontend communicates with a Django backend API. Ensure the backend server is running on the URL specified in `VITE_BACKEND_URL` for full functionality.

## Contributing

1. Follow the existing code style and architecture patterns
2. Run linting before committing
3. Test components thoroughly
4. Update this README if adding new features or changing architecture
