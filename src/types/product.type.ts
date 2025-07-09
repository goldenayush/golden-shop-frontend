export interface IProduct {
   id: string;
   type: string;
   visibility: boolean;
   variantId: string;
   groupId: string;
   sku: string;

   price: number;
   weight: number;
   status: boolean;
   categoryId: string;
   productDescription: IProductDescription;
   productImages: IProductImage[];
   productInventory: IProductInventory;
   ProductAttributeValueIndex: IProductAttributeValueIndex[];
}

export interface IProductDescription {
   name: string;
   description: string;
   shortDescription: string;
   urlKey: string;
   metaTitle: string;
   metaDescription: string;
   metaKeywords: string;
}

export interface IProductImage {
   id?: string;
   productId?: string;
   originImage: string;
   thumbImage: string;
   listingImage: string;
   singleImage: string;
   isMain: boolean;
}

export interface IProductInventory {
   id?: string;
   productId?: string;
   qty: number;
   manageStock: boolean;
   stockAvailability: boolean;
}

export interface IProductAttributeValueIndex {
   id?: string;
   productId?: string;
   attributeId: string;
   optionId: string;
   optionText: string;
}
