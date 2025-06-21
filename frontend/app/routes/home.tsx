import type { Route } from "./+types/home";
import { useAuth } from "../components/auth/AuthContext";
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Calendar, ExternalLink, Mail, MapPin, Menu } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { ImportantLink } from "~/components/ImportantLink";
import { useQuery } from "@tanstack/react-query";
import { fetchLinks } from "~/lib/resources";
import { fetchEvents } from "~/lib/event";
import { EventCard } from "~/components/eventCard";
import { Spinner } from "~/components/ui/spinner";
import { Layout } from "~/components/Layout";

/**
 * Détermine si c'est le jour ou la nuit
 * @returns "bonjour" entre 6h et 18h, "bonsoir" entre 18h et 6h
 */
const getSalutationByTime = (): string => {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18 ? "bonjour" : "bonsoir";
};

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Tocarde - Compiègne" },
    { name: "description", content: "Bienvenue en capitale de la Tocardie !" },
  ];
}

export default function Home() {
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const userData = user?.user || user;
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const salutation = getSalutationByTime();

  const { data: importantLinks = { results: [] }, isLoading: linksLoading } = useQuery({
    queryKey: ["important-links"],
    queryFn: fetchLinks,
  });
  const { data: events = { results: [] }, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  return (
    <Layout className="bg-gradient-to-br from-royal-blue-100 to-gold-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-royal-blue-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue-700 to-gold-500">
                La Tocarde
              </span>
              {" "}vous souhaite le {salutation} !
            </h2>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-royal-blue-800 hover:bg-royal-blue-900 text-gold-300">
                    S'inscrire
                  </Button>
                </Link>
              </div>
            )}

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
                <Spinner show={linksLoading} />
                {!linksLoading && importantLinks.results.map((link) => (
                  <ImportantLink
                    key={link.id}
                    title={link.name}
                    description={link.description || ''}
                    url={link.url}
                  />
                ))}
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
                <Link to="/events">
                  <Button variant="ghost" size="sm" className="text-royal-blue-800 hover:bg-gold-100">
                    Voir tout
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Spinner show={eventsLoading} />
                {!eventsLoading && (
                events.results
                  .filter(
                    (event) =>
                      event.at_compiegne && event.is_public
                  )
                  .slice(0, 4)
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
