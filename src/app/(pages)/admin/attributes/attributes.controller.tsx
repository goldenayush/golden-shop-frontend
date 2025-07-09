import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminAttributeService } from "@/services/admin/admin-attribute.service";
import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useAttributesController() {
   const { getAllAttribute, renameGroup, delateAttributes } = useAppSelector((state) => state.admin.attribute);
   const dispatch = useAppDispatch();
   const searchParams = useSearchParams();
   const router = useRouter();
   const debounce = useDebounce({
      time: 1000,
      callback(value) {
         dispatch(adminAttributeService.getAllAttribute.api(`search=${value}`));
      },
   });

   const onDelateAttributes = (ids: string[]) => {
      dispatch(adminAttributeService.delateAttributes.api(ids));
   };
   const setParam = (queryObj: any) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const key in queryObj) {
         params.set(key, queryObj[key]);
      }
      router.push("?" + params.toString());
   };

   const onRenameGroup = async (body: any) => {
      try {
         await dispatch(adminAttributeService.renameGroup.api(body)).unwrap();
      } catch (error) {
         return;
      }
   };

   useEffect(() => {
      dispatch(adminAttributeService.getAllAttribute.api(searchParams.toString()));
      return () => { };
   }, [searchParams]);

   return {
      isFetching: getAllAttribute.isLoading,
      renameGroup,
      onRenameGroup,
      data: getAllAttribute.data,
      pagination: getAllAttribute?.pagination,
      setParam,
      debounce,
      onDelateAttributes,
      delateAttributes,
   };
}
