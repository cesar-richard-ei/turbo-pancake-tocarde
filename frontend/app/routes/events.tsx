import { useQuery } from "@tanstack/react-query";
import { fetchEvents, type EventType, type PaginatedEvents } from "~/lib/event";
import { EventCard } from "~/components/eventCard";
import { EventDetailDialog } from "~/components/EventDetailDialog";
import { Spinner } from "~/components/ui/spinner";
import { Separator } from "~/components/ui/separator";
import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ExternalLink,
  Filter,
  Mail,
  Menu,
  MapPin,
} from "lucide-react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { fr } from "date-fns/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Link } from 'react-router';
import { useAuth } from "~/components/auth/AuthContext";
import { Layout } from "~/components/Layout";

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
  const { data: events = { results: [] }, isLoading: eventsLoading } = useQuery<PaginatedEvents>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    atCompiegne: false,
    type: "ALL"
  });

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const locales = { fr };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
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
    if (filters.type !== "ALL" && event.type !== filters.type) return false;
    return true;
  });

  const calendarEvents = filteredEvents.map(event => ({
    title: event.name,
    start: new Date(event.start_date),
    end: new Date(event.end_date),
  }));

  const calendarMessages = {
    today: "Aujourd'hui",
    previous: "Mois précédent",
    next: "Mois suivant",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
    date: "Date",
    time: "Heure",
    event: "Événement",
    showMore: (total: number) => `+ ${total} plus`,
  };

  return (
    <Layout className="bg-gradient-to-br from-royal-blue-100 to-gold-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-royal-blue-900 flex items-center gap-2 mb-2">
              <CalendarIcon className="h-8 w-8 text-royal-blue-800" />
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

        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <BigCalendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={["month"]}
            style={{ height: 500 }}
            culture="fr"
            messages={calendarMessages}
            date={calendarDate}
            onNavigate={date => setCalendarDate(date)}
            onSelectEvent={(event) => {
              // On recherche l'événement complet à partir du titre et de la date
              const found = filteredEvents.find(e => e.name === event.title && new Date(e.start_date).getTime() === event.start.getTime());
              if (found) {
                // On force les champs optionnels à être présents si besoin
                setSelectedEvent({
                  ...found,
                  subscriptions_count: found.subscriptions_count ?? 0,
                  first_subscribers: found.first_subscribers ?? [],
                });
              }
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Spinner show={eventsLoading} />
          {!eventsLoading && filteredEvents.length > 0 ? (
            (filteredEvents as EventType[]).map((event) => (
              <EventCard key={event.id} event={event} onSelect={(e) => setSelectedEvent(e)} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium text-royal-blue-800 mb-2">Aucun événement trouvé</h3>
              <p className="text-royal-blue-600">Essayez de modifier vos filtres pour voir plus d'événements</p>
            </div>
          )}
        </div>
        <EventDetailDialog event={selectedEvent} isOpen={selectedEvent !== null} onClose={() => setSelectedEvent(null)} />
      </div>
    </Layout>
  );
}
