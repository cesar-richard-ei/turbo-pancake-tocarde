import React from 'react';
import { SignupForm } from '../components/auth/SignupForm';
import { useAuth } from '../components/auth/AuthContext';
import { Navigate } from 'react-router';

export default function SignupPage() {
  const { isAuthenticated, isLoading } = useAuth();

  // Rediriger si déjà connecté
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-blue-100 to-gold-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="inline-block w-16 h-16 bg-gradient-to-br from-royal-blue-800 to-gold-400 rounded-full items-center justify-center mb-6">
            <span className="text-gold-300 font-bold text-2xl">LT</span>
          </div>
          <h2 className="text-3xl font-extrabold text-royal-blue-900">
            Créez votre compte
          </h2>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}