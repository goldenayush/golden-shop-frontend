"use client";
import { useFileUpload } from "@/shared/hooks";
import { IProductImage } from "@/types/product.type";
import React, { useState, useCallback, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaCamera } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const ItemType = "IMAGE";

function DraggableImage({ img, index, moveImage, onDelete, isMain }: any) {
   const ref = React.useRef<HTMLDivElement>(null);

   const [, drop] = useDrop({
      accept: ItemType,
      hover(item: any) {
         if (!ref.current || item.index === index) return;
         moveImage(item.index, index);
         item.index = index;
      },
   });

   const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { index },
      collect: (monitor) => ({
         isDragging: monitor.isDragging(),
      }),
   });

   drag(drop(ref));

   const containerClasses = `
      transition-all duration-300 ease-in-out 
      will-change-transform
      ${isMain ? "col-span-2 row-span-2" : ""}
      relative bg-gray-100 rounded overflow-hidden
      ${isDragging ? "opacity-30 scale-95" : "opacity-100 scale-100"}
   `;

   return (
      <div ref={ref} className={containerClasses}>
         <img crossOrigin="anonymous" src={img.src} alt="" className="w-full h-full object-cover rounded transition-all duration-300" />
         {!isMain && (
            <RiDeleteBinLine //
               className="absolute top-2 left-2 text-red-500 cursor-pointer"
               onClick={() => onDelete(index)}
            />
         )}
         {isMain && ( //
            <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow">Main Image</span>
         )}
      </div>
   );
}

type Props = {
   initialImages: IProductImage[] & { raw?: File }[];
   getData: (data: any[]) => void;
};

export default function UploadGrid({ initialImages, getData }: Props, ref: any) {
   const [images, setImages] = useState(() => {
      return initialImages
         .sort((a, b) => (b.isMain ? 1 : -1))
         .map((img, i) => {
            return { ...img, isMain: i === 0 };
         });
   });
   getData(images);
   const upload = useFileUpload({ multi: true });

   const moveImage = useCallback((fromIndex: number, toIndex: number) => {
      setImages((prevImages) => {
         const updated = [...prevImages];
         const [movedItem] = updated.splice(fromIndex, 1);
         updated.splice(toIndex, 0, movedItem);
         return updated.map((img, i) => ({
            ...img,
            isMain: i === 0,
         }));
      });
   }, []);

   const handleDelete = (idx: number) => {
      if (idx === 0) return; // Prevent deleting main image
      setImages((prev) => {
         const filtered = prev.filter((_, i) => i !== idx);
         return filtered.map((img, i) => ({
            ...img,
            isMain: i === 0,
         }));
      });
   };

   useEffect(() => {
      if (upload.files?.length) {
         setImages((prev: any) => {
            let files = upload.files.map((file) => ({
               src: URL.createObjectURL(file),
               raw: file,
            }));
            const combined = [...prev, ...files];
            return combined.map((img, i) => ({
               ...img,
               isMain: i === 0,
            }));
         });
      }

      return () => {};
   }, [upload.files]);

   return (
      <DndProvider backend={HTML5Backend}>
         <div className="grid grid-cols-4 gap-4 p-4 auto-rows-[150px]">
            {images.map((img, index) => (
               <DraggableImage //
                  key={img.id}
                  img={img}
                  index={index}
                  moveImage={moveImage}
                  onDelete={handleDelete}
                  isMain={index === 0}
               />
            ))}
            <label htmlFor="mediaUpload" className="col-span-1 border-[2px] border-[#e1e1e1] border-dashed p-5 flex justify-center items-center min-h-[150px] cursor-pointer">
               <input //
                  type="file"
                  id="mediaUpload"
                  onChange={upload.handleFileChange}
                  multiple
                  hidden
               />
               <FaCamera size={24} color="#058c8c" />
            </label>
         </div>
      </DndProvider>
   );
}
