"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Bell, Settings, User } from "lucide-react"
import Link from "next/link"
import { datosAnuales, añosDisponibles, formatearMoneda } from "@/lib/data"

export default function GraficosPage() {
  const [año, setAño] = useState(2024)
  const [mesIndex, setMesIndex] = useState(9)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("ipsum-theme") as "light" | "dark" | null
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const datosAño = datosAnuales[año] || []
  const data = datosAño[mesIndex]

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  const balance = data.ingresos - data.egresos
  const maxValue = Math.max(data.ingresos, data.egresos)

  // Calcular distribución por categoría de los movimientos
  const categorias = data.movimientos.reduce(
    (acc, mov) => {
      if (mov.tipo === "gasto") {
        acc[mov.categoria] = (acc[mov.categoria] || 0) + mov.monto
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const categoriasOrdenadas = Object.entries(categorias)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const coloresCategorias = ["bg-red-500", "bg-amber-500", "bg-blue-500", "bg-purple-500", "bg-green-500"]

  const prevMonth = () => {
    if (mesIndex === 0) {
      const prevYear = año - 1
      if (datosAnuales[prevYear]) {
        setAño(prevYear)
        setMesIndex(datosAnuales[prevYear].length - 1)
      }
    } else {
      setMesIndex(mesIndex - 1)
    }
  }

  const nextMonth = () => {
    if (mesIndex >= datosAño.length - 1) {
      const nextYear = año + 1
      if (datosAnuales[nextYear]) {
        setAño(nextYear)
        setMesIndex(0)
      }
    } else {
      setMesIndex(mesIndex + 1)
    }
  }

  // Datos para tendencia de 6 meses
  const tendencia6Meses = []
  let tempAño = año
  let tempMes = mesIndex
  for (let i = 5; i >= 0; i--) {
    const datos = datosAnuales[tempAño]?.[tempMes]
    if (datos) {
      tendencia6Meses.unshift({
        mes: datos.mesCorto,
        balance: datos.ingresos - datos.egresos,
        ingresos: datos.ingresos,
        egresos: datos.egresos,
      })
    }
    tempMes--
    if (tempMes < 0) {
      tempAño--
      tempMes = 11
    }
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
        {/* Título */}
        <h1 className={`text-xl font-bold text-center ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
          Gráficos y Estadísticas
        </h1>

        {/* Selector de mes con año */}
        <div
          className={`flex items-center justify-between rounded-2xl p-4 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}
        >
          <button
            onClick={prevMonth}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
              ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <select
              value={año}
              onChange={(e) => setAño(Number(e.target.value))}
              className={`text-xs bg-transparent border-none cursor-pointer text-center ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
            >
              {añosDisponibles.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-[#1e3a5f]"}`}>{data.mes}</h2>
          </div>
          <button
            onClick={nextMonth}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
              ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stats resumen */}
        <div className="grid grid-cols-3 gap-2">
          <div
            className={`rounded-xl p-3 text-center ${theme === "dark" ? "bg-green-500/10" : "bg-green-50 border border-green-100"}`}
          >
            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Ingresos</p>
            <p className="text-sm font-bold text-green-500">₡{formatearMoneda(data.ingresos)}</p>
          </div>
          <div
            className={`rounded-xl p-3 text-center ${theme === "dark" ? "bg-red-500/10" : "bg-red-50 border border-red-100"}`}
          >
            <TrendingDown className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Egresos</p>
            <p className="text-sm font-bold text-red-500">₡{formatearMoneda(data.egresos)}</p>
          </div>
          <div className={`rounded-xl p-3 text-center ${theme === "dark" ? "bg-slate-700" : "bg-slate-100"}`}>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Balance</p>
            <p className={`text-lg font-bold ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
              {balance < 0 ? "-" : ""}₡{formatearMoneda(balance)}
            </p>
          </div>
        </div>

        {/* Gráfico de barras Ingresos vs Egresos */}
        <div className={`rounded-2xl p-4 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}>
          <h3 className={`font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
            Ingresos vs Egresos
          </h3>
          <div className="h-40 flex items-end justify-center gap-16">
            <div className="flex flex-col items-center w-24">
              <div
                className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-500"
                style={{ height: `${(data.ingresos / maxValue) * 120}px` }}
              ></div>
              <span className={`text-sm font-medium mt-2 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                Ingresos
              </span>
              <span className="text-xs text-green-500 font-semibold">₡{formatearMoneda(data.ingresos)}</span>
            </div>
            <div className="flex flex-col items-center w-24">
              <div
                className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg transition-all duration-500"
                style={{ height: `${(data.egresos / maxValue) * 120}px` }}
              ></div>
              <span className={`text-sm font-medium mt-2 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                Egresos
              </span>
              <span className="text-xs text-red-500 font-semibold">₡{formatearMoneda(data.egresos)}</span>
            </div>
          </div>
        </div>

        {/* Distribución de egresos por categoría */}
        <div className={`rounded-2xl p-4 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}>
          <h3 className={`font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
            Distribución de Gastos
          </h3>
          <div className="space-y-3">
            {categoriasOrdenadas.map(([cat, valor], i) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>{cat}</span>
                  <span className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                    ₡{formatearMoneda(valor)}
                  </span>
                </div>
                <div className={`h-3 rounded-full ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}>
                  <div
                    className={`h-full rounded-full ${coloresCategorias[i]} transition-all duration-500`}
                    style={{ width: `${(valor / data.egresos) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tendencia 6 meses */}
        <div className={`rounded-2xl p-4 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}>
          <h3 className={`font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
            Tendencia Últimos 6 Meses
          </h3>
          <div className="h-28 flex items-end justify-between gap-2">
            {tendencia6Meses.map((d, i) => {
              const maxBal = Math.max(...tendencia6Meses.map((t) => Math.abs(t.balance)))
              const height = Math.max((Math.abs(d.balance) / maxBal) * 80, 10)
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <span className={`text-xs mb-1 font-semibold ${d.balance >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {d.balance >= 0 ? "+" : ""}
                    {(d.balance / 1000).toFixed(0)}k
                  </span>
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${d.balance >= 0 ? "bg-green-500" : "bg-red-500"}`}
                    style={{ height: `${height}px` }}
                  ></div>
                  <span className={`text-xs mt-1 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                    {d.mes}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
