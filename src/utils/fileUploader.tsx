import Image from "next/image";
import { useFileUpload, formatBytes } from "@/src/hooks/use-upload";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { startTransition, useEffect } from "react";
import { toast } from "sonner";
import { envVars } from "../config/env";

export default function FileUploader({
  profile_image,
  setImageFile,
  setImage,
  mutateOptimisticImage,
  mutateOptimisticImageFile,
  resetForm,
  setResetForm
}: {
  profile_image: boolean;
  setImageFile: (value: File | null) => void;
  setImage: (value: string) => void;
  mutateOptimisticImage: (value: string) => void;
  mutateOptimisticImageFile: (value: File | null) => void;
  resetForm: boolean;
  setResetForm: (value: boolean) => void;
}) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      // openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    // accept: "image/*, application/pdf", // What files are allowed
    accept: "image/*",
    multiple: false, // Allow multiple files
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB max size
    onFilesAdded: async (addedFiles) => {
      setResetForm(false)
      startTransition(()=>{
        mutateOptimisticImageFile(addedFiles[0]?.file as File)
      })
      setImageFile(addedFiles[0]?.file as File);
    }
  })

  const originalImage = `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1775166873/cxvbxkhrmc3507c7ubba.avif`

  const previewImage = () =>{
    setResetForm(false)
    const file = files[0]?.preview
    if(file){
      setImage(file)
      startTransition(()=>{
        mutateOptimisticImage(file)
      })
    }
    else{
      toast.error("Error previewing image")
    }
  }

  useEffect(()=>{
    if(resetForm){
      removeFile(files[0]?.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[resetForm])

  return (
    <div className="">
      {/* 2. The Dropzone Area */}
      {/* We attach the drag/drop handlers and a click handler here */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={
          profile_image
            ? `
          flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}
        `
            : "flex flex-col sm:flex-row gap-2"
        }
      >
        {profile_image ? (
          <>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">
                {isDragging ? "Drop files here!" : "Click or drag files here"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports Images and PDFs up to 5MB
              </p>
            </div>

            <input {...getInputProps()} className="hidden" />
          </>
        ) : (
          <>
            <Input
              {...getInputProps()}
              type="file"
              accept="image/*"
              // onClick={openFileDialog}
              className="cursor-pointer file:text-secondary h-15 bg-white/20 backdrop-blur-xs border-none text-white rounded-lg px-4 py-4.5 placeholder:text-white"
            />
            <Button
              type="button"
              onClick={()=> previewImage()}
              className="hover:bg-secondary border-0 h-15 cursor-pointer bg-white text-on-surface px-6 py-3 rounded-lg font-bold active:scale-95 transition-all"
            >
              Upload
            </Button>
          </>
        )}
      </div>

      {/* 4. Display Errors */}
      {errors.length > 0 && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
          {errors.map((error: string, index: number) => (
            <p key={index}>• {error}</p>
          ))}
        </div>
      )}

      {/* 5. Display Selected Files & Previews */}
      {files.length > 0 && (
        <div className="space-y-2">
          {profile_image && (
            <h3 className="font-medium text-gray-700">Selected Files:</h3>
          )}
          {files.map((fileObj) => (
            <div
              key={fileObj.id}
              className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm mt-2"
            >
              <div className="flex items-center space-x-4">
                {/* Show Image Preview if it exists */}
                {fileObj.preview &&
                fileObj.file instanceof File &&
                fileObj.file.type.startsWith("image/") ? (
                  <Image
                    width={48}
                    height={48}
                    src={fileObj.preview}
                    alt="preview"
                    className="object-cover w-12 h-12 rounded"
                  />
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded">
                    📄
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-700 truncate w-48">
                    {fileObj.file instanceof File
                      ? fileObj.file.name
                      : fileObj.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatBytes(fileObj.file.size)}
                  </p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => {
                  removeFile(fileObj.id)
                  startTransition(()=>{
                    mutateOptimisticImage(originalImage)
                    mutateOptimisticImageFile(null)
                  })
                  setImage(originalImage)
                  setImageFile(null)
                }}
                className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
