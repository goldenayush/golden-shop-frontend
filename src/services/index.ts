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

const rootReducer = combineReducers({
   admin: combineReducers({
      auth: authAdminReducer,
      category: adminCategoryReducer,
      attribute: adminAttributeReducer,
      collection: adminCollectionReducer,
      product: adminProductReducer,
      paymentSetting: adminPaymentSettingReducer,
      adminShippingSetting: adminShippingSettingReducer,
      adminStoreSetting: adminStoreSettingReducer,
   }),
   // user: combineReducers({}),
   public: combineReducers({
      placeLookup: placeLookupReducer,
   }),
});

export default rootReducer;
