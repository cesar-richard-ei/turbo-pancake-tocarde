import React, { useEffect, useRef, useState } from 'react';
import type { Route } from "./+types/profile";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../components/auth/AuthContext";
import { Navigate } from 'react-router';
import ChangePasswordDialog from '../components/auth/ChangePasswordDialog';
import { getFalucheStatus } from '~/lib/falucheStatus';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tocarde - Profil utilisateur" },
    { name: "description", content: "Gérez votre profil utilisateur" },
  ];
}

export default function Profile() {
  const { isAuthenticated, user, isLoading, refreshUser } = useAuth();
  // Utiliser une ref pour éviter les boucles infinies
  const initialLoadDone = useRef(false);
  const [openChange, setOpenChange] = useState(false);

  // Rafraîchir les données utilisateur une seule fois au chargement de la page
  useEffect(() => {
    if (isAuthenticated && !initialLoadDone.current) {
      refreshUser();
      initialLoadDone.current = true;
    }
  }, [isAuthenticated, refreshUser]);

  // Redirection si l'utilisateur n'est pas connecté
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleRefresh = async () => {
    await refreshUser();
  };

  const userData = user?.profile;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <ChangePasswordDialog open={openChange} onOpenChange={setOpenChange} />

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Profil utilisateur
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Informations personnelles et préférences
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Rafraîchir les données
                </button>
                <button
                  onClick={() => setOpenChange(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Changer de mot de passe
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.email || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Prénom</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.first_name || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Nom</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.last_name || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Statut de Faluche</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {getFalucheStatus(userData?.faluche_status) || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Surnom de Faluche</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.faluche_nickname || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.address || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Ville</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.city || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Code postal</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.zip_code || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Pays</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.country || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Numéro de téléphone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.phone_number || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date de naissance</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userData?.birth_date || <span className="text-gray-400 italic">Non disponible</span>}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
