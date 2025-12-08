"use client";

// import { IKUpload } from "imagekitio-react"; // Optional: agar SDK wrapper use karna ho, but hum raw SDK use kar rahe hain consistent rehne ke liye.
import {
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void; // Parent ko URL bhejne ke liye callback
  onUploadStart: () => void; // Parent ko batane ke liye ki upload shuru ho gaya (submit button disable karne ke liye)
  currentImage?: string; // Edit mode ke liye existing image
}

const ImageUpload = ({ onUploadSuccess, onUploadStart, currentImage }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authenticator function (Same as before)
  const authenticator = async () => {
    try {
      const response = await fetch("/api/auth/imagekit-auth");
      if (!response.ok) throw new Error("Auth failed");
      const data = await response.json();
      return { ...data };
    } catch (err) {
      console.error(err);
      throw new Error("Authentication request failed");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Reset states & Show local preview immediately
    setError(null);
    setLoading(true);
    onUploadStart(); // Parent ko notify karo ki uploading start ho gayi
    setPreview(URL.createObjectURL(file)); // Local preview for better UX

    try {
      // 2. Authenticate
      const authParams = await authenticator();

      // 3. Upload to ImageKit
      const response = await upload({
        file: file,
        fileName: file.name,
        useUniqueFileName: true,
        tags: ["product_image"],
        publicKey: authParams.publicKey,
        signature: authParams.signature,
        expire: authParams.expire,
        token: authParams.token,
        onProgress: (evt) => {
           if (evt.total) setProgress(Math.round((evt.loaded / evt.total) * 100));
        },
      });

      // 4. Success handling
      console.log("Uploaded:", response.url);
      onUploadSuccess(response.url!); // Parent form ko URL bhejo
      setLoading(false);

    } catch (err: any) {
      console.error("Upload error:", err);
      setError("Image upload failed. Please try again.");
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onUploadSuccess(""); // Clear URL in parent
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Product Image</label>
      
      {/* Upload Area */}
      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-gray-50"
          >
            <span className="text-xs text-gray-500 text-center px-2">Click to Upload</span>
          </div>
        )}

        <div className="flex-1">
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" // Input ko hide karke custom UI use kar rahe hain
            />
            
            {/* Progress Bar */}
            {loading && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                    ></div>
                    <p className="text-xs text-gray-500 mt-1">Uploading... {progress}%</p>
                </div>
            )}
            
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;