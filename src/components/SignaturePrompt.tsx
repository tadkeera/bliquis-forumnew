import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getSignature } from "@/lib/signature";
import { PenLine, Check } from "lucide-react";

interface SignaturePromptProps {
  open: boolean;
  onAddSignature: (signatureUrl: string) => void;
  onClose: () => void;
  label?: string;
}

const SignaturePrompt = ({ open, onAddSignature, onClose, label = "المندوب" }: SignaturePromptProps) => {
  const [signature, setSignature] = useState<string | null>(null);

  useEffect(() => {
    setSignature(getSignature());
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-card rounded-xl shadow-2xl border-2 border-primary/20 p-6 max-w-sm w-full text-center animate-fade-in">
        <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <PenLine className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">قم بإضافة التوقيع</h3>
        <p className="text-sm text-muted-foreground mb-4">سيتم إضافة توقيع {label} إلى المستند</p>

        {signature ? (
          <>
            <div className="bg-muted rounded-lg p-3 mb-4 inline-block border border-dashed border-border">
              <img src={signature} alt="التوقيع" className="max-h-20 max-w-full object-contain" />
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => onAddSignature(signature)} className="gap-2">
                <Check className="h-4 w-4" />إضافة توقيع {label}
              </Button>
              <Button variant="outline" onClick={onClose}>إغلاق</Button>
            </div>
          </>
        ) : (
          <div>
            <p className="text-sm text-destructive mb-4">لم يتم حفظ توقيع بعد. يرجى الذهاب لصفحة التوقيع أولاً.</p>
            <Button variant="outline" onClick={onClose}>إغلاق</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignaturePrompt;
