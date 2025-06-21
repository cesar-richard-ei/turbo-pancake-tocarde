import { useState, useEffect } from "react";
import { getEventTypes, type EventType, type SubscriptionStats } from "~/lib/event";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Check, HelpCircle, MapPin, X } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "./auth/AuthContext";
import { EventSubscriptionDialog } from "./EventSubscriptionDialog";
import { useUserSubscriptions, getUserSubscriptionForEvent } from "~/lib/eventSubscription";
import { Link } from "react-router";

export function EventCard({ event }: { event: EventType }) {
    const { isAuthenticated } = useAuth();
    const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
    const { data: userSubscriptions, isLoading: subscriptionsLoading } = useUserSubscriptions();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [eventSubscription, setEventSubscription] = useState<any>(undefined);

    // Mettre à jour l'état d'inscription quand les données sont chargées
    useEffect(() => {
        if (userSubscriptions?.results && userSubscriptions.results.length > 0) {
            const subscription = getUserSubscriptionForEvent(userSubscriptions.results, event.id);
            setEventSubscription(subscription);
            setIsSubscribed(Boolean(subscription));
            console.log(`Event ${event.id} - Found subscription:`, subscription);
        } else {
            setIsSubscribed(false);
            setEventSubscription(undefined);
        }
    }, [userSubscriptions, event.id]);

    const handleOpenDialog = () => {
        setShowSubscriptionDialog(true);
    };

    const handleCloseDialog = () => {
        setShowSubscriptionDialog(false);
    };

    // Déterminer si subscriptions_count est un nombre ou un objet
    const subscriptionStats: SubscriptionStats = typeof event.subscriptions_count === 'number'
        ? { YES: event.subscriptions_count, NO: 0, MAYBE: 0 }
        : event.subscriptions_count || { YES: 0, NO: 0, MAYBE: 0 };

    // Texte du bouton selon l'état d'inscription
    const buttonText = !isAuthenticated
        ? "Se connecter pour s'inscrire"
        : (isSubscribed ? "Modifier ma réponse" : "S'inscrire");

    console.log(`Event ${event.id} - Button text: ${buttonText}, isSubscribed: ${isSubscribed}`);

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="aspect-video relative">
            <img
                src="https://picsum.photos/400/200"
                alt={event.name}
                className="object-cover"
            />
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-500 text-white">{getEventTypes(event.type)}</Badge>
            </div>
            <CardContent className="p-4">
            <h4 className="font-semibold text-lg mb-2 text-royal-blue-900">{event.name}</h4>
            <div className="flex items-center text-sm text-royal-blue-700 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                {new Intl.DateTimeFormat('fr-FR', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                }).format(new Date(event.start_date))}
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {event.location}
            </div>
            <p className="text-sm text-gray-700 mb-4">
                {event.description}
            </p>

            <div className="flex flex-col mb-4 space-y-2">
                <div className="flex -space-x-2 mr-2">
                    {event.first_subscribers && event.first_subscribers.length > 0 ?
                        event.first_subscribers.slice(0, 3).map((i, idx) => (
                            <Badge
                                key={idx}
                                className="w-6 h-6 rounded-full bg-royal-blue-600 text-gold-100 ring-2 ring-white flex items-center justify-center text-xs"
                            >
                                {i}
                            </Badge>
                        ))
                        : null
                    }
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Check className="h-3 w-3 text-green-600" />
                        <span>{subscriptionStats.YES} participant{subscriptionStats.YES > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <HelpCircle className="h-3 w-3 text-amber-600" />
                        <span>{subscriptionStats.MAYBE} peut-être</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <X className="h-3 w-3 text-red-600" />
                        <span>{subscriptionStats.NO} non</span>
                    </div>
                </div>
            </div>

            {!isAuthenticated ? (
                <Link to="/login">
                    <Button
                        size="sm"
                        className="w-full bg-royal-blue-600 hover:bg-royal-blue-700"
                    >
                        Se connecter pour s'inscrire
                    </Button>
                </Link>
            ) : (
                <Button
                    size="sm"
                    className="w-full bg-royal-blue-600 hover:bg-royal-blue-700"
                    onClick={handleOpenDialog}
                >
                    {isSubscribed ? "Modifier ma réponse" : "S'inscrire"}
                </Button>
            )}

            <EventSubscriptionDialog
                event={event}
                isOpen={showSubscriptionDialog}
                onClose={handleCloseDialog}
                existingSubscription={eventSubscription}
                key={`dialog-${event.id}-${eventSubscription?.id || 'new'}-${showSubscriptionDialog}`}
            />
            </CardContent>
        </Card>
    )
}
