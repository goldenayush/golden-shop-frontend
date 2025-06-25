import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminDashboardService } from "@/services/admin/admin-dashborad.service";

import { useEffect } from "react";

export default function useDashboardControllers() {
  const { fetchDailySaleStatistics, fetchWeeklySaleStatistics, fetchMonthlySaleStatistics, fetchTotalSalesData } = useAppSelector((state) => state.admin.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminDashboardService.fetchDailySaleStatistics.api());
    dispatch(adminDashboardService.fetchWeeklySaleStatistics.api());
    dispatch(adminDashboardService.fetchMonthlySaleStatistics.api());
    dispatch(adminDashboardService.fetchTotalSales.api());

    return () => { };
  }, []);

  return {
    dailySalesData: fetchDailySaleStatistics.data,
    weeklySalesData: fetchWeeklySaleStatistics.data,
    monthlySalesData: fetchMonthlySaleStatistics.data,
    totalSalesData: fetchTotalSalesData.data,
    isDailyLoading: fetchDailySaleStatistics.isLoading,
    isWeeklyLoading: fetchWeeklySaleStatistics.isLoading,
    isMonthlyLoading: fetchDailySaleStatistics.isLoading,
    isTotalLoading: fetchTotalSalesData.isLoading
  };
}
