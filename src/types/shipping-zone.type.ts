export interface IShippingZone {
   id: string;
   name: string;
   country: string;
   countryName: string;
   shippingZoneMethod: IShippingZoneMethod[];
   shippingZoneProvince: IShippingZoneProvince[];
}

export interface IShippingZoneProvince {
   id: string;
   zoneId: string;
   province: string;
   stateName: string;
}
export interface IShippingZoneMethod {
   name: string;
   id: string;
   methodId: string;
   zoneId: string;
   isEnabled: boolean;
   cost: string;
   calculationApi: any;
   conditionType: string;
   max: string;
   min: string;
   priceBasedCost: any;
   weightBasedCost: any;
}
