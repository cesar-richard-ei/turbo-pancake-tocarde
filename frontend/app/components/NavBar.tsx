import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from './auth/AuthContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Menu } from 'lucide-react';

export function NavBar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userData = user?.user || user;
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
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
            <Link
              to="/"
              className={`text-royal-blue-800 hover:text-gold-500 transition-colors ${
                isActive('/') ? 'border-b-2 border-gold-400' : ''
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/events"
              className={`text-royal-blue-800 hover:text-gold-500 transition-colors ${
                isActive('/events') ? 'border-b-2 border-gold-400' : ''
              }`}
            >
              Événements
            </Link>
            <Link
              to="/about"
              className={`text-royal-blue-800 hover:text-gold-500 transition-colors ${
                isActive('/about') ? 'border-b-2 border-gold-400' : ''
              }`}
            >
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
            <Link
              to="/"
              className={`block text-royal-blue-800 hover:text-gold-500 ${
                isActive('/') ? 'font-semibold' : ''
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/events"
              className={`block text-royal-blue-800 hover:text-gold-500 ${
                isActive('/events') ? 'font-semibold' : ''
              }`}
            >
              Événements
            </Link>
            <Link
              to="/about"
              className={`block text-royal-blue-800 hover:text-gold-500 ${
                isActive('/about') ? 'font-semibold' : ''
              }`}
            >
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
  );
}
