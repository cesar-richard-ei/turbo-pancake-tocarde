import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../components/auth/AuthContext";
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Calendar, ExternalLink, Mail, MapPin, Menu, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
import { ImportantLink } from "~/components/ImportantLink";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Tocarde - Compiègne" },
    { name: "description", content: "Bienvenue en capitale de la Tocardie !" },
  ];
}

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const userData = user?.user || user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-100 to-gold-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-[inset_0px_-5px_4px_-5px_hsl(59,_100%,_33%)] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-royal-blue-800 to-gold-400 rounded-full flex items-center justify-center">
                <span className="text-gold-300 font-bold text-lg">LTT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-royal-blue-800">La Tocarde</h1>
                <p className="text-sm text-royal-blue-700">Association Étudiante</p>
              </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#accueil" className="text-royal-blue-800 hover:text-gold-500 transition-colors">
                Accueil
              </Link>
              <Link to="#evenements" className="text-royal-blue-800 hover:text-gold-500 transition-colors">
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
              <Button variant="ghost" size="sm" className="text-royal-blue-800 hover:bg-gold-100">
                Connexion
              </Button>
              <Button size="sm" className="bg-gold-400 hover:bg-gold-500 text-royal-blue-900">
                S'inscrire
              </Button>
            </div>
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden text-royal-blue-800 hover:bg-gold-100">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-royal-blue-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue-700 to-gold-400">
                La Tocarde
              </span>
              {" "}vous souhaite le bonsoir !
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-royal-blue-800 hover:bg-royal-blue-900 text-gold-300">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Login/Register Section */}
          <div className="lg:col-span-1">
            <section>
              <h3 className="text-2xl font-bold text-royal-blue-900 mb-6 flex items-center gap-2">
                <ExternalLink className="h-6 w-6 text-royal-blue-800" />
                Liens Importants
              </h3>

              <div className="grid md:grid-cols-1 gap-4">
                <ImportantLink title="Faluche.app" description="Informations sur la faluche au global" url="https://faluche.app" />
                <ImportantLink title="Code amienois" description="Informations sur les copains au nord" url="https://code-amienois.app" />
              </div>
            </section>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Events Section */}
            <section id="evenements">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-royal-blue-900 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-royal-blue-800" />
                  Événements à venir
                </h3>
                <Button variant="ghost" size="sm" className="text-royal-blue-800 hover:bg-gold-100">
                  Voir tout
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Event 1 */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                  <div className="aspect-video relative">
                    <img
                      src="https://picsum.photos/400/200"
                      alt="Soirée d'intégration"
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-500 text-white">Bientôt</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-2 text-royal-blue-900">Soirée d'Intégration 2024</h4>
                    <div className="flex items-center text-sm text-royal-blue-700 mb-2">
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
                    <Button size="sm" className="w-full bg-royal-blue-600 hover:bg-royal-blue-700">
                      S'inscrire
                    </Button>
                  </CardContent>
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
