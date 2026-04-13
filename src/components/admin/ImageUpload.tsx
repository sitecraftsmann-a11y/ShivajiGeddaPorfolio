import { useState, useRef } from "react";
import { supabase } from "../../supabase";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string | null;
  bucket?: string;
  folder?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "any";
}

export function ImageUpload({ 
  onUpload, 
  currentUrl, 
  bucket = "portfolio", 
  folder = "general",
  className,
  aspectRatio = "square"
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }

    // Max size 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUpload(publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (error: any) {
      console.error("Upload error:", error);
      let message = error.message || "Failed to upload image.";
      if (message.includes("bucket not found")) {
        message = "Storage bucket 'portfolio' not found. Please create it in your Supabase dashboard.";
      }
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    onUpload("");
  };

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    any: "aspect-auto min-h-[200px]"
  };

  return (
    <div className={cn("relative group", className)}>
      {currentUrl ? (
        <div className={cn(
          "relative rounded-3xl overflow-hidden border border-border bg-secondary/10",
          aspectClasses[aspectRatio]
        )}>
          <img 
            src={currentUrl} 
            alt="Uploaded" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-2xl bg-white text-black hover:scale-110 transition-transform"
              title="Change Image"
            >
              <Upload className="w-5 h-5" />
            </button>
            <button
              onClick={removeImage}
              className="p-3 rounded-2xl bg-destructive text-destructive-foreground hover:scale-110 transition-transform"
              title="Remove Image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all cursor-pointer",
            aspectClasses[aspectRatio],
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/5",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-sm font-bold uppercase tracking-widest text-primary">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <ImageIcon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-1">Upload Image</p>
                <p className="text-xs text-muted-foreground">Drag and drop or click to browse</p>
              </div>
            </div>
          )}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
