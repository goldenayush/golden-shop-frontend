export interface IAttribute {
   id: string;
   attributeCode: string;
   attributeName: string;
   type: string;
   isRequired: boolean;
   displayOnFrontEnd: boolean;
   sortOrder: number;
   isFilterable: boolean;
   attributeOption: IAttributeOption[];
   AttributeGroupAttribute: IAttributeGroupAttribute[];
}

export interface IAttributeOption {
   id: string;
   attributeId: string;
   attributeCode: string;
   optionText: string;
}

export interface IAttributeGroupAttribute {
   id: string;
   attributeId: string;
   attributeGroupId: string;
   attributeGroup: IAttributeGroup;
}

export interface IAttributeGroup {
   id: string;
   groupName: string;
   createdAt: string;
   updatedAt: string;
}
