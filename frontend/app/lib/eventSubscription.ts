import { z } from "zod";
import { getCSRFToken } from "./django";

export const AnswerEnum = z.enum(["YES", "NO", "MAYBE"]);

export const EventSubscriptionSchema = z.object({
  id: z.number(),
  answer: AnswerEnum,
  can_invite: z.boolean(),
  event: z.number(),
  user: z.number(),
  is_active: z.boolean(),
});

export type EventSubscription = z.infer<typeof EventSubscriptionSchema>;

export type CreateSubscriptionData = {
  answer?: z.infer<typeof AnswerEnum>;
  can_invite?: boolean;
};

export type SubscriptionParams = {
  eventId: number;
  data: CreateSubscriptionData;
};

export async function createSubscription(
  eventId: number,
  data: CreateSubscriptionData = { answer: 'YES', can_invite: false }
): Promise<EventSubscription> {
  const csrfToken = getCSRFToken();

  try {
    const resp = await fetch(`/api/event/events/${eventId}/subscribe/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || '',
      },
      body: JSON.stringify(data),
      credentials: 'include', // Pour inclure les cookies dans la requête
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      throw new Error(`Failed to create subscription: ${resp.status} ${errorText}`);
    }

    const json = await resp.json();
    return EventSubscriptionSchema.parse(json);
  } catch (error) {
    throw error;
  }
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, data }: SubscriptionParams) => createSubscription(eventId, data),
    onSuccess: () => {
      toast.success("Inscription enregistrée");
      // Invalider les queries d'événements pour forcer un rafraîchissement
      queryClient.invalidateQueries({ queryKey: ['events'] });

      // Rafraîchir la page pour éviter les problèmes de port déconnecté
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Attendre 1 seconde pour que l'utilisateur puisse voir le toast
    },
    onError: (error) => {
      toast.error(`Erreur lors de l'inscription: ${error.message || 'Erreur inconnue'}`);
    },
  });
}
