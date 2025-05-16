<<<<<<< HEAD
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
=======
import React, { useState, ChangeEvent, useEffect } from 'react';

interface ImageUploadFormProps {
  onSubmit: (files: File[]) => void;
  submit: boolean;
  maxFiles?: number;
  maxSizeInMb?: number;
  allowedTypes?: string[];
}

interface FileError {
  name: string;
  error: string;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({
  onSubmit,
  submit,
  maxFiles = 5,
  maxSizeInMb = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<FileError[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // invoke the onSubmit from outside
    if (submit) {
      handleSubmit(files);
    } else {
      setFiles([]);
    }
  }, [files, submit]);

  const validateFile = (file: File): FileError | null => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        name: file.name,
        error: `Invalid file type. Allowed types: ${allowedTypes.map(type => type.split('/')[1]).join(', ')}`
      };
    }

    // Check file size
    const maxSizeInBytes = maxSizeInMb * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return {
        name: file.name,
        error: `File is too large. Maximum size is ${maxSizeInMb}MB`
      };
    }

    return null;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    processFiles(Array.from(e.target.files));
  };

  const processFiles = (newFiles: File[]) => {
    // Reset errors
    setErrors([]);
    
    // Validate max number of files
    if (files.length + newFiles.length > maxFiles) {
      setErrors([{ name: 'Too many files', error: `You can upload a maximum of ${maxFiles} files` }]);
      return;
    }

    const fileErrors: FileError[] = [];
    const validFiles: File[] = [];
    
    // Validate each file
    newFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        fileErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (fileErrors.length) {
      setErrors(fileErrors);
      return;
    }

    // Update files state
    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    
    // Generate previews
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const handleRemoveFile = (index: number) => {
    // Release object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index]);
    
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = (files: File[]) => {
    
    if (files.length === 0) {
      setErrors([{ name: 'No files', error: 'Please select at least one image to upload' }]);
      return;
    }
    
    onSubmit(files);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.length) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="image-upload-form">
      <div 
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept={allowedTypes.join(',')}
          onChange={handleFileChange}
          multiple
          id="file-input"
          className="file-input"
        />
        <label htmlFor="file-input" className="file-label">
          <div className="upload-message">
            <span className="upload-icon">📁</span>
            <p>Drag images here or click to browse</p>
            <p className="upload-details">
              Max {maxFiles} files (up to {maxSizeInMb}MB each) - 
              Accepted formats: {allowedTypes.map(type => type.split('/')[1]).join(', ')}
            </p>
          </div>
        </label>
      </div>

      {errors.length > 0 && (
        <div className="error-container">
          {errors.map((error, index) => (
            <p key={index} className="error-message">
              {error.name}: {error.error}
            </p>
          ))}
        </div>
      )}

      {previews.length > 0 && (
        <div className="preview-container">
          <h3>Selected Images ({files.length}/{maxFiles})</h3>
          <div className="preview-grid">
            {previews.map((preview, index) => (
              <div key={index} className="preview-item">
                <img src={preview} alt={`Preview ${index + 1}`} className="preview-image" />
                <button 
                  type="button" 
                  className="remove-button"
                  onClick={() => handleRemoveFile(index)}
                >
                  ✕
                </button>
                <p className="file-name">{files[index].name}</p>
                <p className="file-size">{(files[index].size / (1024 * 1024)).toFixed(2)} MB</p>
>>>>>>> refs/remotes/origin/main
              </div>
            ))}
          </div>
        </div>
      )}
<<<<<<< HEAD
    </div>
  );
}
=======

      <style >{`
        .image-upload-form {
          max-width: 800px;
          margin: 0 auto;
        }

        .upload-area {
          border: 2px dashed #ccc;
          border-radius: 8px;
          padding: 40px 20px;
          text-align: center;
          margin-bottom: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-area.dragging {
          background-color: rgba(0, 123, 255, 0.1);
          border-color: #007bff;
        }

        .file-input {
          display: none;
        }

        .file-label {
          cursor: pointer;
          display: block;
          width: 100%;
          height: 100%;
        }

        .upload-icon {
          font-size: 48px;
          margin-bottom: 10px;
          display: block;
        }

        .upload-message p {
          margin: 5px 0;
        }

        .upload-details {
          font-size: 14px;
          color: #666;
        }

        .error-container {
          background-color: #fff4f4;
          border-left: 4px solid #ff5252;
          padding: 10px 15px;
          margin-bottom: 20px;
          border-radius: 4px;
        }

        .error-message {
          color: #d32f2f;
          margin: 5px 0;
        }

        .preview-container {
          margin-bottom: 20px;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
        }

        .preview-item {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #eee;
        }

        .preview-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          display: block;
        }

        .remove-button {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .file-name {
          padding: 5px;
          margin: 0;
          font-size: 12px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .file-size {
          padding: 0 5px 5px;
          margin: 0;
          font-size: 11px;
          color: #666;
        }

        .submit-button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          width: 100%;
        }

        .submit-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ImageUploadForm;
>>>>>>> refs/remotes/origin/main
