export type ISalesStatisticsResponse = {
  message: string;
  data: ISalesStatisticsData[];
};

export type ISalesStatisticsData = {
  time: string;
  total: string;
  count: string;
};

export interface ITotalSalesData {
  orders: number;
  total: string;
  completedPercentage: number;
  cancelledPercentage: number;
}

export interface ITotalSalesResponse {
  message: string;
  data: ITotalSalesData;
}