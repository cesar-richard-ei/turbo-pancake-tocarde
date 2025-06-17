import React, { useState } from 'react';
import { signUp } from '../../lib/allauth';
import { useNavigate } from 'react-router';
import { GoogleAuthButton } from './GoogleAuthButton';

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Vérifier que les mots de passe correspondent
    if (formData.password1 !== formData.password2) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    try {
      if (formData.password1 !== formData.password2) {
        setError('Les mots de passe ne correspondent pas');
        setIsLoading(false);
        return;
      }

      const response = await signUp({
        email: formData.email,
        password: formData.password1,
      });

      if (response.status === 200) {
        if (response.meta?.is_authenticated) {
          // L'utilisateur est authentifié, rediriger vers la page d'accueil
          setSuccess(true);
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else if (response.data?.email_verification_required) {
          // Vérification par email requise
          setSuccess(true);
          setTimeout(() => {
            navigate('/email-verification-sent');
          }, 1500);
        } else {
          // Autre cas de succès
          setSuccess(true);
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
      } else {
        // Gérer les erreurs de validation du formulaire
        if (response?.errors) {
          const errorMessages = Object.values(response.errors).flat().map((msg) => msg.message);
          setError(errorMessages.join('. '));
        } else {
          setError(response.message || 'Une erreur s\'est produite lors de l\'inscription');
        }
      }
    } catch (err) {
      setError('Une erreur s\'est produite lors de l\'inscription');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="p-4 bg-green-100 text-green-700 rounded-lg mb-4">
          <h3 className="text-lg font-medium">Inscription réussie!</h3>
          <p>Vous allez être redirigé...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password1" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
          </div>
        </div>

        <div className="mt-6">
          <GoogleAuthButton type="signup" callbackPath="/auth/callback" className="w-full" />
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        Déjà un compte?{' '}
        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Se connecter
        </a>
      </p>
    </div>
  );
}
