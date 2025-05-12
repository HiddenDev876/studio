
"use client";

import Link from "next/link";
import { Menu, BotMessageSquare, X, Puzzle, UserCircle, LogIn, UserPlus, LayoutDashboard, ShieldAlert, Settings, Sun, Moon } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const baseNavLinks = [
  { href: "/", label: "Home" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/help", label: "Help" },
  { href: "/contact", label: "Contact" },
  { href: "/data-privacy", label: "Data Privacy" },
  { href: "/extension-info", label: "Extension", icon: <Puzzle className="inline-block h-4 w-4 mr-1" /> },
];

const guestLinks = [
  { href: "/login", label: "Login", icon: <LogIn className="inline-block h-4 w-4 mr-1 md:mr-0" /> },
  { href: "/signup", label: "Sign Up", icon: <UserPlus className="inline-block h-4 w-4 mr-1 md:mr-0" /> },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  
  // Mock authentication state - replace with actual auth logic
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false); // Mock admin state

  // Simulate login/logout for testing
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);
  const toggleAdmin = () => setIsAdmin(!isAdmin);


  const currentNavLinks = [...baseNavLinks];

  const ThemeToggleButton = ({ isMobile = false }) => (
    <Button
      variant="ghost"
      size={isMobile ? "default" : "icon"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={isMobile ? "w-full justify-start text-base font-medium py-2 px-2 mt-1 flex items-center" : "h-9 w-9"}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <Sun className={cn("h-5 w-5", isMobile && "mr-3")} />
          {isMobile && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className={cn("h-5 w-5", isMobile && "mr-3")} />
          {isMobile && <span>Dark Mode</span>}
        </>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BotMessageSquare className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">TextTransformer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          {currentNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.icon && <span className="mr-1">{link.icon}</span>}
              {link.label}
            </Link>
          ))}

          <ThemeToggleButton />

          {/* Auth Links for Desktop */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <UserCircle className="h-7 w-7 text-primary" />
                   <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/user" className="flex items-center w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> My Dashboard
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/admin" className="flex items-center w-full">
                       <ShieldAlert className="mr-2 h-4 w-4" /> Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Settings 
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleLogin}> {/* Mock Logout */}
                  <LogIn className="mr-2 h-4 w-4" /> Logout {/* Changed icon to LogIn for logout */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              {guestLinks.map(link => (
                 <Button key={link.href} asChild variant={link.href === "/login" ? "outline" : "default"} size="sm">
                    <Link href={link.href} className="flex items-center">
                      {link.icon} <span className="ml-1">{link.label}</span>
                    </Link>
                  </Button>
              ))}
            </div>
          )}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-0">
            <SheetHeader className="p-6 pb-0 flex flex-row justify-between items-center">
                 <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <BotMessageSquare className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold">TextTransformer</span>
                  </Link>
                 <SheetTitle className="sr-only">Navigation Menu</SheetTitle> {/* Added sr-only SheetTitle */}
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
              </SheetHeader>
              <div className="flex flex-col gap-1 p-4 pt-2">
                {currentNavLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary py-2 px-2 rounded-md flex items-center",
                        pathname === link.href ? "text-primary bg-muted" : "text-foreground"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                       {link.icon && React.cloneElement(link.icon, { className: "inline-block h-5 w-5 mr-3" })}
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-4 pt-4 border-t">
                 <ThemeToggleButton isMobile={true} />
                  {isLoggedIn ? (
                    <>
                      <SheetClose asChild>
                        <Link href="/dashboard/user" className={cn("text-base font-medium transition-colors hover:text-primary py-2 px-2 rounded-md flex items-center", pathname === "/dashboard/user" ? "text-primary bg-muted" : "text-foreground")} onClick={() => setIsMobileMenuOpen(false)}>
                          <LayoutDashboard className="inline-block h-5 w-5 mr-3" /> My Dashboard
                        </Link>
                      </SheetClose>
                      {isAdmin && (
                        <SheetClose asChild>
                           <Link href="/dashboard/admin" className={cn("text-base font-medium transition-colors hover:text-primary py-2 px-2 rounded-md flex items-center", pathname === "/dashboard/admin" ? "text-primary bg-muted" : "text-foreground")} onClick={() => setIsMobileMenuOpen(false)}>
                            <ShieldAlert className="inline-block h-5 w-5 mr-3" /> Admin Panel
                           </Link>
                        </SheetClose>
                      )}
                       <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start text-base font-medium py-2 px-2 mt-1 flex items-center" onClick={() => { /* Add settings navigation logic here */ setIsMobileMenuOpen(false);}}>
                          <Settings className="inline-block h-5 w-5 mr-3" /> Settings
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start text-base font-medium py-2 px-2 mt-1 flex items-center" onClick={() => { toggleLogin(); setIsMobileMenuOpen(false);}}>
                          <LogIn className="inline-block h-5 w-5 mr-3" /> Logout {/* Changed icon */}
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    guestLinks.map(link => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "text-base font-medium transition-colors hover:text-primary py-2 px-2 rounded-md flex items-center",
                            pathname === link.href ? "text-primary bg-muted" : "text-foreground"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {React.cloneElement(link.icon, { className: "inline-block h-5 w-5 mr-3" })}
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))
                  )}
                </div>
                 {/* Mock controls for testing - remove in production */}
                <div className="mt-auto p-2 space-y-2 border-t">
                    <Button onClick={toggleLogin} variant="outline" className="w-full text-xs">{isLoggedIn ? 'Mock Logout' : 'Mock Login'}</Button>
                    {isLoggedIn && <Button onClick={toggleAdmin} variant="outline" className="w-full text-xs">{isAdmin ? 'Set User' : 'Set Admin'}</Button>}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
