import React from "react";
import { useState } from "react";

export function useFileUpload() {
   const [files, setFiles] = useState<File[]>([]);
   const [error, setError] = useState<string | null>(null);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         console.log(Array.from(e.target.files));
         setFiles([...files, ...Array.from(e.target.files)]);
         setError(null);
      }
   };

   const deleteFile = (i: number) => {
      setFiles(files.filter((_, idx) => idx !== i));
   };
   const uploadFiles = () => {
      console.log(files);
   };

   return {
      files,
      error,
      handleFileChange,
      deleteFile,
      uploadFiles,
   };
}
