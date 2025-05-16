const customers = [
   {
      id: 1,
      fullname: "Alice Johnson",
      email: "alice.johnson@example.com",
      status: 1, // active
      created_at: new Date("2024-11-15T10:30:00Z"),
   },
   {
      id: 2,
      fullname: "Bob Smith",
      email: "bob.smith@example.com",
      status: 0, // inactive
      created_at: new Date("2024-12-01T14:45:00Z"),
   },
   {
      id: 3,
      fullname: "Carlos Diaz",
      email: "carlos.diaz@example.com",
      status: 1,
      created_at: new Date("2025-01-10T09:00:00Z"),
   },
   {
      id: 4,
      fullname: "Diana Lee",
      email: "diana.lee@example.com",
      status: 1,
      created_at: new Date("2025-03-20T16:15:00Z"),
   },
   {
      id: 5,
      fullname: "Edward Kim",
      email: "edward.kim@example.com",
      status: 0,
      created_at: new Date("2025-04-05T12:00:00Z"),
   },
];

export default function useCustomersController() {
   return { customers };
}
