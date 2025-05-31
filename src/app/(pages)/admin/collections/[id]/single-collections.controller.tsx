import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCollectionService } from "@/services/admin/admin-collection.service";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect } from "react";

export default function useSingleCollectionsController() {
   const { getSingleCollection, updateCollection } = useAppSelector((state) => state.admin.collection);
   const dispatch = useAppDispatch();
   const router = useRouter();
   const params = useParams<{ id: string }>();

   const onSubmit = async (body: any) => {
      try {
         await dispatch(adminCollectionService.updateCollection.api(body)).unwrap();
         router.replace("/admin/collections");
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      if (params?.id) {
         dispatch(adminCollectionService.getSingleCollection.api(params.id));
      }
      return () => {};
   }, [params?.id]);

   return {
      onSubmit,
      isFetching: getSingleCollection.isLoading,
      data: getSingleCollection.data,
      isUpdating: updateCollection.isLoading,
   };
}
