import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Maximize2, Minimize2 } from "lucide-react";

interface SignaturePosition {
  x: number;
  y: number;
  scale: number;
}

interface DraggableSignatureProps {
  signatureUrl: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onConfirm: (position: SignaturePosition) => void;
  onCancel: () => void;
}

const DraggableSignature = ({ signatureUrl, containerRef, onConfirm, onCancel }: DraggableSignatureProps) => {
  const [position, setPosition] = useState<SignaturePosition>({ x: 100, y: 300, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const sigRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const rect = sigRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = { x: clientX - rect.left, y: clientY - rect.top };
    }
  }, []);

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = clientX - containerRect.left - dragOffset.current.x;
    const newY = clientY - containerRect.top - dragOffset.current.y;
    setPosition(prev => ({ ...prev, x: newX, y: newY }));
  }, [isDragging, containerRef]);

  const handleUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [handleMove, handleUp]);

  const scaleUp = () => setPosition(prev => ({ ...prev, scale: Math.min(prev.scale + 0.2, 3) }));
  const scaleDown = () => setPosition(prev => ({ ...prev, scale: Math.max(prev.scale - 0.2, 0.4) }));

  return (
    <div
      ref={sigRef}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div
        style={{
          border: "2px dashed hsl(228 62% 26%)",
          borderRadius: "8px",
          padding: "8px",
          background: "rgba(255,255,255,0.85)",
          position: "relative",
        }}
      >
        <img
          src={signatureUrl}
          alt="توقيع"
          className="signature-display"
          style={{
            transform: `scale(${position.scale})`,
            transformOrigin: "center center",
            maxHeight: "80px",
            pointerEvents: "none",
            display: "block",
          }}
          draggable={false}
        />
        <div
          style={{
            display: "flex",
            gap: "4px",
            justifyContent: "center",
            marginTop: "6px",
          }}
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
        >
          <Button size="icon" variant="outline" className="h-7 w-7" onClick={scaleUp} title="تكبير">
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
          <Button size="icon" variant="outline" className="h-7 w-7" onClick={scaleDown} title="تصغير">
            <Minimize2 className="h-3.5 w-3.5" />
          </Button>
          <Button size="icon" className="h-7 w-7 bg-green-600 hover:bg-green-700" onClick={() => onConfirm(position)} title="اعتماد">
            <Check className="h-3.5 w-3.5 text-white" />
          </Button>
          <Button size="icon" variant="destructive" className="h-7 w-7" onClick={onCancel} title="إلغاء">
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { SignaturePosition };
export default DraggableSignature;
