"use client"

import { useState, useEffect } from "react"
import {
  X,
  Search,
  Plus,
  Utensils,
  Package,
  Hammer,
  Wallet,
  BarChart3,
  ChevronLeft,
  Bell,
  Settings,
  User,
} from "lucide-react"
import Link from "next/link"
import { datosAnuales, añosDisponibles, formatearMoneda } from "@/lib/data"

export default function MovimientosPage() {
  const [filter, setFilter] = useState<"todos" | "gastos" | "ingresos">("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState<string | null>(null)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [año, setAño] = useState(2024)
  const [mes, setMes] = useState(9) // Octubre

  useEffect(() => {
    const savedTheme = localStorage.getItem("ipsum-theme") as "light" | "dark" | null
    if (savedTheme) setTheme(savedTheme)
  }, [])

  // Obtener movimientos del mes seleccionado
  const datosMes = datosAnuales[año]?.[mes]
  const movimientos = datosMes?.movimientos || []

  const filteredMovimientos = movimientos.filter((mov) => {
    if (filter === "gastos" && mov.tipo !== "gasto") return false
    if (filter === "ingresos" && mov.tipo !== "ingreso") return false
    if (
      searchTerm &&
      !mov.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !mov.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  const formatDate = (fecha: string) => {
    const date = new Date(fecha)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`
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

      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Título y selector de período */}
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Movimientos</h1>
          <div className="flex gap-2">
            <select
              value={mes}
              onChange={(e) => setMes(Number(e.target.value))}
              className={`px-2 py-1 rounded-lg text-sm border ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800"}`}
            >
              {datosAnuales[año]?.map((d, i) => (
                <option key={i} value={i}>
                  {d.mesCorto}
                </option>
              ))}
            </select>
            <select
              value={año}
              onChange={(e) => setAño(Number(e.target.value))}
              className={`px-2 py-1 rounded-lg text-sm border ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800"}`}
            >
              {añosDisponibles.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="grid grid-cols-4 gap-2">
          <Link
            href="/movimientos/nuevo?tipo=comida"
            className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors"
          >
            <Utensils className="w-5 h-5" />
            <span className="text-xs font-medium">Comida</span>
          </Link>
          <Link
            href="/movimientos/nuevo?tipo=material"
            className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <Package className="w-5 h-5" />
            <span className="text-xs font-medium">Material</span>
          </Link>
          <Link
            href="/movimientos/nuevo?tipo=mano_obra"
            className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-colors"
          >
            <Hammer className="w-5 h-5" />
            <span className="text-xs font-medium">Mano obra</span>
          </Link>
          <Link
            href="/movimientos/nuevo?tipo=ingreso"
            className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-colors"
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs font-medium">Ingreso</span>
          </Link>
        </div>

        {/* Filtros */}
        <div className={`flex rounded-xl p-1 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow"}`}>
          {[
            { key: "todos", label: "Todos" },
            { key: "gastos", label: "Gastos" },
            { key: "ingresos", label: "Ingresos" },
          ].map((f) => (
            <button
              key={f.key}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  filter === f.key ? "bg-[#1e3a5f] text-white" : theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              onClick={() => setFilter(f.key as typeof filter)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Búsqueda */}
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
          />
          <input
            type="text"
            placeholder="Buscar por descripción o categoría..."
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:border-[#1e3a5f] transition-colors
              ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lista */}
        <div className={`rounded-2xl overflow-hidden ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}>
          <div className="max-h-[320px] overflow-y-auto">
            {filteredMovimientos.length === 0 ? (
              <p className={`p-8 text-center ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                Sin movimientos en este período
              </p>
            ) : (
              <ul className={`divide-y ${theme === "dark" ? "divide-slate-700" : "divide-slate-100"}`}>
                {filteredMovimientos.map((mov) => (
                  <li
                    key={mov.id}
                    className={`flex items-center justify-between p-4 ${theme === "dark" ? "hover:bg-slate-700/50" : "hover:bg-slate-50"} transition-colors`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                        {mov.categoria}
                      </p>
                      <p className={`text-xs truncate ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                        {formatDate(mov.fecha)} · {mov.descripcion}
                      </p>
                      {mov.proyecto && (
                        <p className={`text-xs ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                          {mov.proyecto}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold text-lg ${mov.tipo === "gasto" ? "text-red-500" : "text-green-500"}`}>
                        {mov.tipo === "gasto" ? "-" : "+"}₡{formatearMoneda(mov.monto)}
                      </span>
                      <button
                        onClick={() => setShowModal(mov.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                          ${theme === "dark" ? "bg-slate-700 hover:bg-red-500 text-red-400 hover:text-white" : "bg-slate-100 hover:bg-red-500 text-red-500 hover:text-white"}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/graficos"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#1e3a5f] text-[#1e3a5f] font-medium transition-colors hover:bg-[#1e3a5f] hover:text-white"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Gráficos</span>
          </Link>
          <Link
            href="/movimientos/nuevo"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo</span>
          </Link>
        </div>
      </main>

      {/* Modal confirmación */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(null)}></div>
          <div
            className={`relative z-10 w-full max-w-sm rounded-2xl p-6 ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}
          >
            <h3 className={`font-bold text-xl mb-2 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
              Eliminar movimiento
            </h3>
            <p className={`mb-6 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              ¿Está seguro? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(null)}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors
                  ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowModal(null)}
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
