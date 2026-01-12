"use client"

import { useState } from "react"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Item {
  id: number
  cantidad: string
  medida: string
  articulo: string
  valor: string
}

export default function EditarPlantillaPage() {
  const router = useRouter()
  const [nombre, setNombre] = useState("Compra 1")
  const [descripcion, setDescripcion] = useState("Materiales para construcción")
  const [items, setItems] = useState<Item[]>([
    { id: 1, cantidad: "1250", medida: "Unidad", articulo: "Block", valor: "455" },
    { id: 2, cantidad: "1250", medida: "Unidad", articulo: "Varilla", valor: "455" },
    { id: 3, cantidad: "1250", medida: "Varas", articulo: "Varas", valor: "455" },
  ])

  const addItem = () => {
    setItems([...items, { id: items.length + 1, cantidad: "", medida: "Unidad", articulo: "", valor: "" }])
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleGuardar = () => {
    console.log("[v0] Actualizando plantilla:", { nombre, descripcion, items })
    router.push("/plantillas")
  }

  const calcularSubtotal = () => {
    return items.reduce((total, item) => {
      const cantidad = Number.parseFloat(item.cantidad) || 0
      const valor = Number.parseFloat(item.valor.replace(/[^\d.-]/g, "")) || 0
      return total + cantidad * valor
    }, 0)
  }

  const subtotal = calcularSubtotal()
  const flete = 8750
  const iva = subtotal * 0.13
  const total = subtotal + flete + iva

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <header className="bg-blue-600 text-white sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <Link
              href="/plantillas"
              className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-blue-700 transition-colors"
              aria-label="Volver a plantillas"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold">Detalles Plantilla Compra #1</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-lg font-semibold mb-2 text-gray-900">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-lg font-semibold mb-2 text-gray-900">
              Descripción
            </label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="mt-8">
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden mb-4">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left text-base font-bold p-4 text-gray-900">Cantidad/Medida</th>
                  <th className="text-left text-base font-bold p-4 text-gray-900">Artículo</th>
                  <th className="text-left text-base font-bold p-4 text-gray-900">Valor</th>
                  <th className="text-left text-base font-bold p-4 text-gray-900">Total</th>
                  <th className="w-16"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className={index !== items.length - 1 ? "border-b border-gray-200" : ""}>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={item.cantidad}
                          onChange={(e) => {
                            const updated = items.map((i) =>
                              i.id === item.id ? { ...i, cantidad: e.target.value } : i,
                            )
                            setItems(updated)
                          }}
                          className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg"
                        />
                        <select
                          value={item.medida}
                          onChange={(e) => {
                            const updated = items.map((i) => (i.id === item.id ? { ...i, medida: e.target.value } : i))
                            setItems(updated)
                          }}
                          className="px-3 py-2 border-2 border-gray-300 rounded-lg bg-white"
                        >
                          <option>Unidad</option>
                          <option>Kilo</option>
                          <option>Varas</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        value={item.articulo}
                        onChange={(e) => {
                          const updated = items.map((i) => (i.id === item.id ? { ...i, articulo: e.target.value } : i))
                          setItems(updated)
                        }}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        value={item.valor}
                        onChange={(e) => {
                          const updated = items.map((i) => (i.id === item.id ? { ...i, valor: e.target.value } : i))
                          setItems(updated)
                        }}
                        className="w-32 px-3 py-2 border-2 border-gray-300 rounded-lg"
                      />
                    </td>
                    <td className="p-4 font-bold text-blue-600">
                      ₵
                      {(
                        (Number.parseFloat(item.cantidad) || 0) *
                        (Number.parseFloat(item.valor.replace(/[^\d.-]/g, "")) || 0)
                      ).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-100 text-red-600 disabled:opacity-30 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mb-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex gap-2 flex-1">
                    <input
                      type="text"
                      value={item.cantidad}
                      onChange={(e) => {
                        const updated = items.map((i) => (i.id === item.id ? { ...i, cantidad: e.target.value } : i))
                        setItems(updated)
                      }}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg"
                    />
                    <select
                      value={item.medida}
                      onChange={(e) => {
                        const updated = items.map((i) => (i.id === item.id ? { ...i, medida: e.target.value } : i))
                        setItems(updated)
                      }}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg bg-white"
                    >
                      <option>Unidad</option>
                      <option>Kilo</option>
                      <option>Varas</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-100 text-red-600 disabled:opacity-30"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={item.articulo}
                  onChange={(e) => {
                    const updated = items.map((i) => (i.id === item.id ? { ...i, articulo: e.target.value } : i))
                    setItems(updated)
                  }}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
                />
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item.valor}
                    onChange={(e) => {
                      const updated = items.map((i) => (i.id === item.id ? { ...i, valor: e.target.value } : i))
                      setItems(updated)
                    }}
                    className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg"
                  />
                  <span className="text-base font-bold text-blue-600 whitespace-nowrap">
                    ₵
                    {(
                      (Number.parseFloat(item.cantidad) || 0) *
                      (Number.parseFloat(item.valor.replace(/[^\d.-]/g, "")) || 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="w-full bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar artículo
          </button>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-3">
          <div className="flex justify-between text-base">
            <span className="text-gray-600 font-semibold">Subt Total</span>
            <span className="font-bold text-gray-900">₵{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-gray-600 font-semibold">Flete</span>
            <span className="font-bold text-gray-900">₵{flete.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-gray-600 font-semibold">I.V.A</span>
            <span className="font-bold text-gray-900">₵{Math.round(iva).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-gray-600 font-semibold">Ferretería Arias</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t-2 border-gray-200 pt-3 text-red-600">
            <span>Total</span>
            <span>₵{Math.round(total).toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={handleGuardar}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-6 rounded-lg transition-colors mt-6"
        >
          Confirmar Plantilla
        </button>
      </main>
    </div>
  )
}
