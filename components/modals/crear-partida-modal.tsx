"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CrearPartidaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CrearPartidaModal({ open, onOpenChange, onSuccess }: CrearPartidaModalProps) {
  const [formData, setFormData] = useState({
    descripcion: "",
    cantidad: "",
    unidad: "",
    precioUnitario: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating partida:", formData)
    alert("Partida creada exitosamente")
    onOpenChange(false)
    onSuccess?.()
    setFormData({ descripcion: "", cantidad: "", unidad: "", precioUnitario: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Partida</DialogTitle>
          <DialogDescription>Completa los datos para agregar una nueva partida</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Descripción de la partida"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad</Label>
              <Input
                id="cantidad"
                type="number"
                value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unidad">Unidad</Label>
              <Select value={formData.unidad} onValueChange={(value) => setFormData({ ...formData, unidad: value })}>
                <SelectTrigger id="unidad">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pza">Pieza</SelectItem>
                  <SelectItem value="kg">Kilogramo</SelectItem>
                  <SelectItem value="m">Metro</SelectItem>
                  <SelectItem value="lts">Litros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="precio">Precio Unitario</Label>
            <Input
              id="precio"
              value={formData.precioUnitario}
              onChange={(e) => setFormData({ ...formData, precioUnitario: e.target.value })}
              placeholder="$0.00"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Guardar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
