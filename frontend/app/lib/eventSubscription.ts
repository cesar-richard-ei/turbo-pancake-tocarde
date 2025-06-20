import { z } from "zod";
import { getCSRFToken } from "./django";

export const AnswerEnum = z.enum(["YES", "NO", "MAYBE"]);

export const EventSubscribeActionSchema = z.object({
  id: z.number(),
  answer: AnswerEnum,
  can_invite: z.boolean(),
});
export type EventSubscribeAction = z.infer<typeof EventSubscribeActionSchema>;

type CreateSubscriptionData = Partial<Omit<EventSubscribeAction, 'id'>>;

export async function createSubscription(eventId: number, data: CreateSubscriptionData = { answer: 'YES', can_invite: true }): Promise<EventSubscribeAction> {
  const resp = await fetch(`/api/event/events/${eventId}/subscribe/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken() || '',
    },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    throw new Error('Failed to create subscription');
  }
  const json = await resp.json();
  return EventSubscribeActionSchema.parse(json);
}
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateSubscription() {
  return useMutation({
    mutationFn: (eventId: number) => createSubscription(eventId),
    onSuccess: () => {
      toast.success("Inscription enregistrée");
    },
    onError: () => {
      toast.error("Erreur lors de l'inscription");
    },
  });
}
