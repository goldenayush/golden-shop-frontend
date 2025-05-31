"use client";
import { Card, Loading } from "@/shared/components";
import { Button, Switch, TextField } from "@/shared/ui";
import React from "react";
import GridDisplay from "../../components/GridDisplay";
import useShippingApiController from "./shipping-api.controller";
import { Form, Formik } from "formik";
import { TextFieldFormik } from "@/libs/formik";

export default function ShippingApiPage() {
   const ctrl = useShippingApiController();
   if (ctrl.isFetching) {
      return <Loading className="h-[70vh] text-xl" />;
   }
   return (
      <Formik enableReinitialize initialValues={ctrl.fields} onSubmit={ctrl.onSubmit}>
         {(formik) => {
            const values = formik.values;
            return (
               <Form>
                  <Card className="py-4 mt-3" heading={<span className="pl-3">Shipping Api Setting</span>}>
                     <GridDisplay //
                        title="Enable?"
                        content={
                           <Switch
                              eleSize="sm"
                              checked={values?.api?.apiShippingStatus === "true"}
                              onChange={(e) => {
                                 formik.setFieldValue("api.apiShippingStatus", JSON.stringify(e.target.checked));
                              }}
                           />
                        }
                        hr
                     />
                     <GridDisplay //
                        title="Api User?"
                        content={
                           <TextFieldFormik //
                              name="api.apiShippingUser"
                              placeholder="Api User"
                           />
                        }
                        hr
                     />
                     <GridDisplay //
                        title="Api Password"
                        content={
                           <TextFieldFormik //
                              name="api.apiShippingPassword"
                              placeholder="Api Password"
                           />
                        }
                     />
                  </Card>
                  <hr className="border-t border-gray-300 my-3" />
                  <Button type="submit" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer" loading={ctrl.isSaving}>
                     Save
                  </Button>
               </Form>
            );
         }}
      </Formik>
   );
}
