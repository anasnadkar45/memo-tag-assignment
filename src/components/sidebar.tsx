"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Eye, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "./theme/ModeToggle"
import { handleSignOut } from "@/app/actions"

const routes = [
  { href: "/", label: "Home", icon: Home },
  { href: "/superadmin", label: "Manage Posts", icon: Users },
  { href: "/common", label: "Approved Posts", icon: Eye },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card text-card-foreground shadow-lg">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Community Posts</h1>
        <ModeToggle />
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button variant="ghost" className={cn("w-full justify-start hover:bg-muted/50 transition-all ease-in mb-2" , pathname === route.href && "bg-muted")}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t space-y-2">
        <form action={handleSignOut}>
          <Button type='submit' className='w-full' variant={'secondary'}>
            Logout
          </Button>
        </form>

      </div>
    </div>
  )
}

