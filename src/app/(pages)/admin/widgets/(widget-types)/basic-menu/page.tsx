"use client";
import { Card, Modal, PageHeader } from "@/shared/components";
import { Button, Radio, Switch, TextField } from "@/shared/ui";
import React, { useRef, useState } from "react";
import Select from "react-select";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useParams } from "next/navigation";

type Item = {
   id: number;
   name: string;
   children?: Item[];
};

type SortableItemProps = {
   item: Item;
   children?: React.ReactNode;
};
function SortableItem({ item, children }: SortableItemProps) {
   const modalRef = useRef<any>(null);
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
   const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
   };

   const onEdit = () => {
      modalRef.current?.setIsOpen(true);
   };
   const onDelete = () => {};
   const onAddChild = () => {
      modalRef.current?.setIsOpen(true);
   };

   return (
      <div ref={setNodeRef} style={style} {...attributes} className="border border-dashed border-gray-400 p-3 mt-2.5 bg-white">
         <div className="flex justify-between items-center">
            <div className="flex justify-start gap-5">
               <button type="button" className="cursor-move" {...listeners} {...attributes}>
                  <img src="/icons/drag-icon.svg" alt="drag" />
               </button>
               <div className="text-[14px]">{item.name}</div>
            </div>
            <div className="flex justify-end gap-5 text-[14px]">
               <button className="text-[#2c6ecb]" onClick={onEdit}>
                  Edit
               </button>
               {children && (
                  <button className="text-[#2c6ecb]" onClick={onAddChild}>
                     Add child
                  </button>
               )}
               <button className="text-[#d72c0d]" onClick={onDelete}>
                  Delete
               </button>
            </div>
         </div>
         <Modal ref={modalRef} size="lg" closeable>
            <div className="p-4">
               <h3 className="font-semibold">Menu item</h3>
               <div className="mt-4">
                  <TextField label="Name" />
               </div>
               <div className="mt-4">
                  <Select
                     isMulti
                     hideSelectedOptions
                     options={[
                        { label: "Laddu Gopal > Accessories", value: "Laddu Gopal > Accessories" }, //
                        { label: "Laddu Gopal > Pagdi", value: "Laddu Gopal > Pagdi" },
                        { label: "Laddu Gopal > Accessories", value: "Contact" },
                        { label: "About", value: "about" },
                     ]}
                     onChange={(list) => {
                        let li = list?.map((list) => list?.value);
                        console.log(li);
                     }}
                  />
               </div>
               <div className="mt-4 flex justify-end">
                  <Button type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                     Save
                  </Button>
               </div>
            </div>
         </Modal>
         {children && <div className="pl-4 mt-2">{children}</div>}
      </div>
   );
}

function NestedSortableList({ parentId, items, onDragEnd }: { parentId: number; items: Item[]; onDragEnd: (event: DragEndEvent, parentId: number) => void }) {
   const sensors = useSensors(useSensor(PointerSensor));

   return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => onDragEnd(event, parentId)}>
         <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
               <SortableItem key={item.id} item={item} />
            ))}
         </SortableContext>
      </DndContext>
   );
}

