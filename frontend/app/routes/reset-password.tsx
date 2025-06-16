import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getCSRFToken } from "~/lib/django";

export default function ResetPassword() {
  const { key, uid } = useParams<{ key: string; uid: string }>();
  const navigate = useNavigate();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [status, setStatus] = useState<"form" | "loading" | "success" | "error">("form");
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password1 !== password2) {
      setMessage("Les mots de passe ne correspondent pas.");
      setStatus("error");
      return;
    }
    
    if (password1.length < 8) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères.");
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    
    try {
      const response = await fetch("/api/_allauth/browser/v1/auth/password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken() || "",
        },
        body: JSON.stringify({ key, uid, password1, password2 }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      setStatus("success");
      setMessage("Votre mot de passe a été réinitialisé avec succès !");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setStatus("error");
      setMessage("Erreur lors de la réinitialisation du mot de passe. Le lien est peut-être expiré ou invalide.");
      console.error("Erreur de réinitialisation de mot de passe:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Réinitialisation de mot de passe</h1>
        
        {status === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password1" className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <input
                id="password1"
                name="password1"
                type="password"
                required
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Réinitialiser le mot de passe
              </button>
            </div>
          </form>
        )}
        
        {status === "loading" && (
          <div className="text-center">
            <p className="mb-4">Réinitialisation de votre mot de passe en cours...</p>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500"></div>
          </div>
        )}
        
        {status === "success" && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{message}</p>
                <p className="mt-2 text-sm text-green-700">Redirection vers la page de connexion...</p>
              </div>
            </div>
          </div>
        )}
        
        {status === "error" && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{message}</p>
                <button
                  onClick={() => setStatus("form")}
                  className="mt-2 text-sm font-medium text-red-700 underline"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 