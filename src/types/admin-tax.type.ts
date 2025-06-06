export interface ITaxClass {
   id: string;
   name: string;
   taxRate: ITaxRate[];
}

export interface ITaxRate {
   id: string;
   taxClassId: string;
   name: string;
   country: string;
   province: string;
   postcode: string;
   rate: string;
   isCompound: boolean;
   priority: number;
}
