import { useState, useRef, ChangeEvent } from 'react';

interface ImagePreview {
  name: string;
  url: string;
}

interface UploadImages {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
}

export default function MultipleImageUploadButton({
  onFilesChange,
  maxFiles = Infinity
}: UploadImages) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<ImagePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files?.length) return;
    
    // Get newly selected files
    const newlySelectedFiles = Array.from(event.target.files);
    
    // Calculate how many more files we can add based on maxFiles limit
    const remainingSlots = maxFiles - selectedFiles.length;
    const filesToAdd = newlySelectedFiles.slice(0, remainingSlots);
    
    if (filesToAdd.length > 0) {
      // Create a new array with both existing and new files
      const updatedFiles = [...selectedFiles, ...filesToAdd];
      setSelectedFiles(updatedFiles);
      
      // Notify parent component if callback exists
      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }
      
      // Process new files for preview
      filesToAdd.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            // Add this new preview to the existing previews
            setPreviews(currentPreviews => [
              ...currentPreviews,
              {
                name: file.name,
                url: e.target?.result as string
              }
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    
    // Reset the input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (index: number): void => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    
    // Notify parent component if callback exists
    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };

  const remainingSlots = maxFiles - selectedFiles.length;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
      {remainingSlots > 0 && (
        <button 
          onClick={handleButtonClick}
          className="bg-green-600 hover:bg-green-600 text-white font-medium py-3 px-6 rounded transition-colors"
          type="button"
        >
          Select Produce Images {maxFiles < Infinity && `(${remainingSlots} remaining)`}
        </button>
      )}
      
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      
      {selectedFiles.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Selected {selectedFiles.length} {selectedFiles.length === 1 ? 'image' : 'images'}
          {maxFiles < Infinity && ` (max: ${maxFiles})`}
        </div>
      )}
      
      {previews.length > 0 && (
        <div className="mt-4 w-full max-w-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img 
                  src={preview.url} 
                  alt={`Preview ${index + 1}`} 
                  className="h-32 w-full object-cover rounded shadow-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                  {preview.name}
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}