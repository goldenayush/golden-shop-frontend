import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminAttributeService } from "@/services/admin/admin-attribute.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useSingleAttributeController() {
   const { getSingleAttribute, getGroups, updateAttribute } = useAppSelector((state) => state.admin.attribute);
   const dispatch = useAppDispatch();
   const params = useParams<{ id: string }>();
   const router = useRouter();

   const onSubmit = async (body: any) => {
      try {
         let payload: any = {
            ...body,
            id: getSingleAttribute.data?.id,
            displayOnFrontEnd: Boolean(body?.displayOnFrontEnd),
            isFilterable: Boolean(body?.isFilterable),
            isRequired: Boolean(body?.isRequired),
            sortOrder: Number(body?.sortOrder),
            attributeOption: getGroups?.data
               ?.filter(({ id }) => body?.groupIds?.includes(id)) //
               ?.map((ele) => {
                  return {
                     groupName: ele?.groupName,
                     id: ele?.id,
                     attributeCode: body?.attributeCode,
                  };
               }),
         };
         console.log(payload);
         delete payload.groupIds;
         await dispatch(adminAttributeService.updateAttribute.api(payload)).unwrap();
         router.replace("/admin/attributes");
      } catch (error) {
         console.log(error);

         return;
      }
   };

   useEffect(() => {
      if (params?.id) {
         dispatch(adminAttributeService.getSingleAttribute.api(params?.id));
      }
      return () => {};
   }, [params?.id]);

   return {
      onSubmit,
      isFetching: getSingleAttribute.isLoading,
      data: getSingleAttribute.data,
      isUpdating: updateAttribute.isLoading,
   };
}
