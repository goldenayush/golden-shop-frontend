"use client";
import { Button, TextField } from "@/shared/ui";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useLoginController from "./login.controller";
import Footer from "../../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IsolationTemplate } from "@/shared/components";

type State = {
   showPassword: boolean;
};

export default function LoginPage() {
   const ctrl = useLoginController();
   return (
      <IsolationTemplate<State> vars={{ showPassword: false }}>
         {(state, setState) => (
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
                        <div className="relative mt-4">
                           <Field name="password">
                              {({ field }: any) => (
                                 <TextField
                                    {...field}
                                    type={state.showPassword ? "text" : "password"}
                                    label="Password"
                                    placeholder="Password"
                                    id="password"
                                 />
                              )}
                           </Field>
                           <span
                              onClick={() => setState({ showPassword: !state.showPassword })}
                              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                           >
                              {state.showPassword ? <FaEyeSlash /> : <FaEye />}
                           </span>
                        </div>

                        <hr className="my-2 border-[#e5e7eb]" />
                        <div>
                           <Button type="submit" className="text-white bg-[#008060] w-full uppercase py-[12px] text-[14px] font-semibold cursor-pointer  rounded-[3px]" loading={ctrl.login?.isLoading}>
                              sign in{" "}
                           </Button>
                        </div>
                     </div>
                  </div>
                  <Footer />
               </Form>
            </Formik>
         )}
      </IsolationTemplate>

   )
}
const styles = {
   cardShadow: {
      boxShadow: "6px 12px 60px rgba(0, 0, 0, .2)",
   },
}