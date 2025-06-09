import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../components/auth/AuthContext';
import { Navigate } from 'react-router';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();

  // Rediriger si déjà connecté
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <LoginForm />
      </div>
    </div>
  );
} 