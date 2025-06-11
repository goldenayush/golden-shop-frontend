import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminAttributeService } from "@/services/admin/admin-attribute.service";
import { Card, IsolationTemplate, Loading, Modal2 } from "@/shared/components";
import { Button, Checkbox } from "@/shared/ui";
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
      <Card className="py-4 mt-3">
         <div className="px-4 mb-3">
            <h3 className="text-[16px] font-semibold">Variant</h3>
         </div>
         <React.Fragment>
            <p className="text-[14px] text-[#202223] text-center my-6">
               This product has some variants like color or size? <span className="text-blue-500 hover:underline cursor-pointer">Create a variant group</span>
            </p>
         </React.Fragment>
         <React.Fragment>
            <div className="px-4">
               <p>Select the list of attribute</p>
               <div className="my-2">
                  {getAllAttribute.data?.map((attribute) => (
                     <Checkbox //
                        key={attribute.id}
                        id={attribute.id}
                        label={attribute.attributeName}
                        className="mb-2"
                     />
                  ))}
               </div>
            </div>
            <button type="button" className="text-[14px] text-blue-400 cursor-pointer ml-4">
               Create
            </button>
            <hr className="my-2" />
            <button type="button" className="text-[14px] text-red-400 cursor-pointer ml-4">
               Cancel
            </button>
         </React.Fragment>
         <React.Fragment>
            <div className="px-4 overflow-x-auto">
               <table className="min-w-full table-auto">
                  <thead>
                     <tr className="font-semibold text-gray-800 border-gray-500">
                        <th className="p-1 text-left text-sm border-1">Image</th>
                        <th className="p-1 text-left text-sm border-1">Color</th>
                        <th className="p-1 text-left text-sm border-1">Size</th>
                        <th className="p-1 text-left text-sm border-1">Material</th>
                        <th className="p-1 text-left text-sm border-1">Ocassion</th>
                        <th className="p-1 text-left text-sm border-1">SKU</th>
                        <th className="p-1 text-left text-sm border-1">Price</th>
                        <th className="p-1 text-left text-sm border-1">Stock</th>
                        <th className="p-1 text-left text-sm border-1">Status</th>
                        <th className="p-1 text-left text-sm border-1">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className="p-2">
                           <img src="http://admin.mrvcreations.in/assets/catalog/9402/6527/acceseries39.png" alt="Product" className="h-12 w-12 object-cover rounded" />
                        </td>
                        <td className="p-2 text-sm text-gray-700">Red</td>
                        <td className="p-2 text-sm text-gray-700">M</td>
                        <td className="p-2 text-sm text-gray-700">Cotton</td>
                        <td className="p-2 text-sm text-gray-700">Casual</td>
                        <td className="p-2 text-sm text-gray-700">SKU12</td>
                        <td className="p-2 text-sm text-gray-700">$29.99</td>
                        <td className="p-2 text-sm text-gray-700">120</td>
                        <td className="p-2 text-sm text-green-600">Active</td>
                        <td className="p-2 text-sm text-gray-700">
                           <div className="flex gap-2">
                              <Modal2
                                 Trigger={(props) => (
                                    <button type="button" className="text-blue-500 hover:underline cursor-pointer" onClick={props.onOpen}>
                                       Edit
                                    </button>
                                 )}
                                 Content={(props) => (
                                    <div>
                                       <button type="button" onClick={props.onClose}>
                                          onClose
                                       </button>
                                    </div>
                                 )}
                              />

                              <button type="button" className="text-red-500 hover:underline cursor-pointer">
                                 Delete
                              </button>
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <div className="mt-3">
                  <Modal2
                     Trigger={(props) => (
                        <Button type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" onClick={props.onOpen}>
                           Add Variant
                        </Button>
                     )}
                     Content={(props) => (
                        <div>
                           <button type="button" onClick={props.onClose}>
                              onClose
                           </button>
                        </div>
                     )}
                  />
               </div>
            </div>
         </React.Fragment>
      </Card>
   );
}
