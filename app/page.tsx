"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  FolderKanban,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react"
import Link from "next/link"

const yearData: Record<
  number,
  Record<number, { month: string; egresos: number; ingresos: number; admin: number; proyectos: number; otros: number }>
> = {
  2023: {
    0: { month: "Enero", egresos: 650000, ingresos: 780000, admin: -280000, proyectos: 350000, otros: -8000 },
    1: { month: "Febrero", egresos: 580000, ingresos: 820000, admin: -250000, proyectos: 420000, otros: -6000 },
    2: { month: "Marzo", egresos: 720000, ingresos: 550000, admin: -380000, proyectos: 200000, otros: -10000 },
    3: { month: "Abril", egresos: 490000, ingresos: 680000, admin: -220000, proyectos: 380000, otros: -5000 },
    4: { month: "Mayo", egresos: 610000, ingresos: 740000, admin: -300000, proyectos: 390000, otros: -7000 },
    5: { month: "Junio", egresos: 780000, ingresos: 620000, admin: -450000, proyectos: 260000, otros: -12000 },
    6: { month: "Julio", egresos: 820000, ingresos: 580000, admin: -480000, proyectos: 220000, otros: -15000 },
    7: { month: "Agosto", egresos: 690000, ingresos: 850000, admin: -320000, proyectos: 440000, otros: -5000 },
    8: { month: "Septiembre", egresos: 750000, ingresos: 520000, admin: -400000, proyectos: 170000, otros: -9000 },
    9: { month: "Octubre", egresos: 800000, ingresos: 350000, admin: -480000, proyectos: 175000, otros: -12000 },
    10: { month: "Noviembre", egresos: 660000, ingresos: 790000, admin: -290000, proyectos: 370000, otros: -7000 },
    11: { month: "Diciembre", egresos: 850000, ingresos: 1100000, admin: -500000, proyectos: 730000, otros: -4000 },
  },
  2024: {
    0: { month: "Enero", egresos: 700000, ingresos: 850000, admin: -300000, proyectos: 420000, otros: -9000 },
    1: { month: "Febrero", egresos: 630000, ingresos: 880000, admin: -260000, proyectos: 480000, otros: -7000 },
    2: { month: "Marzo", egresos: 780000, ingresos: 600000, admin: -420000, proyectos: 250000, otros: -11000 },
    3: { month: "Abril", egresos: 540000, ingresos: 740000, admin: -260000, proyectos: 440000, otros: -6000 },
    4: { month: "Mayo", egresos: 660000, ingresos: 800000, admin: -330000, proyectos: 450000, otros: -8000 },
    5: { month: "Junio", egresos: 840000, ingresos: 680000, admin: -490000, proyectos: 320000, otros: -13000 },
    6: { month: "Julio", egresos: 880000, ingresos: 640000, admin: -530000, proyectos: 280000, otros: -16000 },
    7: { month: "Agosto", egresos: 750000, ingresos: 910000, admin: -360000, proyectos: 500000, otros: -5500 },
    8: { month: "Septiembre", egresos: 810000, ingresos: 580000, admin: -450000, proyectos: 210000, otros: -10000 },
    9: { month: "Octubre", egresos: 860000, ingresos: 410000, admin: -530000, proyectos: 235000, otros: -14000 },
    10: { month: "Noviembre", egresos: 720000, ingresos: 850000, admin: -310000, proyectos: 430000, otros: -8000 },
    11: { month: "Diciembre", egresos: 910000, ingresos: 1150000, admin: -550000, proyectos: 790000, otros: -4500 },
  },
  2025: {
    0: { month: "Enero", egresos: 750000, ingresos: 890000, admin: -320000, proyectos: 460000, otros: -10000 },
    1: { month: "Febrero", egresos: 680000, ingresos: 920000, admin: -280000, proyectos: 520000, otros: -8000 },
    2: { month: "Marzo", egresos: 820000, ingresos: 650000, admin: -450000, proyectos: 280000, otros: -12000 },
    3: { month: "Abril", egresos: 590000, ingresos: 780000, admin: -290000, proyectos: 480000, otros: -7000 },
    4: { month: "Mayo", egresos: 710000, ingresos: 840000, admin: -360000, proyectos: 490000, otros: -9000 },
    5: { month: "Junio", egresos: 880000, ingresos: 720000, admin: -520000, proyectos: 360000, otros: -14000 },
    6: { month: "Julio", egresos: 920000, ingresos: 680000, admin: -560000, proyectos: 320000, otros: -18000 },
    7: { month: "Agosto", egresos: 790000, ingresos: 950000, admin: -380000, proyectos: 540000, otros: -6000 },
    8: { month: "Septiembre", egresos: 850000, ingresos: 620000, admin: -480000, proyectos: 250000, otros: -11000 },
    9: { month: "Octubre", egresos: 900780, ingresos: 450970, admin: -560000, proyectos: 275000, otros: -15000 },
    10: { month: "Noviembre", egresos: 760000, ingresos: 890000, admin: -340000, proyectos: 470000, otros: -8500 },
    11: { month: "Diciembre", egresos: 950000, ingresos: 1200000, admin: -580000, proyectos: 830000, otros: -5000 },
  },
}

