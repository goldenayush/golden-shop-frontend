import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminStoreSettingActions, adminStoreSettingService } from "@/services/admin/admin-store-setting.service";
import React, { useEffect, useState } from "react";

export default function useStoreController() {
   const dispatch = useAppDispatch();
   const { getStoreSetting, saveStoreData } = useAppSelector((state) => state.admin.adminStoreSetting);

   const [fields, setFields] = useState({
      store: {
         storeName: "",
         storeDescription: "",
         storePhoneNumber: "",
         storeEmail: "",
         storeCountry: "",
         storeAddress: "",
         storeCity: "",
         storeProvince: "",
         storePostalCode: "",
         storeLogo: "",
      },
   });

   const onSubmit = async (data: any) => {
      const payload = [];
      const allFields = {
         ...data?.store,
      };
      for (const key in allFields) {
         payload.push({ name: key, value: allFields[key], isJson: false });
      }
      await dispatch(
         adminStoreSettingService.saveStoreSetting.api({
            settings: payload,
         })
      ).unwrap();
   };

   useEffect(() => {
      dispatch(adminStoreSettingService.getStoreSetting.api());
      return () => {};
   }, []);

   useEffect(() => {
      if (getStoreSetting.data?.length) {
         const patchValue: any = {
            store: {},
         };
         for (const element of getStoreSetting.data) {
            const name = element.name.toLowerCase();
            switch (true) {
               case name.startsWith("store"):
                  patchValue.store[element.name] = element.value;
                  patchValue.store.isJson = String(element.isJson);
                  break;
               default:
                  break;
            }
         }
         setFields(patchValue);
      }
      return () => {};
   }, [getStoreSetting.data]);

   return {
      fields,
      onSubmit,
      isFetching: getStoreSetting.isLoading,
      isSaving: saveStoreData.isLoading,
   };
}
