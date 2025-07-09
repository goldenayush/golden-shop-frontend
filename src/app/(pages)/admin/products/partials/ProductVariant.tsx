import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminAttributeService } from "@/services/admin/admin-attribute.service";
import { Card, IsolationTemplate, Loading, Modal } from "@/shared/components";
import { Button, Checkbox, Select, Switch, TextField, UploadGallery } from "@/shared/ui";
import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextFieldFormik } from "@/libs/formik";
import { adminProductVariantService } from "@/services/admin/admin-product-variant.service";
import { arrayPipeline } from "@/shared/functions";

type Props = {
   variantId?: string;
   productId?: string;
};
export default function ProductVariant({ variantId, productId }: Props) {
   const [groupFields, setGroupFields] = useState({
      attributeGroupId: "",
      visibility: true,
      attributeIds: [] as string[],
      productId: productId,
   });
   const { getAllAttribute } = useAppSelector((state) => state.admin.attribute);
   const { createVariantGroup, getVariantGroups, getProductVariants, createProductVariant } = useAppSelector((state) => state.admin.adminProductVariant);
   const dispatch = useAppDispatch();
   const modalRef = useRef<any>(null);
   const refUploadGallery = useRef<any>(null);

   const onCreateVariantGroup = async () => {
      try {
         const attributesCount = ["attributeOne", "attributeTwo", "attributeThree", "attributeFour", "attributeFive"];
         const { attributeIds, ...rest } = groupFields;
         let obj: any = {};
         attributeIds.forEach((id, idx) => {
            obj[attributesCount[idx + 1]] = id;
         });
         const payload = { ...rest, ...obj };
         await dispatch(adminProductVariantService.createVariantGroup.api(payload)).unwrap();
      } catch (error) {
         return;
      }
   };

   const onCreateVariant = async (body: any) => {
      try {
         const payload = { ...body, productId, productImages: refUploadGallery.current.files };
         await dispatch(adminProductVariantService.createProductVariant.api(payload)).unwrap();
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      dispatch(adminAttributeService.getAllAttribute.api());
      return () => { };
   }, []);

   useEffect(() => {
      if (variantId) {
         dispatch(adminProductVariantService.getVariantGroups.api(variantId));
      }
      return () => { };
   }, [variantId]);

   // if (getAllAttribute.isLoading || getVariantGroups.isLoading) {
   if (getAllAttribute.isLoading) {
      return <Loading className="bg-white h-[150px] mt-3" />;
   }
   const selectedGroups = [
      getVariantGroups.data?.attributeOne,
      getVariantGroups.data?.attributeTwo,
      getVariantGroups.data?.attributeThree,
      getVariantGroups.data?.attributeFour,
      getVariantGroups.data?.attributeFive,
   ];

   const [groupsCols] = arrayPipeline({
      input: getAllAttribute.data || [],
      filter: (attr) => selectedGroups.includes(attr.id),
      map: {
         matched({ id, attributeCode, attributeName, attributeOption, ..._ }) {
            return { id, attributeCode, attributeName, attributeOption } as any;
         },
      },
   });

   return (
      <Card className="py-4 mt-3">
         <div className="px-4 mb-3">
            <h3 className="text-[16px] font-semibold">Variant</h3>
         </div>
         {!variantId ? (
            <IsolationTemplate vars={{ isShow: false }}>
               {(vars, set) => (
                  <React.Fragment>
                     {!vars.isShow ? (
                        <p className="text-[14px] text-[#202223] text-center my-6">
                           This product has some variants like color or size?{" "}
                           <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => set({ isShow: true })}>
                              Create a variant group
                           </span>
                        </p>
                     ) : (
                        <>
                           <div className="px-4">
                              <p>Select the list of attribute</p>
                              <div className="my-2">
                                 {getAllAttribute.data?.map((attribute) => {
                                    const attributeGroupId = attribute.AttributeGroupAttribute[0].attributeGroupId;
                                    return (
                                       <Checkbox
                                          key={attribute.id}
                                          id={attribute.id}
                                          label={attribute.attributeName}
                                          value={attribute.id}
                                          className="mb-2"
                                          checked={groupFields.attributeIds.includes(attribute?.id)}
                                          onChange={(e) => {
                                             const { checked, value } = e.target;
                                             setGroupFields((prev) => {
                                                const ids = prev.attributeIds;
                                                return {
                                                   ...prev,
                                                   attributeGroupId: attributeGroupId,
                                                   visibility: true,
                                                   attributeIds: checked //
                                                      ? [...ids, value]
                                                      : ids.filter((x) => x !== value),
                                                };
                                             });
                                          }}
                                       />
                                    );
                                 })}
                              </div>
                           </div>
                           <Button //
                              type="button"
                              className="text-[14px] text-blue-400 cursor-pointer ml-4"
                              onClick={onCreateVariantGroup}
                              loading={createVariantGroup.isLoading}
                              disabled={!groupFields?.attributeIds?.length}>
                              Create
                           </Button>
                           <hr className="my-2" />
                           <button type="button" className="text-[14px] text-red-400 cursor-pointer ml-4" onClick={() => set({ isShow: false })}>
                              Cancel
                           </button>
                        </>
                     )}
                  </React.Fragment>
               )}
            </IsolationTemplate>
         ) : (
            <React.Fragment>
               <div className="px-4 overflow-x-auto">
                  <table className="min-w-full table-auto">
                     <thead>
                        <tr className="font-semibold text-gray-800">
                           <th className="p-1 text-left text-sm border border-gray-400">Image</th>
                           {groupsCols?.map((item) => (
                              <React.Fragment key={item.id}>
                                 <th className="p-1 text-left text-sm border border-gray-400">{item.attributeName}</th>
                              </React.Fragment>
                           ))}
                           <th className="p-1 text-left text-sm border border-gray-400">SKU</th>
                           <th className="p-1 text-left text-sm border border-gray-400">Price</th>
                           <th className="p-1 text-left text-sm border border-gray-400">Stock</th>
                           <th className="p-1 text-left text-sm border border-gray-400">Status</th>
                           <th className="p-1 text-left text-sm border border-gray-400">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className="text-[14px]">
                           <td className="p-1 border border-gray-400">
                              <img src="http://admin.mrvcreations.in/assets/catalog/9402/6527/acceseries39.png" alt="Product" className="h-8 w-8 object-cover rounded" />
                           </td>
                           <td className="p-1 text-gray-700 border border-gray-400">Black</td>
                           <td className="p-1 text-gray-700 border border-gray-400">M</td>
                           <td className="p-1 text-gray-700 border border-gray-400">Cotton</td>
                           <td className="p-1 text-gray-700 border border-gray-400">Casual</td>
                           <td className="p-1 text-gray-700 border border-gray-400">SKU12</td>
                           <td className="p-1 text-gray-700 border border-gray-400">$29.99</td>
                           <td className="p-1 text-gray-700 border border-gray-400">120</td>
                           <td className="p-1 text-green-600 border border-gray-400">Active</td>
                           <td className="p-1 text-gray-700 border border-gray-400">
                              <div className="flex gap-2">
                                 <button type="button" className="py-1 px-3 border border-gray-400 cursor-pointer" onClick={() => modalRef.current.setIsOpen(true)}>
                                    Edit
                                 </button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <div className="mt-3">
                     <Button type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" onClick={() => modalRef.current.setIsOpen(true)}>
                        Add Variant
                     </Button>
                     <Modal ref={modalRef} size="xl" title="Create a new variant" className="p-3">
                        <Formik
                           initialValues={{
                              qty: null,
                              price: null,
                              sku: "",
                              status: false,
                              visibility: false,
                              ProductAttributeValueIndex: [] as {
                                 attributeId: string;
                                 optionText: string;
                              }[],
                           }}
                           onSubmit={onCreateVariant}>
                           {(formik) => (
                              <Form className="grid grid-cols-12">
                                 <div className="col-span-12 md:col-span-6">
                                    <UploadGallery //
                                       ref={refUploadGallery}
                                       initialvalue={[]}
                                       size="sm"
                                       id="product-variant"
                                    />
                                 </div>
                                 <div className="col-span-12 md:col-span-6">
                                    <div className="grid grid-cols-12 gap-2">
                                       {groupsCols.map((option, idx) => (
                                          <div key={`v-options-${idx}`} className="col-span-6">
                                             <Select
                                                name={option.attributeCode}
                                                label={option.attributeName}
                                                placeholder="please select"
                                                options={option.attributeOption?.map((x) => ({
                                                   value: `${x?.id}:${x?.optionText}`,
                                                   label: x?.optionText,
                                                }))}
                                                required={option.isRequired}
                                                onChange={(e) => {
                                                   const [value, label] = e.target.value.split(":");
                                                   const attributeId = `ProductAttributeValueIndex.${idx}.attributeId`;
                                                   const optionText = `ProductAttributeValueIndex.${idx}.optionText`;
                                                   formik.setFieldValue(attributeId, value);
                                                   formik.setFieldValue(optionText, label);
                                                }}
                                             />
                                          </div>
                                       ))}
                                       <div className="col-span-12">
                                          <hr className="border-t border-gray-400 my-3" />
                                       </div>
                                       <div className="col-span-4">
                                          <TextFieldFormik label="SKU" name="sku" />
                                       </div>
                                       <div className="col-span-4">
                                          <TextFieldFormik type="number" label="Qty" name="qty" />
                                       </div>
                                       <div className="col-span-4">
                                          <TextFieldFormik type="number" label="Price" name="price" />
                                       </div>
                                       <div className="col-span-12">
                                          <hr className="border-t border-gray-400 my-3" />
                                       </div>
                                       <div className="col-span-4">
                                          <Switch //
                                             label="Status"
                                             name="status"
                                             value={true as any}
                                             checked={formik.values.status}
                                             onChange={(e) => {
                                                formik.setFieldValue("status", e.target.checked);
                                             }}
                                          />
                                       </div>
                                       <div className="col-span-4">
                                          <Switch //
                                             label="Visibility"
                                             name="visibility"
                                             value={true as any}
                                             checked={formik.values.visibility}
                                             onChange={(e) => {
                                                formik.setFieldValue("visibility", e.target.checked);
                                             }}
                                          />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-span-12">
                                    <hr className="border-t border-gray-400 my-4" />
                                 </div>
                                 <div className="col-span-12 flex justify-end gap-2">
                                    <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={createProductVariant.isLoading}>
                                       Create
                                    </Button>
                                    <button
                                       type="button"
                                       className="py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer border border-gray-500"
                                       onClick={() => modalRef.current.setIsOpen(false)}>
                                       Cancel
                                    </button>
                                 </div>
                              </Form>
                           )}
                        </Formik>
                     </Modal>
                  </div>
               </div>
            </React.Fragment>
         )}
      </Card>
   );
}
