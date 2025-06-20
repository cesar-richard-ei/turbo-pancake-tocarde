import { getEventTypes, type EventType } from "~/lib/event";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

export function EventCard({ event }: { event: EventType }) {
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
            <div className="flex items-center mb-4">
                <div className="flex -space-x-2 mr-2">
                    {event.first_subscribers.slice(0, 3).map((i, idx) => (
                        <Badge
                            key={idx}
                            className="w-6 h-6 rounded-full bg-royal-blue-600 text-gold-100 ring-2 ring-white flex items-center justify-center text-xs"
                        >
                            {i}
                        </Badge>
                    ))}
                </div>
                <span className="text-sm text-gray-600">
                    {event.subscriptions_count} inscrit
                    {event.subscriptions_count > 1 ? "s" : ""}
                </span>
            </div>
            <Link to="/signup">
                <Button size="sm" className="w-full bg-royal-blue-600 hover:bg-royal-blue-700">
                S'inscrire
                </Button>
            </Link>
            </CardContent>
        </Card>
    )
}
