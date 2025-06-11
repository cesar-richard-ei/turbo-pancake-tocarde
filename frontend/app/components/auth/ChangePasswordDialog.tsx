import { useState } from "react"
import { changePassword } from "../../lib/allauth"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { toast } from "sonner"
import { useAuth } from "./AuthContext"

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }

    try {
      setLoading(true)
      const resp = await changePassword({
        password: newPassword,
      }, user?.user.id)
      if (resp.status === 200) {
        onOpenChange(false)
        toast.success("Mot de passe mis à jour")
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        toast.error(resp.message || "Erreur lors du changement")
      }
    } catch (err) {
      toast.error("Erreur lors de la requête")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Changer de mot de passe</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Ancien mot de passe</Label>
            <Input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmation</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <DialogFooter className="pt-2">
            <Button disabled={loading}>Valider</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
