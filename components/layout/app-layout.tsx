import type { ReactNode } from "react"
import Link from "next/link"

interface AppLayoutProps {
  children: ReactNode
  title?: string
  showBackButton?: boolean
  backHref?: string
}

export function AppLayout({ children, title, showBackButton = false, backHref = "/" }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {showBackButton && (
            <Link href={backHref} className="text-sm hover:underline">
              ← Volver
            </Link>
          )}
          <h1 className="text-xl font-semibold text-center flex-1">{title || "Quézar"}</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">{children}</main>
    </div>
  )
}
