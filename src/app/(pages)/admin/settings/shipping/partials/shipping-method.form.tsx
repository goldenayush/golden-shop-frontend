"use client";
import { TextFieldFormik } from "@/libs/formik";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminShippingSettingService } from "@/services/admin/admin-shipping-setting.service";
import { Card, Modal, IsolationTemplate } from "@/shared/components";
import { Button, Radio, Switch, TextField } from "@/shared/ui";
import { IShippingZoneMethod } from "@/types/shipping-zone.type";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ReactSelect from "react-select/creatable";

type Props = {
   patchValue?: IShippingZoneMethod;
   onSubmit: (body: any, callback: () => void) => void;
   loading?: boolean;
   Component: React.ComponentType<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>;
};
export default function ShippingMethodForm({ patchValue, onSubmit, loading, Component }: Props) {
   const modalRef = useRef<any>(null);
   const dispatch = useAppDispatch();
   const { createMethoodName, getMethoodNames, updateMethoodName } = useAppSelector((state) => state.admin.adminShippingSetting);
   const [fields, setFields] = useState({
      methodId: "",
      isEnabled: false,
      conditionType: "" as "cost" | "weightBased" | "priceBased" | "calculationApi",
      min: null,
      max: null,
      setupShippingCost: "",
      calculationApi: null,
      cost: null,
      priceBasedCost: [],
      weightBasedCost: [],
   });

   const onUpdateMethoodName = async (value: string, methodId: string) => {
      try {
         await dispatch(
            adminShippingSettingService.updateMethoodName.api({
               name: value,
               id: methodId,
            })
         ).unwrap();
         await dispatch(adminShippingSettingService.getShippingZones.api()).unwrap();
      } catch (error) {
         return;
      }
   };

   const onCreateOption = async (value: string) => {
      try {
         await dispatch(adminShippingSettingService.createMethoodName.api(value)).unwrap();
         dispatch(adminShippingSettingService.getMethoodNames.api());
      } catch (error) {
         return;
      }
   };

   const handleFormSubmit = (value: any) => {
      const { setupShippingCost, priceBasedCost, weightBasedCost, calculationApi, cost, name, ...rest } = value;
      const payload = {
         ...rest,
         priceBasedCost: setupShippingCost === "priceBasedCost" ? priceBasedCost : null,
         weightBasedCost: setupShippingCost === "weightBasedCost" ? weightBasedCost : null,
         calculationApi: setupShippingCost === "calculationApi" ? calculationApi : null,
         cost: setupShippingCost === "cost" ? cost : null,
      };
      onSubmit(payload, () => modalRef.current.setIsOpen(false));
   };

   useEffect(() => {
      dispatch(adminShippingSettingService.getMethoodNames.api());
      return () => {};
   }, []);

   useEffect(() => {
      if (patchValue) {
         let name = "";
         if (patchValue.calculationApi) {
            name = "calculationApi";
         }
         if (patchValue.cost) {
            name = "cost";
         }
         if (patchValue.priceBasedCost) {
            name = "priceBasedCost";
         }
         if (patchValue.weightBasedCost) {
            name = "weightBasedCost";
         }

         setFields({
            id: patchValue.id,
            methodId: patchValue.methodId,
            zoneId: patchValue.zoneId,
            name: patchValue.name,
            isEnabled: patchValue.isEnabled,
            //condition
            conditionType: patchValue.conditionType,
            min: patchValue?.min,
            max: patchValue?.max,
            //Setup shipping cost
            cost: patchValue?.cost,
            priceBasedCost: patchValue?.priceBasedCost,
            weightBasedCost: patchValue?.weightBasedCost,
            calculationApi: patchValue.calculationApi,
            setupShippingCost: name,
         } as any);
      }
      return () => {};
   }, [patchValue]);

   return (
      <>
         <Component onClick={() => modalRef.current.setIsOpen(true)} />
         <Modal size="lg" ref={modalRef}>
            <Formik enableReinitialize={Boolean(patchValue)} initialValues={fields} onSubmit={handleFormSubmit}>
               {(formik) => (
                  <Form>
                     <Card heading={<span className="pl-5">Shipping method</span>} className="py-4">
                        {Boolean(patchValue) ? (
                           <IsolationTemplate vars={{ isEdit: false }}>
                              {(vars, set) => (
                                 <div className="px-5 flex items-end gap-3 w-full mt-7">
                                    <div>
                                       <span className="text-[12px] uppercase font-semibold block mb-3">Method name</span>
                                       <TextFieldFormik //
                                          placeholder="Method name"
                                          className="min-w-[250px]"
                                          name="name"
                                          disabled={!vars.isEdit}
                                          suffixIcon={
                                             <button type="button" className="text-blue-500 text-[14px] cursor-pointer" onClick={() => set({ isEdit: !vars.isEdit })}>
                                                {vars.isEdit ? "Cancel" : "Edit"}
                                             </button>
                                          }
                                       />
                                    </div>
                                    {vars.isEdit && (
                                       <Button
                                          type="button"
                                          className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer"
                                          onClick={() => {
                                             onUpdateMethoodName((formik.values as any)?.name, patchValue?.methodId as string);
                                          }}
                                          loading={updateMethoodName.isLoading}>
                                          Save
                                       </Button>
                                    )}
                                 </div>
                              )}
                           </IsolationTemplate>
                        ) : (
                           <div className="px-5">
                              <ReactSelect
                                 isClearable
                                 name="methodId"
                                 isLoading={createMethoodName.isLoading || getMethoodNames.isLoading}
                                 options={
                                    getMethoodNames?.data?.map((ele) => ({
                                       label: ele?.name,
                                       value: ele?.id,
                                    })) || []
                                 }
                                 onCreateOption={onCreateOption}
                                 onChange={(e) => {
                                    formik.setFieldValue("methodId", e?.value);
                                 }}
                              />
                           </div>
                        )}
                        <div className="px-5 my-4">
                           <span className="block text-[14px]">Status</span>
                           <Switch
                              eleSize="sm"
                              checked={formik.values.isEnabled}
                              value={formik.values.isEnabled as any}
                              onChange={(e) => {
                                 formik.setFieldValue("isEnabled", e.target.checked);
                              }}
                           />
                        </div>
                        <hr className="border-t border-gray-200 block" />
                        <div className="px-5 my-4">
                           <span className="text-[12px] uppercase font-semibold block mb-3">Setup shipping cost</span>
                           <div className="grid grid-cols-1 gap-2">
                              <Field
                                 as={Radio} //
                                 label="Flat rate"
                                 name="setupShippingCost"
                                 value="cost"
                                 checked={formik.values.setupShippingCost === "cost"}
                              />
                              <Field
                                 as={Radio} //
                                 label="Price based rate"
                                 name="setupShippingCost"
                                 value="priceBasedCost"
                                 checked={formik.values.setupShippingCost === "priceBasedCost"}
                              />
                              <Field
                                 as={Radio} //
                                 label="Weight based rate"
                                 name="setupShippingCost"
                                 value="weightBasedCost"
                                 checked={formik.values.setupShippingCost === "weightBasedCost"}
                              />
                              <Field
                                 as={Radio} //
                                 label="API calculate"
                                 name="setupShippingCost"
                                 value="calculationApi"
                                 checked={formik.values.setupShippingCost === "calculationApi"}
                              />
                           </div>
                           <div className="mt-3">
                              {/* Flat rate */}
                              {formik.values.setupShippingCost === "cost" && (
                                 <TextFieldFormik //
                                    type="number"
                                    placeholder="Shipping cost"
                                    name="cost"
                                 />
                              )}
                              {/* Price based rate */}
                              {formik.values.setupShippingCost === "priceBasedCost" && (
                                 <table className="min-w-full rounded-lg text-[14px]">
                                    <thead className="border-b border-gray-300">
                                       <tr>
                                          <th className="text-left py-2 px-4">Min Price</th>
                                          <th className="text-left py-2 px-4">Shipping Cost</th>
                                          <th className="text-left py-2 px-4">Action</th>
                                       </tr>
                                    </thead>
                                    <FieldArray
                                       name="priceBasedCost"
                                       render={(helper) => (
                                          <tbody>
                                             {formik?.values?.priceBasedCost?.map((item: any, idx: number) => (
                                                <tr key={`priceBasedCost-${idx}`}>
                                                   <th className="text-left py-2 px-4 font-normal">
                                                      <TextFieldFormik //
                                                         type="number"
                                                         placeholder="Min Price"
                                                         name={`priceBasedCost.${idx}.minPrice`}
                                                      />
                                                   </th>
                                                   <th className="text-left py-2 px-4 font-normal">
                                                      <TextFieldFormik //
                                                         type="number"
                                                         name={`priceBasedCost.${idx}.cost`}
                                                         placeholder="Shipping Cost"
                                                      />
                                                   </th>
                                                   <th className="text-left py-2 px-4">
                                                      <button type="button" className="text-[14px] text-red-500 font-normal cursor-pointer" onClick={() => helper.remove(idx)}>
                                                         Delete
                                                      </button>
                                                   </th>
                                                </tr>
                                             ))}

                                             <tr>
                                                <th colSpan={7} scope="col" className="text-start mb-3">
                                                   <button type="button" className="text-blue-500 font-normal cursor-pointer" onClick={() => helper.push({})}>
                                                      + Add Line
                                                   </button>
                                                </th>
                                             </tr>
                                          </tbody>
                                       )}
                                    />
                                 </table>
                              )}

                              {/* Weight based rate */}
                              {formik.values.setupShippingCost === "weightBasedCost" && (
                                 <table className="min-w-full rounded-lg text-[14px]">
                                    <thead className="border-b border-gray-300">
                                       <tr>
                                          <th className="text-left py-2 px-4">Min Weight</th>
                                          <th className="text-left py-2 px-4">Shipping Cost</th>
                                          <th className="text-left py-2 px-4">Action</th>
                                       </tr>
                                    </thead>
                                    <FieldArray
                                       name="weightBasedCost"
                                       render={(helper) => (
                                          <tbody>
                                             {formik?.values?.weightBasedCost?.map((item: any, idx: number) => (
                                                <tr key={`weightBasedCost-${idx}`}>
                                                   <th className="text-left py-2 px-4 font-normal">
                                                      <TextFieldFormik //
                                                         type="number"
                                                         placeholder="Min Weight"
                                                         name={`weightBasedCost.${idx}.minWeight`}
                                                      />
                                                   </th>
                                                   <th className="text-left py-2 px-4 font-normal">
                                                      <TextFieldFormik //
                                                         type="number"
                                                         name={`weightBasedCost.${idx}.cost`}
                                                         placeholder="Shipping Cost"
                                                      />
                                                   </th>
                                                   <th className="text-left py-2 px-4">
                                                      <button type="button" className="text-[14px] text-red-500 font-normal cursor-pointer" onClick={() => helper.remove(idx)}>
                                                         Delete
                                                      </button>
                                                   </th>
                                                </tr>
                                             ))}

                                             <tr>
                                                <th colSpan={7} scope="col" className="text-start mb-3">
                                                   <button type="button" className="text-blue-500 font-normal cursor-pointer" onClick={() => helper.push({})}>
                                                      + Add Line
                                                   </button>
                                                </th>
                                             </tr>
                                          </tbody>
                                       )}
                                    />
                                 </table>
                              )}

                              {/* api_calculate */}
                              {formik.values.setupShippingCost === "calculationApi" && (
                                 <TextFieldFormik //
                                    name="calculationApi"
                                    placeholder="Calculate API endpoint"
                                    instruction="This API will be called to calculate shipping cost. It supposed to return a number"
                                 />
                              )}
                           </div>
                           <div className="mt-3">
                              {!formik.values?.conditionType ? (
                                 <button
                                    type="button"
                                    className="text-blue-500 text-[14px] cursor-pointer my-3"
                                    onClick={() => {
                                       formik.setFieldValue("conditionType", "priceBased");
                                    }}>
                                    Add condition
                                 </button>
                              ) : (
                                 <div>
                                    <button
                                       type="button"
                                       className="text-blue-500 text-[14px] cursor-pointer"
                                       onClick={() => {
                                          formik.setFieldValue("conditionType", "");
                                          formik.setFieldValue("min", null);
                                          formik.setFieldValue("max", null);
                                       }}>
                                       Remove condition
                                    </button>
                                    <div className="grid grid-cols-1 gap-2 mt-2">
                                       <Field
                                          as={Radio} //
                                          label="Based on order price"
                                          name="conditionType"
                                          value="priceBased"
                                          checked={formik.values.conditionType === "priceBased"}
                                       />
                                       <Field
                                          as={Radio} //
                                          label="Based on order weight"
                                          name="conditionType"
                                          value="weightBased"
                                          checked={formik.values.conditionType === "weightBased"}
                                       />
                                    </div>
                                    {formik.values.conditionType === "priceBased" && (
                                       <div className="grid grid-cols-2 gap-2 mt-3">
                                          <div>
                                             <TextFieldFormik //
                                                type="number"
                                                name="min"
                                                label={`Minimum order price`}
                                                placeholder={`Minimum order price`}
                                                required
                                             />
                                          </div>
                                          <div>
                                             <TextFieldFormik //
                                                type="number"
                                                name="max"
                                                label={`Maximum order price`}
                                                placeholder={`Minimum order price`}
                                                required
                                             />
                                          </div>
                                       </div>
                                    )}
                                    {formik.values.conditionType === "weightBased" && (
                                       <div className="grid grid-cols-2 gap-2 mt-3">
                                          <div>
                                             <TextFieldFormik //
                                                type="number"
                                                name="min"
                                                label={`Minimum order weight`}
                                                placeholder={`Minimum order weight`}
                                             />
                                          </div>
                                          <div>
                                             <TextFieldFormik //
                                                type="number"
                                                name="max"
                                                label={`Maximum order weight`}
                                                placeholder={`Minimum order weight`}
                                             />
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              )}

                              <hr className="border-t border-gray-200 block" />
                              <div className="mt-5 flex justify-end gap-2">
                                 <button
                                    type="button"
                                    className="bg-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer border border-gray-300"
                                    onClick={() => modalRef.current.setIsOpen(false)}>
                                    Cancel
                                 </button>
                                 <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={loading}>
                                    Save
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </Card>
                  </Form>
               )}
            </Formik>
         </Modal>
      </>
   );
}
