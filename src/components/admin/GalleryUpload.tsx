import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { Plus, X, GripVertical } from "lucide-react";
import { motion, Reorder } from "framer-motion";

interface GalleryUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
}

export function GalleryUpload({ images = [], onChange, folder = "gallery" }: GalleryUploadProps) {
  const addImage = () => {
    onChange([...images, ""]);
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    onChange(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Gallery Images</label>
        <button
          type="button"
          onClick={addImage}
          className="text-xs font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      <Reorder.Group 
        axis="y" 
        values={images} 
        onReorder={onChange}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {images.map((url, index) => (
          <Reorder.Item
            key={index}
            value={url}
            className="relative"
          >
            <ImageUpload
              currentUrl={url}
              onUpload={(newUrl) => updateImage(index, newUrl)}
              folder={folder}
              aspectRatio="video"
              className="h-full"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground shadow-lg z-10 hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {images.length === 0 && (
        <div className="p-8 rounded-3xl border-2 border-dashed border-border text-center">
          <p className="text-sm text-muted-foreground">No gallery images added yet.</p>
        </div>
      )}
    </div>
  );
}
