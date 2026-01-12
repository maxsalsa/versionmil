"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { ChevronLeft, Utensils, Package, Hammer, Wrench, Check } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

const categorias = [
  { id: "comida", nombre: "Comida", icon: Utensils, color: "bg-orange-500" },
  { id: "material", nombre: "Material", icon: Package, color: "bg-blue-500" },
  { id: "mano_obra", nombre: "Mano obra", icon: Hammer, color: "bg-purple-500" },
  { id: "servicios", nombre: "Servicios", icon: Wrench, color: "bg-teal-500" },
]

function NuevoMovimientoForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tipoParam = searchParams.get("tipo")

  const [tipo, setTipo] = useState<"gasto" | "ingreso">(tipoParam === "ingreso" ? "ingreso" : "gasto")
  const [categoria, setCategoria] = useState(tipoParam && tipoParam !== "ingreso" ? tipoParam : "")
  const [detalle, setDetalle] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [proyecto, setProyecto] = useState("Proyecto A")
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0])
  const [monto, setMonto] = useState("")
  const [plantilla, setPlantilla] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("ipsum-theme") as "light" | "dark" | null
    if (savedTheme) setTheme(savedTheme)
  }, [])

  useEffect(() => {
    if (tipoParam === "ingreso") {
      setTipo("ingreso")
    } else if (tipoParam) {
      setTipo("gasto")
      setCategoria(tipoParam)
    }
  }, [tipoParam])

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      router.push("/movimientos")
    }, 1500)
  }

  return (
    <>
      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Tabs Gasto/Ingreso */}
        <div className={`flex rounded-xl p-1 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow"}`}>
          <button
            className={`flex-1 py-3 rounded-lg text-base font-semibold transition-colors
              ${tipo === "gasto" ? "bg-red-500 text-white" : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
            onClick={() => setTipo("gasto")}
          >
            Gasto
          </button>
          <button
            className={`flex-1 py-3 rounded-lg text-base font-semibold transition-colors
              ${tipo === "ingreso" ? "bg-green-500 text-white" : theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
            onClick={() => setTipo("ingreso")}
          >
            Ingreso
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleGuardar}>
          {/* Categorías rápidas para gastos */}
          {tipo === "gasto" && (
            <div className={`rounded-2xl p-4 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}>
              <label
                className={`text-sm font-semibold mb-3 block ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
              >
                Categoría
              </label>
              <div className="grid grid-cols-4 gap-2">
                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoria(cat.id)}
                    className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition-all
                      ${
                        categoria === cat.id
                          ? `${cat.color} text-white ring-2 ring-white ring-offset-2 ${theme === "dark" ? "ring-offset-slate-800" : "ring-offset-white"}`
                          : theme === "dark"
                            ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    <cat.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{cat.nombre}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formulario principal */}
          <div className={`rounded-2xl p-4 space-y-4 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}>
            <div>
              <label
                className={`text-sm font-semibold mb-2 block ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
              >
                Detalle
              </label>
              <input
                type="text"
                placeholder={tipo === "ingreso" ? "Pago Mutual" : "Compra de materiales"}
                className={`w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:border-[#1e3a5f] transition-colors
                  ${theme === "dark" ? "bg-slate-700 border-slate-600 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                className={`text-sm font-semibold mb-2 block ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
              >
                Descripción
              </label>
              <textarea
                placeholder="Descripción breve..."
                className={`w-full px-4 py-3 rounded-xl border-2 text-base h-20 resize-none focus:outline-none focus:border-[#1e3a5f] transition-colors
                  ${theme === "dark" ? "bg-slate-700 border-slate-600 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div>
              <label
                className={`text-sm font-semibold mb-2 block ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
              >
                Proyecto
              </label>
              <select
                className={`w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:border-[#1e3a5f] transition-colors
                  ${theme === "dark" ? "bg-slate-700 border-slate-600 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                value={proyecto}
                onChange={(e) => setProyecto(e.target.value)}
              >
                <option>Proyecto A</option>
                <option>Proyecto B</option>
                <option>General (sin proyecto)</option>
              </select>
            </div>

            <div>
              <label
                className={`text-sm font-semibold mb-2 block ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
              >
                Fecha
              </label>
              <input
                type="date"
                className={`w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:border-[#1e3a5f] transition-colors
                  ${theme === "dark" ? "bg-slate-700 border-slate-600 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            {/* Plantilla solo para gastos */}
            {tipo === "gasto" && (
              <div>
                <label
                  className={`text-sm font-semibold mb-2 block ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                >
                  Plantilla (opcional)
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:border-[#1e3a5f] transition-colors
                    ${theme === "dark" ? "bg-slate-700 border-slate-600 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                  value={plantilla}
                  onChange={(e) => setPlantilla(e.target.value)}
                >
                  <option value="">Sin plantilla</option>
                  <option value="compra1">Compra 1 - ₡1,080,000</option>
                  <option value="compra2">Compra 2 - ₡435,030</option>
                  <option value="madera">Madera Inicio - ₡900,000</option>
                </select>
                {plantilla && (
                  <Link href="/plantillas" className="text-[#1e3a5f] text-sm mt-2 inline-block hover:underline">
                    Ver detalles de plantilla →
                  </Link>
                )}
              </div>
            )}

            <div>
              <label
                className={`text-sm font-semibold mb-2 block ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
              >
                Monto (₡)
              </label>
              <input
                type="number"
                placeholder="0"
                className={`w-full px-4 py-4 rounded-xl border-2 text-2xl font-bold focus:outline-none focus:border-[#1e3a5f] transition-colors
                  ${theme === "dark" ? "bg-slate-700 border-slate-600 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Botón guardar */}
          <button
            type="submit"
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-colors shadow-lg
              ${tipo === "gasto" ? "bg-[#1e3a5f] hover:bg-[#2a4a6f]" : "bg-green-500 hover:bg-green-600"}`}
          >
            Guardar {tipo === "gasto" ? "Gasto" : "Ingreso"}
          </button>
        </form>
      </main>

      {/* Modal de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60"></div>
          <div
            className={`relative z-10 w-full max-w-sm rounded-2xl p-8 text-center ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className={`font-bold text-xl ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
              Guardado correctamente
            </h3>
            <p className={`mt-2 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Redirigiendo...</p>
          </div>
        </div>
      )}
    </>
  )
}

export default function NuevoMovimiento() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("ipsum-theme") as "light" | "dark" | null
    if (savedTheme) setTheme(savedTheme)
  }, [])

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* Header estilo IPSUM */}
      <header
        className={`sticky top-0 z-10 px-4 py-3 border-b ${theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link
            href="/movimientos"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border-2 border-[#1e3a5f] text-[#1e3a5f] font-medium text-sm hover:bg-[#1e3a5f] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Atrás</span>
          </Link>
          <h1 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
            Nuevo Movimiento
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="flex justify-center p-8">
            <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <NuevoMovimientoForm />
      </Suspense>
    </div>
  )
}
