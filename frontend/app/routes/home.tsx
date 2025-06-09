import React from 'react';
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../components/auth/AuthContext";
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Calendar, ExternalLink, Facebook, Instagram, Mail, MapPin, Menu, Phone, Twitter, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-50 dark:from-blue-950 dark:to-yellow-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-blue-950/95 backdrop-blur-sm border-b border-yellow-400 dark:border-yellow-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-300 font-bold text-lg">LTT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-800 dark:text-yellow-300">La Tocarde</h1>
                <p className="text-sm text-blue-700 dark:text-yellow-200">Association Étudiante</p>
              </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#accueil" className="text-blue-800 dark:text-yellow-200 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                Accueil
              </Link>
              <Link to="#evenements" className="text-blue-800 dark:text-yellow-200 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                Événements
              </Link>
              <Link to="#apropos" className="text-blue-800 dark:text-yellow-200 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                À propos
              </Link>
              <Link to="#contact" className="text-blue-800 dark:text-yellow-200 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                Contact
              </Link>
            </nav>
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-blue-800 hover:bg-yellow-100 dark:text-yellow-200 dark:hover:bg-blue-900">
                Connexion
              </Button>
              <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:text-blue-900">
                S'inscrire
              </Button>
            </div>
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden text-blue-800 hover:bg-yellow-100 dark:text-yellow-200 dark:hover:bg-blue-900">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-yellow-400 text-blue-900 hover:bg-yellow-300 dark:bg-yellow-700 dark:text-blue-900 dark:hover:bg-yellow-600">
              Association Falucharde
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-yellow-200 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-200">
                La Tocarde
              </span>
              {" "}vous souhaite le bonsoir !
            </h2>
            <p className="text-xl text-blue-800 dark:text-yellow-100 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté étudiante dynamique et participez à des événements inoubliables tout au long de
              l'année universitaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-yellow-300 dark:bg-blue-900 dark:hover:bg-blue-950 dark:text-yellow-300">
                Devenir membre
              </Button>
              <Button size="lg" variant="outline" className="border-yellow-400 text-blue-800 hover:bg-yellow-100 dark:border-yellow-600 dark:text-yellow-200 dark:hover:bg-yellow-900">
                Découvrir nos événements
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Login/Register Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-white dark:bg-blue-950/70 dark:border-yellow-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-yellow-300">
                  <Users className="h-5 w-5 text-blue-800 dark:text-yellow-400" />
                  Espace Membre
                </CardTitle>
                <CardDescription className="text-blue-700 dark:text-yellow-100">Connectez-vous ou créez votre compte pour accéder à tous nos services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-800 dark:text-yellow-200">Email étudiant</Label>
                  <Input id="email" type="email" placeholder="votre.email@universite.fr" className="border-yellow-400 focus:border-blue-700 dark:bg-blue-900 dark:border-yellow-600 dark:text-yellow-50 dark:focus:border-yellow-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-blue-800 dark:text-yellow-200">Mot de passe</Label>
                  <Input id="password" type="password" placeholder="••••••••" className="border-yellow-400 focus:border-blue-700 dark:bg-blue-900 dark:border-yellow-600 dark:text-yellow-50 dark:focus:border-yellow-400" />
                </div>
                <Button className="w-full bg-blue-800 hover:bg-blue-900 text-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-blue-900">Se connecter</Button>
                <Separator className="dark:bg-yellow-700" />
                <div className="text-center">
                  <p className="text-sm text-blue-700 dark:text-yellow-100 mb-3">Pas encore membre ?</p>
                  <Button variant="outline" className="w-full border-yellow-400 text-blue-800 hover:bg-yellow-100 dark:border-yellow-600 dark:text-yellow-200 dark:hover:bg-yellow-900/50">
                    Créer un compte
                  </Button>
                </div>
                <div className="text-center">
                  <Link to="#" className="text-sm text-blue-800 hover:underline dark:text-yellow-300 dark:hover:text-yellow-200">
                    Mot de passe oublié ?
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Events Section */}
            <section id="evenements">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-blue-900 dark:text-yellow-300 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-800 dark:text-yellow-400" />
                  Événements à venir
                </h3>
                <Button variant="ghost" size="sm" className="text-blue-800 hover:bg-yellow-100 dark:text-yellow-200 dark:hover:bg-blue-900">
                  Voir tout
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Event 1 */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-blue-950/70 dark:border-yellow-700">
                  <div className="aspect-video relative">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Soirée d'intégration"
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-500 text-white dark:bg-red-700 dark:hover:bg-red-700">Bientôt</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-2 text-blue-900 dark:text-yellow-300">Soirée d'Intégration 2024</h4>
                    <div className="flex items-center text-sm text-blue-700 dark:text-yellow-100 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      Vendredi 15 Mars 2024
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      Salle des Fêtes - Campus Central
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      Rejoignez-nous pour une soirée inoubliable avec DJ, animations et surprises !
                    </p>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                      S'inscrire
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Important Links Section */}
            <section>
              <h3 className="text-2xl font-bold text-blue-900 dark:text-yellow-300 mb-6 flex items-center gap-2">
                <ExternalLink className="h-6 w-6 text-blue-800 dark:text-yellow-400" />
                Liens Importants
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-blue-950/70 dark:border-yellow-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold dark:text-white">Plateforme Étudiante</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Accès aux cours et ressources</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-blue-950/70 dark:border-yellow-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold dark:text-white">Bibliothèque Universitaire</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Catalogue et réservations</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-blue-950/70 dark:border-yellow-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold dark:text-white">Service Scolarité</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Démarches administratives</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-blue-950/70 dark:border-yellow-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold dark:text-white">CROUS</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bourses et logement</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-blue-950/70 dark:border-yellow-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold dark:text-white">Emploi du Temps</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Planning des cours</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-blue-950/70 dark:border-yellow-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold dark:text-white">Forum Étudiant</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Discussions et entraide</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Association Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">LT</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">La Tocarde</h3>
                  <p className="text-gray-400">Association Étudiante</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                La Tocarde est une association étudiante dynamique qui organise des événements, des activités
                culturelles et sportives pour enrichir la vie universitaire.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white dark:hover:bg-gray-800">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white dark:hover:bg-gray-800">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white dark:hover:bg-gray-800">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
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
                  <span className="text-sm">contact@latocarde.fr</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">
                    Campus Universitaire
                    <br />
                    75000 Paris
                  </span>
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
                Conditions de Service
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
