export interface CouponResponse {
  items: Coupon[];
  pagination: Pagination;
}
export interface CreateCoupon {
  status: boolean;
  description: string;
  discountAmount: number;
  freeShipping: boolean;
  discountType: string;
  coupon: string;
  targetProducts: TargetProducts;
  condition: Condition;
  userCondition: UserCondition;
  buyxGety: BuyXGetY[];
  maxUsesTimePerCoupon: number;
  maxUsesTimePerCustomer: number;
  startDate: string;
  endDate: string;
}

export interface Coupon {
  id: string;
  status: boolean;
  description: string;
  discountAmount: string;
  freeShipping: boolean;
  discountType: string;
  coupon: string;
  usedTime: number;
  targetProducts: TargetProducts;
  condition: Condition;
  userCondition: UserCondition;
  buyxGety: BuyXGetY[];
  maxUsesTimePerCoupon: number;
  maxUsesTimePerCustomer: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TargetProducts {
  maxQty: number;
  products: ProductFilter[];
}

export interface ProductFilter {
  key: string;
  qty?: number;
  value: string[];
  operator: "IN" | "NOT_IN";
}

export interface Condition {
  orderQty: number;
  orderTotal: number;
  requiredProducts: ProductFilter[];
}

export interface UserCondition {
  emails: string;
  groups: string[];
  purchased: number;
}

export interface BuyXGetY {
  sku: string;
  maxY: number;
  buyQty: number;
  getQty: number;
  discount: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
