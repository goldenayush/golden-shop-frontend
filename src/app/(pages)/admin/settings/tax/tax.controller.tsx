import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminTaxSettingService } from "@/services/admin/admin-tax-setting.service";
import { useEffect } from "react";

export default function useTaxController() {
   const dispatch = useAppDispatch();
   const { createTaxClass, getTaxClasses, createRateTax, updateRateTax, saveTaxConfig, getTaxConfig } = useAppSelector((state) => state.admin.adminTaxSetting);

   const onCreateTaxClass = async (body: any, onModalClose: () => void) => {
      try {
         await dispatch(adminTaxSettingService.createTaxClass.api(body)).unwrap();
         dispatch(adminTaxSettingService.getTaxClasses.api());
         onModalClose();
      } catch (error) {
         return;
      }
   };

   const oncreateRateTax = async (body: any, onModalClose: () => void) => {
      try {
         await dispatch(adminTaxSettingService.createRateTax.api(body)).unwrap();
         dispatch(adminTaxSettingService.getTaxClasses.api());
         onModalClose();
      } catch (error) {
         return;
      }
   };
   const ondeleteRateTax = async (taxId: string) => {
      try {
         await dispatch(adminTaxSettingService.deleteRateTax.api(taxId)).unwrap();
         dispatch(adminTaxSettingService.getTaxClasses.api());
      } catch (error) {
         return;
      }
   };

   const onupdateRateTax = async (body: any, onModalClose: () => void) => {
      try {
         await dispatch(adminTaxSettingService.updateRateTax.api(body)).unwrap();
         dispatch(adminTaxSettingService.getTaxClasses.api());
         onModalClose();
      } catch (error) {
         return;
      }
   };

   const onSaveTaxConfig = async (body: any) => {
      try {
         const payload = [];
         const allFields = {
            ...body?.tax,
         };
         for (const key in allFields) {
            payload.push({ name: key, value: allFields[key], isJson: false });
         }
         await dispatch(adminTaxSettingService.saveTaxConfig.api({
               settings: payload,
            })).unwrap();
            
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      dispatch(adminTaxSettingService.getTaxClasses.api());
      dispatch(adminTaxSettingService.getTaxConfig.api());
      return () => {};
   }, []);

   return {
      createTaxClass,
      getTaxClasses,
      onCreateTaxClass,
      oncreateRateTax,
      createRateTax,
      ondeleteRateTax,
      updateRateTax,
      onupdateRateTax,
      onSaveTaxConfig,
      saveTaxConfig,
      getTaxConfig,
   };
}
