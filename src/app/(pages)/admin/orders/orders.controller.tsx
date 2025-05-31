const orders = [
   {
      id: 1,
      order_number: 10022,
      date: new Date("2025-05-01T10:30:00"),
      customer_email: "tina.p@goldeneagle.ai",
      shipment_status: "pending",
      payment_status: "paid",
      total: 302,
   },
   {
      id: 2,
      order_number: 10023,
      date: new Date("2025-05-02T14:45:00"),
      customer_email: "john.doe@example.com",
      shipment_status: "shipped",
      payment_status: "paid",
      total: 149.99,
   },
   {
      id: 3,
      order_number: 10024,
      date: new Date("2025-05-03T09:15:00"),
      customer_email: "linda.smith@gmail.com",
      shipment_status: "delivered",
      payment_status: "paid",
      total: 89.5,
   },
   {
      id: 4,
      order_number: 10025,
      date: new Date("2025-05-04T17:20:00"),
      customer_email: "mike@techcorps.io",
      shipment_status: "pending",
      payment_status: "unpaid",
      total: 243.75,
   },
   {
      id: 5,
      order_number: 10026,
      date: new Date("2025-05-05T11:00:00"),
      customer_email: "sara.lee@shoppinghub.com",
      shipment_status: "shipped",
      payment_status: "paid",
      total: 520.1,
   },
   {
      id: 6,
      order_number: 10027,
      date: new Date("2025-05-06T16:00:00"),
      customer_email: "kevin.m@startupworld.io",
      shipment_status: "delivered",
      payment_status: "refunded",
      total: 399.99,
   },
   {
      id: 7,
      order_number: 10028,
      date: new Date("2025-05-07T12:30:00"),
      customer_email: "emily.watson@mail.com",
      shipment_status: "cancelled",
      payment_status: "unpaid",
      total: 58.0,
   },
];

export default function useOrdersController() {
   return { orders };
}
