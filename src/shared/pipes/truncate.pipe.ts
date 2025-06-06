export const truncate = (dataString: string, limit: number) => {
   return dataString.length > limit ? dataString.substr(0, limit) + "..." : dataString;
};
