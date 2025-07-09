import { combineReducers } from "@reduxjs/toolkit";
import { authAdminReducer } from "./admin/admin-auth.service";
import { adminCategoryReducer } from "./admin/admin-category.service";
import { adminAttributeReducer } from "./admin/admin-attribute.service";
import { adminCollectionReducer } from "./admin/admin-collection.service";
import { adminProductReducer } from "./admin/admin-product.service";
import { adminPaymentSettingReducer } from "./admin/admin-payment-setting.service";
import { adminShippingSettingReducer } from "./admin/admin-shipping-setting.service";
import { adminStoreSettingReducer } from "./admin/admin-store-setting.service";
import { placeLookupReducer } from "./public/place-lookup.service";
import { adminOrderReducer } from "./admin/admin-order.service";
import { adminTaxSettingReducer } from "./admin/admin-tax-setting.service";
import { adminCmsReducer } from "./admin/admin-cms.service";
import { adminCustomerReducer } from "./admin/admin-customer.service";
import { adminProductVariantReducer } from "./admin/admin-product-variant.service";
import { adminDashboardReducer } from "./admin/admin-dashborad.service";
import { adminCouponsReducer } from "./admin/admin-coupons.service";


const rootReducer = combineReducers({
   admin: combineReducers({
      auth: authAdminReducer,
      dashboard: adminDashboardReducer,
      category: adminCategoryReducer,
      attribute: adminAttributeReducer,
      collection: adminCollectionReducer,
      product: adminProductReducer,
      paymentSetting: adminPaymentSettingReducer,
      adminShippingSetting: adminShippingSettingReducer,
      adminStoreSetting: adminStoreSettingReducer,
      adminOrder: adminOrderReducer,
      coupons: adminCouponsReducer,
      adminTaxSetting: adminTaxSettingReducer,
      adminCms: adminCmsReducer,
      adminCustomer: adminCustomerReducer,
      adminProductVariant: adminProductVariantReducer,
   }),
   // user: combineReducers({}),
   public: combineReducers({
      placeLookup: placeLookupReducer,
   }),
});

export default rootReducer;
