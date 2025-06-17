import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "~/api/user";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileDialog({ open, onOpenChange }: EditProfileDialogProps) {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    zip_code: "",
    country: "",
    phone_number: "",
    birth_date: "",
    faluche_nickname: "",
  });

  useEffect(() => {
    if (open && user) {
      const profile = user.profile;
      setForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        address: profile.address || "",
        city: profile.city || "",
        zip_code: profile.zip_code || "",
        country: profile.country || "",
        phone_number: profile.phone_number || "",
        birth_date: profile.birth_date || "",
        faluche_nickname: profile.faluche_nickname || "",
      });
    }
  }, [open, user]);

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      return await updateUser(data, user?.user.id);
    },
    onSuccess: async (resp) => {
      if (resp.status === 200) {
        toast.success("Profil mis à jour");
        await refreshUser();
        onOpenChange(false);
      } else {
        const data = await resp.json();
        toast.error(data.message || "Erreur lors de la mise à jour");
      }
    },
    onError: () => {
      toast.error("Erreur lors de la requête");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le profil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">Prénom</Label>
            <Input id="first_name" name="first_name" value={form.first_name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Nom</Label>
            <Input id="last_name" name="last_name" value={form.last_name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="faluche_nickname">Surnom de Faluche</Label>
            <Input id="faluche_nickname" name="faluche_nickname" value={form.faluche_nickname} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input id="address" name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Input id="city" name="city" value={form.city} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip_code">Code postal</Label>
            <Input id="zip_code" name="zip_code" value={form.zip_code} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Pays</Label>
            <Input id="country" name="country" value={form.country} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number">Téléphone</Label>
            <Input id="phone_number" name="phone_number" value={form.phone_number} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birth_date">Date de naissance</Label>
            <Input id="birth_date" name="birth_date" type="date" value={form.birth_date} onChange={handleChange} />
          </div>
          <DialogFooter className="pt-2">
            <Button disabled={mutation.isPending}>Valider</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
