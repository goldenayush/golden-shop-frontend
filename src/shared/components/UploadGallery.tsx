import { IProductImage } from "@/types/product.type";
import React, { useState, useCallback, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaCamera } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const ItemType = "IMAGE";

const SIZE_TYPE = {
   sm: "auto-rows-[70px]",
   md: "auto-rows-[100px]",
   lg: "auto-rows-[150px]",
   xl: "auto-rows-[200px]",
} as const;

type Props = {
   initialvalue: IProductImage[] | File[];
   size: keyof typeof SIZE_TYPE;
   id: string;
};

type DragItem = {
   index: number;
   type: string;
};

const DraggableImage = ({ file, index, moveImage, onDelete, isMain }: any) => {
   const ref = useRef<HTMLDivElement>(null);

   const [, drop] = useDrop({
      accept: ItemType,
      hover(item: DragItem) {
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

   const src = file?.id ? file?.originImage : URL.createObjectURL(file);
   return (
      <div ref={ref} className={`relative ${isMain ? "col-span-2 row-span-2" : ""} transition-all duration-300`} style={{ opacity: isDragging ? 0.5 : 1 }}>
         <RiDeleteBinLine //
            className="absolute top-2 right-2 text-red-500 cursor-pointer"
            onClick={() => onDelete(index)}
         />
         <img //
            src={src}
            crossOrigin="anonymous"
            className="w-full h-full object-cover rounded"
            alt={`Uploaded ${index}`}
         />
      </div>
   );
};

export const UploadGallery = forwardRef(({ initialvalue, size, id }: Props, ref) => {
   const [files, setFiles] = useState<any[]>([]);
   useImperativeHandle(
      ref,
      () => ({
         files: files.map((item, idx) => {
            if (item?.id) {
               const { id, ...res } = item;
               return {
                  ...res,
                  isMain: idx === 0,
               };
            } else {
               return {
                  file: item,
                  isMain: idx === 0,
               };
            }
         }),
      }),
      [files]
   );

   const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
   };

   const moveImage = useCallback((from: number, to: number) => {
      setFiles((prev) => {
         const updated = [...prev];
         const [moved] = updated.splice(from, 1);
         updated.splice(to, 0, moved);
         return updated;
      });
   }, []);

   const handleDelete = (idx: number) => {
      setFiles((prev) => {
         const filtered = prev.filter((_, i) => i !== idx);
         return filtered;
      });
   };

   useEffect(() => {
      if (initialvalue?.length) setFiles(initialvalue);
      return () => {};
   }, [initialvalue]);

   let css = SIZE_TYPE[size];
   return (
      <DndProvider backend={HTML5Backend}>
         <div>
            <div className={`grid grid-cols-4 gap-4 p-4 ${css}`}>
               {files.map((file, idx) => (
                  <DraggableImage //
                     key={idx}
                     file={file}
                     index={idx}
                     moveImage={moveImage}
                     onDelete={handleDelete}
                     isMain={idx === 0}
                  />
               ))}
               <label htmlFor={id} className="col-span-1 border-[2px] border-[#e1e1e1] border-dashed p-5 flex justify-center items-center min-h-[60px] cursor-pointer">
                  <input //
                     type="file"
                     id={id}
                     multiple
                     onChange={handleAddFiles}
                     accept="image/*"
                     className="mt-4"
                     hidden
                  />
                  <FaCamera size={24} color="#058c8c" />
               </label>
            </div>
         </div>
      </DndProvider>
   );
});
