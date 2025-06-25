const coupons = [
   {
      id: 1,
      code: "ABC123",
      start_date: new Date("2025-05-01"),
      end_date: new Date("2025-06-01"),
      status: 1,
      used_times: 1,
   },
   {
      id: 2,
      code: "XYZ789",
      start_date: new Date("2025-04-15"),
      end_date: new Date("2025-05-15"),
      status: 0,
      used_times: 1,
   },
   {
      id: 3,
      code: "LMN456",
      start_date: new Date("2025-03-10"),
      end_date: new Date("2025-04-10"),
      status: 1,
      used_times: 1,
   },
];
export default function useCouponsController() {
   return { coupons };
}