export default function MenuWidgetForm() {
   const { id } = useParams();
   const modalRef = useRef<any>(null);
   const [list, setList] = useState<Item[]>([
      {
         id: 1,
         name: "Shop ❤️",
         children: [
            { id: 11, name: "Men" }, //
            { id: 22, name: "Women" },
         ],
      },
      { id: 2, name: "About us" },
   ]);
   const options = [
      { label: "All", value: "all" }, //
      { label: "catalog search page", value: "catalog search page" },
      { label: "categroy page", value: "categroy page" },
      { label: "product single page", value: "product single page" },
      { label: "cart page", value: "cart page" },
      { label: "checkout page", value: "checkout page" },
      { label: "checkout success page", value: "checkout success page" },
      { label: "static page", value: "static page" },
      { label: "home page", value: "home page" },
      { label: "not found", value: "not found" },
      { label: "static asset", value: "static asset" },
      { label: "home page", value: "home page" },
   ];

   const sensors = useSensors(useSensor(PointerSensor));

   const handleTopLevelDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = list.findIndex((item) => item.id === active.id);
      const newIndex = list.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
         setList((prev) => arrayMove(prev, oldIndex, newIndex));
      }
   };

   const handleNestedDragEnd = (event: DragEndEvent, parentId: number) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setList((prev) =>
         prev.map((item) => {
            if (item.id !== parentId || !item.children) return item;

            const oldIndex = item.children.findIndex((ch) => ch.id === active.id);
            const newIndex = item.children.findIndex((ch) => ch.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
               return {
                  ...item,
                  children: arrayMove(item.children, oldIndex, newIndex),
               };
            }
            return item;
         })
      );
   };

   return (
      <div className="p-7">
         <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
               <PageHeader //
                  backLink="/admin/widgets"
                  heading={id ? "Editing [Accessories]" : "Create a new widget"}
               />
            </div>
            <div className="col-span-8">
               <Card heading="Menu widget setting" className="p-4">
                  <div className="px-4" style={{ overflow: "hidden" }}>
                     <span className="uppercase text-[12px] font-semibold mt-5 mb-2 block">Menu Items</span>
                     <DndContext //
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleTopLevelDragEnd}>
                        <SortableContext items={list.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                           {list.map((item) => (
                              <SortableItem key={item.id} item={item}>
                                 {item.children && ( //
                                    <NestedSortableList //
                                       parentId={item.id}
                                       items={item.children}
                                       onDragEnd={handleNestedDragEnd}
                                    />
                                 )}
                              </SortableItem>
                           ))}
                        </SortableContext>
                     </DndContext>
                     <button className="text-[#2c6ecb] text-[14px] mt-3 cursor-pointer">Add menu item</button>
                  </div>
                  <hr className="my-5 border-t border-gray-300" />
                  <div className="px-4">
                     <span className="uppercase text-[12px] font-semibold mb-2 block">Setting</span>
                     <div>
                        <span className="text-[14px] block mb-1">Is Main Menu?</span>
                        <Switch eleSize="sm" />
                        <p className="text-[14px] text-[#6d7175]">Only main menu will be styled for the mobile view</p>
                     </div>
                     <div className="mt-4">
                        <TextField //
                           label="Custom CSS classes"
                           instruction="Add custom CSS classes to the menu"
                        />
                     </div>
                  </div>
               </Card>
            </div>
            <div className="col-span-4">
               <Card className="p-4">
                  <div>
                     <TextField label={<span className="uppercase text-[12px] font-semibold mb-2 block">name</span>} placeholder="Name" />
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div>
                     <span className="uppercase text-[12px] font-semibold block mb-3">Status</span>
                     <Radio label="Disabled" />
                     <div className="my-2" />
                     <Radio label="Enabled" />
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <TextField label={<span className="uppercase text-[12px] font-semibold mb-2 block">Area</span>} placeholder="Type area and press Enter..." />
                  <hr className="border-t border-gray-300 my-4" />
                  <Select
                     isMulti
                     hideSelectedOptions
                     options={options}
                     onChange={(list) => {
                        let li = list?.map((list) => list?.value);
                        console.log(li);
                     }}
                  />
                  <hr className="border-t border-gray-300 my-4" />
                  <TextField label={<span className="uppercase text-[12px] font-semibold mb-2 block">Sort Order</span>} placeholder="Sort order" />
               </Card>
            </div>
            <div className="col-span-12">
               <hr className="mb-3 border-t-1 border-[#e1e3e5]" />
               <div className="flex justify-between items-center">
                  <div>
                     <Button type="reset" className="border-2 border-[#d72c0d] py-2 px-4 text-[#d72c0d] text-[14px] rounded-sm font-semibold cursor-pointer">
                        Cancel
                     </Button>
                  </div>
                  <div>
                     <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                        Save
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