export default function AdminHome() {
  const [currentYear, setCurrentYear] = useState(2025)
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("ipsum-theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("ipsum-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const data = yearData[currentYear]?.[currentMonthIndex] || yearData[2025][9]
  const balance = data.ingresos - data.egresos

  const previousMonth = () => {
    if (currentMonthIndex === 0) {
      if (yearData[currentYear - 1]) {
        setCurrentYear(currentYear - 1)
        setCurrentMonthIndex(11)
      }
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonthIndex === 11) {
      if (yearData[currentYear + 1]) {
        setCurrentYear(currentYear + 1)
        setCurrentMonthIndex(0)
      }
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CR", { style: "decimal", minimumFractionDigits: 0 }).format(Math.abs(value))
  }

  const availableYears = Object.keys(yearData).map(Number)

  return (
    <div className={`h-screen overflow-hidden flex flex-col ${theme === "dark" ? "bg-slate-900" : "bg-slate-50"}`}>
      <div className="absolute top-3 right-3">
        <button
          onClick={toggleTheme}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
            ${theme === "dark" ? "bg-slate-800 text-yellow-400" : "bg-white text-slate-700 shadow"}`}
          aria-label="Cambiar tema"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-4 max-w-sm mx-auto w-full">
        <div className="flex items-center justify-center gap-6 mb-4">
          <button
            onClick={previousMonth}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
              ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-white hover:bg-slate-100 text-slate-800 shadow"}`}
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setShowDatePicker(true)} className="text-center">
            <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{currentYear}</p>
            <h2 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>{data.month}</h2>
          </button>
          <button
            onClick={nextMonth}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
              ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-white hover:bg-slate-100 text-slate-800 shadow"}`}
            aria-label="Mes siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className={`w-full rounded-2xl p-4 mb-4 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-red-500/10 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                <TrendingDown className="w-4 h-4" />
                <span className="text-xs font-semibold">Egresos</span>
              </div>
              <p className="text-xl font-bold text-red-500">₡{formatCurrency(data.egresos)}</p>
            </div>
            <div className="bg-green-500/10 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold">Ingresos</span>
              </div>
              <p className="text-xl font-bold text-green-500">₡{formatCurrency(data.ingresos)}</p>
            </div>
          </div>

          <div className={`rounded-xl p-4 text-center mb-3 ${theme === "dark" ? "bg-slate-700" : "bg-slate-100"}`}>
            <p className={`text-xs mb-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Balance Total</p>
            <p className={`text-4xl font-black ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
              ₡{balance < 0 ? "-" : ""}
              {formatCurrency(balance)}
            </p>
          </div>

          <div className={`space-y-1 text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
            <div className="flex justify-between">
              <span>Administrativos:</span>
              <span className={`font-semibold ${data.admin < 0 ? "text-red-500" : "text-green-500"}`}>
                ₡{data.admin < 0 ? "-" : "+"}
                {formatCurrency(data.admin)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Proyectos:</span>
              <span className={`font-semibold ${data.proyectos < 0 ? "text-red-500" : "text-green-500"}`}>
                ₡{data.proyectos < 0 ? "-" : "+"}
                {formatCurrency(data.proyectos)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Otros:</span>
              <span className={`font-semibold ${data.otros < 0 ? "text-red-500" : "text-green-500"}`}>
                ₡{data.otros < 0 ? "-" : "+"}
                {formatCurrency(data.otros)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <Link
            href="/movimientos"
            className="bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white rounded-xl h-16 flex flex-col items-center justify-center gap-1 transition-colors"
          >
            <Wallet className="w-5 h-5" />
            <span className="text-sm font-medium">Movimientos</span>
          </Link>
          <Link
            href="/proyectos"
            className="bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white rounded-xl h-16 flex flex-col items-center justify-center gap-1 transition-colors"
          >
            <FolderKanban className="w-5 h-5" />
            <span className="text-sm font-medium">Proyectos</span>
          </Link>
          <Link
            href="/plantillas"
            className="bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white rounded-xl h-16 flex flex-col items-center justify-center gap-1 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">Plantillas</span>
          </Link>
          <Link
            href="/graficos"
            className="bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white rounded-xl h-16 flex flex-col items-center justify-center gap-1 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">Gráficos</span>
          </Link>
        </div>
      </div>

      <Link
        href="/movimientos/nuevo"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white rounded-full shadow-xl flex items-center justify-center transition-colors"
        aria-label="Nuevo movimiento"
      >
        <Plus className="w-7 h-7" strokeWidth={2.5} />
      </Link>

      {showDatePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowDatePicker(false)}></div>
          <div className={`relative z-10 rounded-2xl p-6 w-72 ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}>
            <h3 className={`font-bold text-lg mb-4 text-center ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
              Seleccionar período
            </h3>
            <div className="mb-4">
              <label className={`text-sm mb-1 block ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                Año
              </label>
              <select
                className={`w-full rounded-lg px-3 py-2 text-sm ${theme === "dark" ? "bg-slate-700 text-white border-slate-600" : "bg-slate-100 text-slate-800 border-slate-200"} border`}
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className={`text-sm mb-1 block ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                Mes
              </label>
              <select
                className={`w-full rounded-lg px-3 py-2 text-sm ${theme === "dark" ? "bg-slate-700 text-white border-slate-600" : "bg-slate-100 text-slate-800 border-slate-200"} border`}
                value={currentMonthIndex}
                onChange={(e) => setCurrentMonthIndex(Number(e.target.value))}
              >
                {Object.values(yearData[currentYear] || yearData[2025]).map((m, i) => (
                  <option key={i} value={i}>
                    {m.month}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowDatePicker(false)}
              className="w-full bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white rounded-lg py-2.5 font-medium transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
