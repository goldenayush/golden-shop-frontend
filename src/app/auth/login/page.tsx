"use client";
import { Button, TextField } from "@/shared/ui";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useLoginController from "./login.controller";

export default function LoginPage() {
   const ctrl = useLoginController();
   return (
      <Formik //
         initialValues={ctrl.initialValues}
         onSubmit={ctrl.onSubmit}
         validationSchema={Yup.object().shape({
            email: Yup.string().email("Invalid email").required("Email Required"),
            password: Yup.string().required("Password Required"),
         })}>
         <Form>
            <div className="bg-[#f6f6f7fc] min-h-screen flex justify-center items-center">
               <div className="bg-white w-[90%] md:w-[468px] p-[40px] rounded-[5px]" style={styles.cardShadow}>
                  <img src="/icons/stack.svg" alt="stack" className="mx-auto block mb-[40px]" />
                  <div>
                     <Field as={TextField} type="email" label="Email" name="email" id="email" placeholder="Email" />
                     <ErrorMessage component="small" name="email" className="text-red-500" />
                  </div>
                  <div className="mt-4">
                     <Field as={TextField} type="password" label="Password" name="password" id="password" placeholder="Password" />
                     <ErrorMessage component="small" name="password" className="text-red-500" />
                  </div>
                  <hr className="my-2 border-[#e5e7eb]" />
                  <div>
                     <Button loading type="submit" className="text-white bg-[#008060] w-full uppercase py-[12px] text-[14px] font-semibold cursor-pointer  rounded-[3px]">
                        sign in{" "}
                     </Button>
                  </div>
               </div>
            </div>
            <div className="border-t-1 border-t-[#e5e7eb] bg-[#f6f6f7fc] py-[20px] px-[30px] text-[#8c9196]">
               <p className="text-[14px]">© 2022 Evershop. All Rights Reserved.</p>
               <p className="text-[14px]">Version 1.2.2</p>
            </div>
         </Form>
      </Formik>
   );
}

const styles = {
   cardShadow: {
      boxShadow: "6px 12px 60px rgba(0, 0, 0, .2)",
   },
};
