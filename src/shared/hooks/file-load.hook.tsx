import React from "react";
import { useState } from "react";

type Props = {
   multi?: boolean;
};
export function useFileUpload({ multi }: Props) {
   const [files, setFiles] = useState<File[]>([]);
   const [error, setError] = useState<string | null>(null);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         console.log(Array.from(e.target.files));
         if (multi) {
            setFiles([...files, ...Array.from(e.target.files)]);
            setError(null);
         } else {
            setFiles(Array.from(e.target.files));
            setError(null);
         }
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
