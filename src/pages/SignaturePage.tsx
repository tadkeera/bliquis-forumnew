import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveSignature, getSignature, deleteSignature } from "@/lib/signature";
import { Upload, Save, Trash2, Check } from "lucide-react";

const SignaturePage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getSignature();
    if (existing) {
      setPreview(existing);
      setSaved(true);
    }
  }, []);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      setSaved(false);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = () => {
    if (!preview) return;
    saveSignature(preview);
    setSaved(true);
    toast({ title: "تم الحفظ", description: "تم حفظ التوقيع بنجاح" });
  };

  const handleDelete = () => {
    deleteSignature();
    setPreview(null);
    setSaved(false);
    toast({ title: "تم الحذف", description: "تم حذف التوقيع" });
  };

  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-primary mb-6">التوقيع</h1>

      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-card rounded-lg shadow-md p-6 border text-center">
          {preview ? (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">معاينة التوقيع:</p>
              <div className="bg-muted rounded-lg p-4 inline-block border-2 border-dashed border-border">
                <img src={preview} alt="التوقيع" className="max-h-32 max-w-full object-contain" />
              </div>
              {saved && (
                <div className="flex items-center justify-center gap-1 mt-2 text-sm text-green-600">
                  <Check className="h-4 w-4" /> محفوظ
                </div>
              )}
            </div>
          ) : (
            <div className="py-10 text-muted-foreground">
              <p className="text-lg mb-2">لم يتم إضافة توقيع بعد</p>
              <p className="text-sm">قم باستيراد صورة التوقيع (PNG شفافة الخلفية)</p>
            </div>
          )}

          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImport} className="hidden" />

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Upload className="h-4 w-4" />استيراد صورة التوقيع
            </Button>
            {preview && !saved && (
              <Button onClick={handleSave} variant="default" className="gap-2 bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4" />حفظ التوقيع
              </Button>
            )}
            {preview && (
              <Button onClick={handleDelete} variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />حذف التوقيع
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignaturePage;
