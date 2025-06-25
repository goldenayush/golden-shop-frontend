export function transformToPieChartData<T extends object>(data: T | null) {
  if (!data) return [];
  return Object.entries(data).map(([key, value]) => ({
    label: key,
    value: typeof value === "number" ? value : Number(value),
  }));
}