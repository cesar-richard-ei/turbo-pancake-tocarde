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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">LT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">La Tocarde</h1>
                <p className="text-sm text-gray-600">Association Étudiante</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#accueil" className="text-gray-700 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link to="#evenements" className="text-gray-700 hover:text-blue-600 transition-colors">
                Événements
              </Link>
              <Link to="#apropos" className="text-gray-700 hover:text-blue-600 transition-colors">
                À propos
              </Link>
              <Link to="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                S'inscrire
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Association Étudiante Officielle</Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bienvenue chez{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                La Tocarde
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté étudiante dynamique et participez à des événements inoubliables tout au long de
              l'année universitaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Devenir membre
              </Button>
              <Button size="lg" variant="outline">
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
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Espace Membre
                </CardTitle>
                <CardDescription>Connectez-vous ou créez votre compte pour accéder à tous nos services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email étudiant</Label>
                  <Input id="email" type="email" placeholder="votre.email@universite.fr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Se connecter</Button>
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">Pas encore membre ?</p>
                  <Button variant="outline" className="w-full">
                    Créer un compte
                  </Button>
                </div>
                <div className="text-center">
                  <Link to="#" className="text-sm text-blue-600 hover:underline">
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
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Événements à venir
                </h3>
                <Button variant="ghost" size="sm">
                  Voir tout
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Event 1 */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Soirée d'intégration"
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-500">Bientôt</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-2">Soirée d'Intégration 2024</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      Vendredi 15 Mars 2024
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      Salle des Fêtes - Campus Central
                    </div>
                    <p className="text-sm text-gray-700 mb-4">
                      Rejoignez-nous pour une soirée inoubliable avec DJ, animations et surprises !
                    </p>
                    <Button size="sm" className="w-full">
                      S'inscrire
                    </Button>
                  </CardContent>
                </Card>

                {/* Event 2 */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Tournoi de sport"
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-500">Ouvert</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-2">Tournoi Inter-Écoles</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      Samedi 23 Mars 2024
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      Complexe Sportif Universitaire
                    </div>
                    <p className="text-sm text-gray-700 mb-4">
                      Compétition amicale de football, basketball et volleyball entre écoles.
                    </p>
                    <Button size="sm" className="w-full">
                      Participer
                    </Button>
                  </CardContent>
                </Card>

                {/* Event 3 */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Conférence carrière"
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-500">Gratuit</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-2">Conférence Carrière</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      Mercredi 28 Mars 2024
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      Amphithéâtre A - Bâtiment Principal
                    </div>
                    <p className="text-sm text-gray-700 mb-4">
                      Rencontrez des professionnels et découvrez les opportunités de carrière.
                    </p>
                    <Button size="sm" className="w-full">
                      Réserver
                    </Button>
                  </CardContent>
                </Card>

                {/* Event 4 */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Voyage étudiant"
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-purple-500 hover:bg-purple-500">Populaire</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-2">Voyage à Prague</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      5-8 Avril 2024
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      Prague, République Tchèque
                    </div>
                    <p className="text-sm text-gray-700 mb-4">
                      Découvrez la magnifique capitale tchèque avec vos camarades étudiants.
                    </p>
                    <Button size="sm" className="w-full">
                      Plus d'infos
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Important Links Section */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ExternalLink className="h-6 w-6 text-blue-600" />
                Liens Importants
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Plateforme Étudiante</h4>
                      <p className="text-sm text-gray-600">Accès aux cours et ressources</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Bibliothèque Universitaire</h4>
                      <p className="text-sm text-gray-600">Catalogue et réservations</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Service Scolarité</h4>
                      <p className="text-sm text-gray-600">Démarches administratives</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">CROUS</h4>
                      <p className="text-sm text-gray-600">Bourses et logement</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Emploi du Temps</h4>
                      <p className="text-sm text-gray-600">Planning des cours</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Forum Étudiant</h4>
                      <p className="text-sm text-gray-600">Discussions et entraide</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
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
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
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
