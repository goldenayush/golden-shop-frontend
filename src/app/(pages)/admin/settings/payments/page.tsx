"use client";
import { Card, Loading } from "@/shared/components";
import { Button } from "@/shared/ui";
import React from "react";
import usePaymentsController from "./payments.controller";
import { Form, Formik } from "formik";
import StripeForm from "./partials/StripeForm";
import PaypalForm from "./partials/PaypalForm";
import RazorpayForm from "./partials/RazorpayForm";
import PhonepeForm from "./partials/PhoneForm";
import CodForm from "./partials/CodForm";

export default function PaymentsPage() {
   const ctrl = usePaymentsController();
   if (ctrl.isFetching) {
      return <Loading className="h-[70vh] text-xl" />;
   }
   return (
      <>
         <Formik enableReinitialize initialValues={ctrl?.fields} onSubmit={ctrl.onSubmit}>
            {(formik) => (
               <Form>
                  {/* Stripe Payment */}
                  <Card className="py-4" heading={<span className="pl-3">Stripe Payment</span>}>
                     <StripeForm />
                  </Card>
                  {/* Paypal Payment */}
                  <Card className="py-4 mt-3" heading={<span className="pl-3">Paypal Payment</span>}>
                     <PaypalForm />
                  </Card>

                  {/* Razorpay Payment */}
                  <Card className="py-4 mt-3" heading={<span className="pl-3">Razorpay Payment</span>}>
                     <RazorpayForm />
                  </Card>

                  {/* phonepe Payment */}
                  <Card className="py-4 mt-3" heading={<span className="pl-3">phonepe Payment</span>}>
                     <PhonepeForm />
                  </Card>

                  {/* Cash On Delivery Payment*/}
                  <Card className="py-4 mt-3" heading={<span className="pl-3">Cash On Delivery Payment</span>}>
                     <CodForm />
                  </Card>
                  <div className="mt-3">
                     <Button //
                        type="submit"
                        loading={ctrl.isSaving}
                        className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
                        Save
                     </Button>
                  </div>
               </Form>
            )}
         </Formik>
      </>
   );
}
