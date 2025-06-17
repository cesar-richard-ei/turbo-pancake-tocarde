import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getCSRFToken } from "~/lib/django";

export default function VerifyEmail() {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const csrfCookie = getCSRFToken()

        if (!csrfCookie) {
          throw new Error("CSRF token not found");
        }

        const response = await fetch("/api/_allauth/browser/v1/auth/email/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfCookie,
          },
          body: JSON.stringify({ key }),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        setStatus("success");
        setMessage("Votre adresse email a été vérifiée avec succès !");
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setStatus("error");
        setMessage("Erreur lors de la vérification de l'email. Le lien est peut-être expiré ou invalide.");
        console.error("Erreur de vérification d'email:", error);
      }
    };

    verifyEmail();
  }, [key, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Vérification d'email</h1>

        {status === "loading" && (
          <div className="text-center">
            <p className="mb-4">Vérification de votre adresse email en cours...</p>
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
                <p className="mt-2 text-sm text-red-700">
                  <button
                    onClick={() => navigate("/login")}
                    className="font-medium text-red-700 underline"
                  >
                    Retour à la page de connexion
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
