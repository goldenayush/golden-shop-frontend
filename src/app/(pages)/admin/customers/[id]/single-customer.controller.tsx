import React from "react";

export default function useSingleCustomerController() {
   const meOrders = [
      {
         id: 1,
         order_number: 10005,
         date: new Date("2025-05-01"),
         payment_status: "pending",
         order_status: "pending",
         price: 945,
      },
      {
         id: 2,
         order_number: 10006,
         date: new Date("2025-05-03"),
         payment_status: "paid",
         order_status: "shipped",
         price: 200,
      },
      {
         id: 3,
         order_number: 10007,
         date: new Date("2025-05-04"),
         payment_status: "failed",
         order_status: "cancelled",
         price: 875,
      },
      {
         id: 4,
         order_number: 10008,
         date: new Date("2025-05-05"),
         payment_status: "paid",
         order_status: "delivered",
         price: 345,
      },
      {
         id: 5,
         order_number: 10009,
         date: new Date("2025-05-06"),
         payment_status: "pending",
         order_status: "processing",
         price: 999,
      },
   ];

   return { meOrders };
}
