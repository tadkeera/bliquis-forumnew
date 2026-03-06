import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { FileText, ClipboardList, Database, PenTool, Smartphone, Tablet, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

const formCards = [
  {
    title: "استمارة دعم طبيب",
    description: "نموذج طلب دعم مالي لطبيب مع تفاصيل التخصص والصيدليات",
    path: "/doctor-support",
    icon: FileText,
  },
  {
    title: "نموذج تصريف",
    description: "إنشاء نموذج لتصريف الأصناف",
    path: "/consignment",
    icon: FileText,
  },
  {
    title: "استمارة بونص إضافي",
    description: "نموذج طلب بونص إضافي للعملاء",
    path: "/extra-bonus",
    icon: FileText,
  },
  {
    title: "السجلات",
    description: "عرض وإدارة جميع النماذج المحفوظة",
    path: "/reports",
    icon: ClipboardList,
  },
  {
    title: "إدارة التوقيع",
    description: "رفع وحفظ صورة التوقيع لإضافتها للنماذج",
    path: "/signature",
    icon: PenTool,
  },
  {
    title: "النسخ الاحتياطي",
    description: "إدارة البيانات والنسخ الاحتياطي",
    path: "/data-management",
    icon: Database,
  },
];

type ViewMode = "mobile" | "tablet" | "desktop";

const viewModes: { mode: ViewMode; label: string; icon: typeof Smartphone; width: string }[] = [
  { mode: "mobile", label: "هاتف", icon: Smartphone, width: "max-w-sm" },
  { mode: "tablet", label: "تابلت", icon: Tablet, width: "max-w-2xl" },
  { mode: "desktop", label: "ديسكتوب", icon: Monitor, width: "max-w-full" },
];

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const currentView = viewModes.find(v => v.mode === viewMode)!;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <img src={logo} alt="شعار مخازن بلقيس للأدوية" className="h-24 w-24 mx-auto mb-6 rounded-xl bg-card p-2 shadow-lg" />
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
            نماذج شركة مخازن بلقيس للأدوية
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            نظام إلكتروني لإدارة وطباعة النماذج الرسمية للشركة
          </p>
        </div>
      </section>

      {/* View Mode Selector */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex items-center justify-center gap-2 bg-muted rounded-lg p-2 w-fit mx-auto">
          {viewModes.map(({ mode, label, icon: Icon }) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode(mode)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <section className={`mx-auto px-4 py-12 ${currentView.width}`}>
        <div className={`grid gap-6 ${
          viewMode === "mobile" ? "grid-cols-1" : 
          viewMode === "tablet" ? "grid-cols-2" : 
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}>
          {formCards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="group bg-card rounded-xl border shadow-sm hover:shadow-md transition-all p-6 flex flex-col items-center text-center gap-4 hover:-translate-y-1"
            >
              <div className="bg-secondary rounded-full p-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <card.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
