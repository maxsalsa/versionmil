"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Search, Plus, Trash2, Eye, Bell, Settings, User } from "lucide-react"
import Link from "next/link"

export default function PlantillasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPlantilla, setSelectedPlantilla] = useState<number | null>(null)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("ipsum-theme") as "light" | "dark" | null
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const plantillas = [
    { id: 1, nombre: "Ferretería El Constructor", descripcion: "Cemento, varillas, bloques", montoTotal: 1080000 },
    { id: 2, nombre: "Ferretería Construmax", descripcion: "Materiales eléctricos", montoTotal: 435030 },
    { id: 3, nombre: "Maderas del Sur", descripcion: "Madera para estructura y acabados", montoTotal: 900000 },
    { id: 4, nombre: "Centro Eléctrico", descripcion: "Paneles y cableado", montoTotal: 267000 },
    { id: 5, nombre: "Metalúrgica Nacional", descripcion: "Hierro y acero estructural", montoTotal: 520000 },
    { id: 6, nombre: "Pinturería Color", descripcion: "Pintura y acabados", montoTotal: 189000 },
  ]

  const filteredPlantillas = plantillas.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = () => {
    setShowDeleteModal(false)
    setSelectedPlantilla(null)
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-slate-50"}`}>
      <header className={`sticky top-0 z-10 shadow-md ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}>
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border-2 border-[#1e3a5f] text-[#1e3a5f] font-medium text-sm hover:bg-[#1e3a5f] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Atrás
          </Link>

          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
              Felipe
            </span>
            <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <button
              className={`p-1.5 ${theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
              aria-label="Notificaciones"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              className={`p-1.5 ${theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
              aria-label="Configuración"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {/* Título */}
        <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
          Plantillas de Compra
        </h1>

        {/* Búsqueda */}
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
          />
          <input
            type="text"
            placeholder="Buscar plantilla..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:border-[#1e3a5f] transition-colors
              ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"}`}
          />
        </div>

        {/* Lista de plantillas */}
        <div className={`rounded-2xl overflow-hidden ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}>
          {filteredPlantillas.length === 0 ? (
            <div className={`p-8 text-center ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
              No hay plantillas
            </div>
          ) : (
            <ul className={`divide-y ${theme === "dark" ? "divide-slate-700" : "divide-slate-100"}`}>
              {filteredPlantillas.map((plantilla) => (
                <li
                  key={plantilla.id}
                  className={`p-4 ${theme === "dark" ? "hover:bg-slate-700/50" : "hover:bg-slate-50"} transition-colors`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-base ${theme === "dark" ? "text-white" : "text-[#1e3a5f]"}`}>
                        {plantilla.nombre}
                      </h3>
                      <p className={`text-sm truncate ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        {plantilla.descripcion}
                      </p>
                      <p className="text-lg font-bold text-green-500 mt-1">₡{plantilla.montoTotal.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/plantillas/${plantilla.id}/editar`}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                          ${theme === "dark" ? "bg-slate-700 hover:bg-amber-500 text-amber-400 hover:text-white" : "bg-slate-100 hover:bg-amber-500 text-amber-600 hover:text-white"}`}
                        aria-label="Ver y editar"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedPlantilla(plantilla.id)
                          setShowDeleteModal(true)
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                          ${theme === "dark" ? "bg-slate-700 hover:bg-red-500 text-red-400 hover:text-white" : "bg-slate-100 hover:bg-red-500 text-red-500 hover:text-white"}`}
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Botón crear */}
        <Link
          href="/plantillas/crear"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white font-bold text-base transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Crear Nueva Plantilla</span>
        </Link>
      </main>

      {/* Modal de confirmación */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowDeleteModal(false)}></div>
          <div
            className={`relative z-10 w-full max-w-sm rounded-2xl p-6 ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}
          >
            <h3 className={`font-bold text-xl mb-2 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
              Eliminar Plantilla
            </h3>
            <p className={`mb-6 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              ¿Está seguro que desea eliminar esta plantilla? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors
                  ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
