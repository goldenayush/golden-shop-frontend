import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminCollectionService } from "@/services/admin/admin-collection.service";
import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const collections = [
   { id: "1", collection_name: "Accessories", code: "accessories-products" }, //
   { id: "2", collection_name: "Best Sellers", code: "bestsellers" },
   { id: "3", collection_name: "Krishna Products", code: "krishnahomepage" },
   { id: "4", collection_name: "Featured Products", code: "homepage" },
];
export default function useCollectionsController() {
   const dispatch = useAppDispatch();
   const searchParams = useSearchParams();
   const router = useRouter();
   const { getCollection } = useAppSelector((state) => state.admin.collection);
   const debounce = useDebounce({
      time: 1000,
      callback(value) {
         dispatch(adminCollectionService.getCollection.api(`search=${value}`));
      },
   });
   const onDelateAttributes = (ids: string[]) => {
      dispatch(adminCollectionService.delateCollections.api(ids));
   };

   const setParam = (queryObj: any) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const key in queryObj) {
         params.set(key, queryObj[key]);
      }
      router.push("?" + params.toString());
   };

   useEffect(() => {
      dispatch(adminCollectionService.getCollection.api(searchParams.toString()));
      return () => {};
   }, [searchParams]);

   return {
      isFetching: getCollection.isLoading,
      data: getCollection.data,
      onDelateAttributes,
      setParam,
      debounce,
   };
}

/*
 TODO: 
     need pagination res
*/
