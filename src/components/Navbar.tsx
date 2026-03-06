import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { FileText, Home, ClipboardList, Database, Menu, X, PenTool } from "lucide-react";

const navItems = [
  { path: "/", label: "الرئيسية", icon: Home },
  { path: "/doctor-support", label: "دعم طبيب", icon: FileText },
  { path: "/consignment", label: "تصريف", icon: FileText },
  { path: "/extra-bonus", label: "بونص إضافي", icon: FileText },
  { path: "/reports", label: "السجلات", icon: ClipboardList },
  { path: "/signature", label: "التوقيع", icon: PenTool },
  { path: "/data-management", label: "النسخ الاحتياطي", icon: Database },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50 no-print">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="شعار بلقيس" className="h-10 w-10 rounded-md object-contain bg-card p-0.5" />
            <span className="text-primary-foreground font-bold text-sm md:text-base hidden sm:block">
              مخازن بلقيس للأدوية
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-card text-primary"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-card text-primary"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
