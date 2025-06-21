import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import type { EventType } from "~/lib/event";
import { AnswerEnum, useCreateSubscription } from "~/lib/eventSubscription";
import { Spinner } from "./ui/spinner";

interface EventSubscriptionDialogProps {
  event: EventType;
  isOpen: boolean;
  onClose: () => void;
}

export function EventSubscriptionDialog({
  event,
  isOpen,
  onClose,
}: EventSubscriptionDialogProps) {
  const [answer, setAnswer] = useState<AnswerEnum>("YES");
  const [canInvite, setCanInvite] = useState<boolean>(false);
  const mutation = useCreateSubscription();

  const handleSubmit = () => {
    mutation.mutate({
      eventId: event.id,
      data: {
        answer,
        can_invite: canInvite,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>S'inscrire à {event.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="answer">Votre réponse</Label>
            <div className="flex gap-2">
              <Button
                id="answer-yes"
                type="button"
                variant={answer === "YES" ? "default" : "outline"}
                onClick={() => setAnswer("YES")}
              >
                Je participe
              </Button>
              <Button
                id="answer-maybe"
                type="button"
                variant={answer === "MAYBE" ? "default" : "outline"}
                onClick={() => setAnswer("MAYBE")}
              >
                Peut-être
              </Button>
              <Button
                id="answer-no"
                type="button"
                variant={answer === "NO" ? "default" : "outline"}
                onClick={() => setAnswer("NO")}
              >
                Je ne participe pas
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="can-invite"
              checked={canInvite}
              onChange={(e) => setCanInvite(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-royal-blue-600 focus:ring-royal-blue-500"
            />
            <Label htmlFor="can-invite">
              Je peux inviter d'autres personnes
            </Label>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="bg-royal-blue-600 hover:bg-royal-blue-700"
          >
            {mutation.isPending ? <Spinner className="mr-2" /> : null}
            Confirmer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
