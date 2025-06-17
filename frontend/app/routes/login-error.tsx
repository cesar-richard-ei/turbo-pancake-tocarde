import { useNavigate } from "react-router";

export default function LoginError() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Erreur de connexion</h1>

        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Une erreur s'est produite lors de la tentative de connexion avec votre compte social.
              </p>
              <p className="mt-2 text-sm text-red-700">
                Veuillez réessayer ou utiliser une autre méthode de connexion.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Retour à la connexion
          </button>

          <button
            onClick={() => navigate("/")}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  );
}
