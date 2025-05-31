export type ICategory = {
   id: string;
   status: boolean;
   parentId?: string;
   includeInNav: boolean;
   showProducts: boolean;
   position: any;
   createdAt: string;
   updatedAt: string;
   CategoryDescription: ICategoryDescription;
   children: ICategory[];
};

export type ICategoryDescription = {
   id: string;
   categoryId: string;
   name: string;
   shortDescription: any;
   description: string;
   image: any;
   metaTitle: string;
   metaKeywords: string;
   metaDescription: string;
   urlKey: any;
   createdAt: string;
   updatedAt: string;
};
