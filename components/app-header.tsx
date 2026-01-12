"use client"

import Link from "next/link"

interface AppHeaderProps {
  showBack?: boolean
  backHref?: string
}

export default function AppHeader({ showBack = true, backHref = "/" }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
        {/* Botón Atrás */}
        {showBack ? (
          <Link
            href={backHref}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[#1e3a5f] dark:text-blue-400 border-2 border-[#1e3a5f] dark:border-blue-400 rounded-md hover:bg-[#1e3a5f] hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Atrás
          </Link>
        ) : (
          <div />
        )}

        {/* Usuario y acciones */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Felipe</span>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#1e3a5f] dark:bg-blue-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* Campana */}
          <button
            className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors"
            aria-label="Notificaciones"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Engranaje */}
          <button
            className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors"
            aria-label="Configuración"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
