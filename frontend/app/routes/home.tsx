import React from 'react';
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../components/auth/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tocarde - Compiègne" },
    { name: "description", content: "Bienvenue en capitale de la Tocardie !" },
  ];
}

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const userData = user?.user || user;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : isAuthenticated ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Bienvenue, { userData?.username || userData?.display } !
            </h1>
            <p className="text-gray-600">
              Vous êtes connecté avec succès à votre compte. Explorez notre application et profitez de toutes ses fonctionnalités.
            </p>
            {/* Ajouter ici du contenu réservé aux utilisateurs connectés */}
          </div>
        ) : (
          <div>
            <Welcome />
            <div className="mt-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Rejoignez notre communauté
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mb-6">
                Inscrivez-vous ou connectez-vous pour accéder à toutes les fonctionnalités de notre application.
              </p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="/login"
                  className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-md font-medium hover:bg-blue-50"
                >
                  Se connecter
                </a>
                <a
                  href="/signup"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                >
                  S'inscrire
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
