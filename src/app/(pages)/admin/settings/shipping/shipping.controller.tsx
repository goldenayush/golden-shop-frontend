import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminShippingSettingService } from "@/services/admin/admin-shipping-setting.service";
import { useEffect, useRef } from "react";

export default function useShippingController() {
   const dispatch = useAppDispatch();
   const { createShippingZone, getShippingZones, deleteMethoodZones, createMethoodZone, updateMethoodZones } = useAppSelector((state) => state.admin.adminShippingSetting);

   const onSubmit = async (body: any, callback: () => void) => {
      try {
         await dispatch(adminShippingSettingService.createShippingZone.api(body)).unwrap();
         dispatch(adminShippingSettingService.getShippingZones.api());
         callback();
      } catch (error) {
         return;
      }
   };
   const onUpdateShippingZone = async (body: any, callback: () => void, data: any) => {
      try {
         const dataProvince = data?.shippingZoneProvince || [];
         const bodyProvince = body?.shippingZoneProvince || [];
         const result = bodyProvince.map((province: any, i: number) => {
            const data = dataProvince[i];
            return data?.province?.includes(province)
               ? {
                    id: data.id,
                    zoneId: data.zoneId,
                    province: data.province,
                 }
               : { province };
         });
         const payload = { ...body, shippingZoneProvince: result };
         await dispatch(adminShippingSettingService.updateShippingZone.api(payload)).unwrap();
         dispatch(adminShippingSettingService.getShippingZones.api());
      } catch (error) {
         return;
      }
   };

   const onDeleteShippingZone = async (id: string) => {
      try {
         await dispatch(adminShippingSettingService.deleteShippingZone.api(id)).unwrap();
         dispatch(adminShippingSettingService.getShippingZones.api());
      } catch (error) {
         return;
      }
   };

   const onCreateMethoodZone = async (payload: any, callback: () => void) => {
      try {
         await dispatch(adminShippingSettingService.createMethoodZone.api(payload)).unwrap();
         dispatch(adminShippingSettingService.getShippingZones.api());
         callback();
      } catch (error) {
         return;
      }
   };

   const onDeleteMethoodZones = async (id: string) => {
      try {
         await dispatch(adminShippingSettingService.deleteMethoodZones.api(id)).unwrap();
         dispatch(adminShippingSettingService.getShippingZones.api());
      } catch (error) {
         return;
      }
   };

   const onUpdateMethoodZone = async (payload: any, callback: () => void) => {
      try {
         await dispatch(adminShippingSettingService.updateMethoodZones.api(payload)).unwrap();
         dispatch(adminShippingSettingService.getShippingZones.api());
         callback();
      } catch (error) {
         return;
      }
   };
   useEffect(() => {
      dispatch(adminShippingSettingService.getShippingZones.api());
      return () => {};
   }, []);

   return {
      onSubmit,
      createShippingZone,
      getShippingZones,
      onDeleteShippingZone,
      onUpdateShippingZone,
      onCreateMethoodZone,
      onDeleteMethoodZones,
      deleteMethoodZones,
      createMethoodZone,
      onUpdateMethoodZone,
      updateMethoodZones,
   };
}
