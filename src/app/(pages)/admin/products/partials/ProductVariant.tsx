import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminAttributeService } from "@/services/admin/admin-attribute.service";
import { Card, IsolationTemplate, Loading } from "@/shared/components";
import { Checkbox } from "@/shared/ui";
import React, { useEffect } from "react";
type Props = {};
export default function ProductVariant({}: Props) {
   const { getAllAttribute } = useAppSelector((state) => state.admin.attribute);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(adminAttributeService.getAllAttribute.api());
      return () => {};
   }, []);

   if (getAllAttribute.isLoading) {
      return <Loading className="bg-white h-[150px] mt-3" />;
   }

   return (
      <Card className="p-4 mt-3" heading="Variant">
         <IsolationTemplate
            vars={{
               isVariantGroup: false,
               groups: [] as string[],
               isCreate: false,
            }}>
            {(vars, set) => (
               <React.Fragment>
                  {vars.isCreate ? "sss" : ""}
                  {vars.isVariantGroup ? (
                     <div>
                        <p className="mt-3">Select the list of attribute</p>
                        <div className="my-2">
                           {getAllAttribute.data?.map((attribute) => (
                              <Checkbox //
                                 key={attribute.id}
                                 id={attribute.id}
                                 label={attribute.attributeName}
                                 className="mb-2"
                                 onChange={(e) => {
                                    set({
                                       groups: [...vars.groups, attribute.attributeName],
                                    });
                                 }}
                              />
                           ))}
                        </div>
                        <div className="flex gap-3">
                           <button type="button" className="text-[14px] text-blue-400 cursor-pointer" onClick={() => set({ isCreate: true })}>
                              Create
                           </button>
                           <button type="button" className="text-[14px] text-red-400 cursor-pointer" onClick={() => set({ isVariantGroup: false })}>
                              Cancel
                           </button>
                        </div>
                     </div>
                  ) : (
                     <p className="text-[14px] text-[#202223] text-center my-6">
                        This product has some variants like color or size?{" "}
                        <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => set({ isVariantGroup: true })}>
                           Create a variant group
                        </span>
                     </p>
                  )}
               </React.Fragment>
            )}
         </IsolationTemplate>
      </Card>
   );
}
