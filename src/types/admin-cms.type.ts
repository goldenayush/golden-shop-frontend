export interface ICmsPage {
   id: string;
   status: boolean;
   createdAt: string;
   updatedAt: string;
   cmsPageDescription: ICmsPageDescription;
}

export interface ICmsPageDescription {
   id: string;
   cmsPageId: string;
   urlKey: string;
   name: string;
   content: string;
   metaTitle: string;
   metaKeywords: string;
   metaDescription: string;
}
