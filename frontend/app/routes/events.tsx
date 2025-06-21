import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "~/lib/event";
import { EventCard } from "~/components/eventCard";
import { Spinner } from "~/components/ui/spinner";
import { Separator } from "~/components/ui/separator";
import { useState } from "react";
import { Calendar, ExternalLink, Filter, Mail, Menu, MapPin } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Link } from 'react-router';
import { useAuth } from "~/components/auth/AuthContext";

export function meta() {
  return [
    { title: "Tous les événements - La Tocarde" },
    { name: "description", content: "Découvrez tous les événements de La Tocarde" },
  ];
}

export default function Events() {
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const userData = user?.user || user;
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: events = { results: [] }, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    atCompiegne: true,
    isPublic: true,
    type: "ALL"
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const updateFilter = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const filteredEvents = events.results.filter(event => {
    if (filters.atCompiegne && !event.at_compiegne) return false;
    if (filters.isPublic && !event.is_public) return false;
    if (filters.type !== "ALL" && event.type !== filters.type) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-100 to-gold-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-[inset_0px_-5px_4px_-5px_hsl(59,_100%,_33%)] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-royal-blue-800 to-gold-400 rounded-full flex items-center justify-center">
                <span className="text-gold-300 font-bold text-lg">LT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-royal-blue-800">La Tocarde</h1>
                <p className="text-sm text-royal-blue-700">Association Étudiante</p>
              </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-royal-blue-800 hover:text-gold-500 transition-colors">
                Accueil
              </Link>
              <Link to="/events" className="text-royal-blue-800 hover:text-gold-500 transition-colors border-b-2 border-gold-400">
                Événements
              </Link>
              <Link to="#apropos" className="text-royal-blue-800 hover:text-gold-500 transition-colors">
                À propos
              </Link>
              <Link to="#contact" className="text-royal-blue-800 hover:text-gold-500 transition-colors">
                Contact
              </Link>
            </nav>
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isLoading ? (
                <Button variant="ghost" size="sm" className="text-royal-blue-800" disabled>
                  Chargement...
                </Button>
              ) : isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Badge variant="secondary">Mon profil</Badge>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-royal-blue-800 hover:bg-gold-100"
                    onClick={async () => {
                      await logout();
                    }}
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-royal-blue-800 hover:bg-gold-100">
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-gold-400 hover:bg-gold-500 text-royal-blue-900">
                      S'inscrire
                    </Button>
                  </Link>
                </>
              )}
            </div>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-royal-blue-800 hover:bg-gold-100"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2 animate-in slide-in-from-top-4 duration-300">
              <Link to="/" className="block text-royal-blue-800 hover:text-gold-500">
                Accueil
              </Link>
              <Link to="/events" className="block text-royal-blue-800 hover:text-gold-500 font-semibold">
                Événements
              </Link>
              <Link to="#apropos" className="block text-royal-blue-800 hover:text-gold-500">
                À propos
              </Link>
              <Link to="#contact" className="block text-royal-blue-800 hover:text-gold-500">
                Contact
              </Link>
              <div className="pt-2 border-t border-gold-200 space-y-2">
                {isLoading ? (
                  <Button variant="ghost" size="sm" className="w-full" disabled>
                    Chargement...
                  </Button>
                ) : isAuthenticated ? (
                  <>
                    <Link to="/profile" className="block text-royal-blue-800 hover:text-gold-500">
                      Mon profil
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-royal-blue-800 hover:bg-gold-100 w-full"
                      onClick={async () => {
                        await logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block text-royal-blue-800 hover:text-gold-500">
                      Connexion
                    </Link>
                    <Link to="/signup" className="block text-royal-blue-800 hover:text-gold-500">
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-royal-blue-900 flex items-center gap-2 mb-2">
              <Calendar className="h-8 w-8 text-royal-blue-800" />
              Tous les événements
            </h1>
            <p className="text-royal-blue-700">
              Découvrez tous les événements organisés par La Tocarde
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={toggleFilters}
              className="flex items-center gap-2 bg-white"
            >
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white shadow rounded-lg p-4 mb-6 animate-in slide-in-from-top">
            <h2 className="font-medium mb-3">Filtres</h2>
            <div className="flex flex-wrap gap-3">
              <Badge
                variant={filters.atCompiegne ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateFilter("atCompiegne", !filters.atCompiegne)}
              >
                À Compiègne
              </Badge>
              <Badge
                variant={filters.isPublic ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateFilter("isPublic", !filters.isPublic)}
              >
                Public
              </Badge>
              <Badge
                variant={filters.type === "ALL" ? "default" : "outline"}
                className="cursor-pointer bg-royal-blue-600 hover:bg-royal-blue-700"
                onClick={() => updateFilter("type", "ALL")}
              >
                Tous types
              </Badge>
              <Badge
                variant={filters.type === "CONGRESS" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateFilter("type", "CONGRESS")}
              >
                Congrès
              </Badge>
              <Badge
                variant={filters.type === "DRINK" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateFilter("type", "DRINK")}
              >
                Apéral
              </Badge>
              <Badge
                variant={filters.type === "OFFICE" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateFilter("type", "OFFICE")}
              >
                Bureau
              </Badge>
              <Badge
                variant={filters.type === "OTHER" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateFilter("type", "OTHER")}
              >
                Autre
              </Badge>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Spinner show={eventsLoading} />
          {!eventsLoading && filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium text-royal-blue-800 mb-2">Aucun événement trouvé</h3>
              <p className="text-royal-blue-600">Essayez de modifier vos filtres pour voir plus d'événements</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Association Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-royal-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">LT</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">La Tocarde</h3>
                  <p className="text-gray-400">Association Étudiante</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                La Tocarde est une association étudiante falucharde, pour enrichir la vie universitaire.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Facebook</title><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" /></svg>
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></svg>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-white transition-colors">
                    Événements
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">contact@tocarde.fr</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          {/* Legal Links */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 - {new Date().getFullYear()} La Tocarde. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Conditions Générales d'Utilisation
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Politique de Confidentialité
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Mentions Légales
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
