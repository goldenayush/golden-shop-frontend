export default function useDashboardController() {
   const lifetimeSalesData = [
      { name: "Completed", value: 60 },
      { name: "Cancelled", value: 20 },
      { name: "Others", value: 10 },
   ];
   const saleStatisticsData = [
      {
         total: 0,
         count: "0",
         time: "Dec 31",
      },
      {
         total: 0,
         count: "0",
         time: "Jan 31",
      },
      {
         total: "5095.0000",
         count: "14",
         time: "Feb 28",
      },
      {
         total: "4115.0000",
         count: "8",
         time: "Mar 31",
      },
      {
         total: 0,
         count: "0",
         time: "Apr 30",
      },
      {
         total: 0,
         count: "0",
         time: "May 31",
      },
   ];
   return { saleStatisticsData, lifetimeSalesData };
}
