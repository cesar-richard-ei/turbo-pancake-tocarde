import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { authenticateByToken, providerSignup, getAuth, type AuthProcessType } from '../../lib/allauth';

type CallbackStatus = 'loading' | 'success' | 'error' | 'signup-required';

export function AuthCallback() {
  const [status, setStatus] = useState<CallbackStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Parse the query parameters
        const queryParams = new URLSearchParams(location.search);
        const process = queryParams.get('process') || 'login';
        const providerId = queryParams.get('provider') || 'google';
        const token = queryParams.get('token');

        // Vérifier d'abord si l'utilisateur est déjà authentifié
        const authResponse = await getAuth();
        if (authResponse.status === 200 && authResponse.meta?.is_authenticated) {
          setStatus('success');
          setUserData(authResponse.data);

          // Rediriger vers la page d'accueil après un court délai
          setTimeout(() => {
            navigate('/');
          }, 1500);
          return;
        }

        // Si l'utilisateur n'est pas authentifié, vérifier le token
        if (!token) {
          setStatus('error');
          setErrorMessage('Token manquant dans l\'URL de callback');
          return;
        }

        // Authenticate with the token
        const response = await authenticateByToken(providerId, token, process as AuthProcessType);

        if (response.status === 200) {
          if (response.meta?.is_authenticated) {
            setStatus('success');

            // Récupérer les infos utilisateur
            const authResponse = await getAuth();
            if (authResponse.status === 200) {
              setUserData(authResponse.data);
            }

            // Rediriger vers la page d'accueil après un court délai
            setTimeout(() => {
              navigate('/');
            }, 1500);
          } else if (response.data?.provider_account) {
            // L'utilisateur doit compléter son inscription
            setStatus('signup-required');
            setUserData(response.data);
          } else {
            setStatus('error');
            setErrorMessage('Authentification échouée');
          }
        } else {
          setStatus('error');
          setErrorMessage(response.message || 'Erreur d\'authentification');
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage('Une erreur s\'est produite lors de l\'authentification');
        console.error('Auth callback error:', error);
      }
    };

    handleCallback();
  }, [location.search, navigate]);

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData?.provider_account) {
      return;
    }

    try {
      const response = await providerSignup({
        provider_account: userData.provider_account
      });

      if (response.status === 200 && response.meta?.is_authenticated) {
        setStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setStatus('error');
        setErrorMessage(response.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Une erreur s\'est produite lors de l\'inscription');
      console.error('Signup error:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700">Authentification en cours...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <h2 className="text-lg font-bold">Erreur d'authentification</h2>
          <p>{errorMessage}</p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Retour à la page de connexion
        </button>
      </div>
    );
  }

  if (status === 'signup-required' && userData?.provider_account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center">Compléter votre inscription</h2>
          <form onSubmit={handleCompleteSignup}>
            <div className="mb-4">
              <p className="text-gray-700">
                Votre compte Google est prêt à être lié. Cliquez sur le bouton ci-dessous pour terminer votre inscription.
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Terminer l'inscription
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
        <h2 className="text-lg font-bold">Authentification réussie</h2>
        <p>Vous êtes maintenant connecté.</p>
      </div>
      <p className="mb-4">Redirection en cours...</p>
    </div>
  );
}
