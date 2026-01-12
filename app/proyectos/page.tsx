"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Plus, FolderKanban, Bell, Settings, User } from "lucide-react"
import Link from "next/link"

export default function ProyectosPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("ipsum-theme") as "light" | "dark" | null
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const proyectos = [
    {
      id: 1,
      nombre: "Casa Hernández",
      descripcion: "Construcción vivienda unifamiliar 180m²",
      presupuesto: 8500000,
      gastado: 4250000,
      estado: "En progreso",
    },
    {
      id: 2,
      nombre: "Remodelación Consultorio",
      descripcion: "Remodelación completa consultorio médico",
      presupuesto: 2800000,
      gastado: 2520000,
      estado: "Finalizado",
    },
    {
      id: 3,
      nombre: "Local Comercial Sur",
      descripcion: "Construcción local comercial 120m²",
      presupuesto: 4200000,
      gastado: 4200000,
      estado: "Finalizado",
    },
    {
      id: 4,
      nombre: "Oficinas Centro",
      descripcion: "Remodelación oficinas corporativas",
      presupuesto: 6500000,
      gastado: 6500000,
      estado: "Finalizado",
    },
    {
      id: 5,
      nombre: "Apartamentos Norte",
      descripcion: "Edificio 6 apartamentos",
      presupuesto: 15000000,
      gastado: 15000000,
      estado: "Finalizado",
    },
  ]

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

      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">
        <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Proyectos</h1>

        {proyectos.map((proyecto) => {
          const porcentaje = Math.round((proyecto.gastado / proyecto.presupuesto) * 100)
          const restante = proyecto.presupuesto - proyecto.gastado

          return (
            <div
              key={proyecto.id}
              className={`rounded-2xl p-4 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-lg ${theme === "dark" ? "text-white" : "text-[#1e3a5f]"}`}>
                      {proyecto.nombre}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        proyecto.estado === "Finalizado"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-amber-500/20 text-amber-500"
                      }`}
                    >
                      {proyecto.estado}
                    </span>
                  </div>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    {proyecto.descripcion}
                  </p>
                </div>
              </div>

              <div className={`h-px mb-3 ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}></div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className={`text-xs mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                    Presupuesto
                  </p>
                  <p className={`font-bold ${theme === "dark" ? "text-white" : "text-[#1e3a5f]"}`}>
                    ₡{proyecto.presupuesto.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className={`text-xs mb-1 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Ejecutado</p>
                  <p className="font-bold text-red-500">₡{proyecto.gastado.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>Avance: {porcentaje}%</span>
                  <span className={`font-medium ${restante > 0 ? "text-green-500" : "text-slate-400"}`}>
                    {restante > 0 ? `Restante: ₡${restante.toLocaleString()}` : "Completado"}
                  </span>
                </div>
                <div className={`h-2 rounded-full ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      porcentaje >= 100 ? "bg-green-500" : porcentaje > 80 ? "bg-amber-500" : "bg-[#1e3a5f]"
                    }`}
                    style={{ width: `${Math.min(porcentaje, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Botón crear proyecto */}
        <button className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white font-bold text-base transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
          <span>Crear Nuevo Proyecto</span>
        </button>
      </main>
    </div>
  )
}
