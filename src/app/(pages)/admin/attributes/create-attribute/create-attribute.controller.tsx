import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { adminAttributeService } from "@/services/admin/admin-attribute.service";
import { useRouter } from "next/navigation";

export default function useCreateAttributeController() {
   const dispatch = useAppDispatch();
   const { createAttribute } = useAppSelector((state) => state.admin.attribute);
   const router = useRouter();

   const onSubmit = async (body: any) => {
      try {
         let payload = {
            ...body,
            displayOnFrontEnd: Boolean(body?.displayOnFrontEnd),
            isFilterable: Boolean(body?.isFilterable),
            isRequired: Boolean(body?.isRequired),
            attributeOption: body?.attributeOption?.map((attr: { optionText: string }) => ({
               attributeCode: body?.attributeCode,
               optionText: attr?.optionText,
            })),
            sortOrder: Number(body?.sortOrder),
         };
         await dispatch(adminAttributeService.createAttribute.api(payload)).unwrap();
         router.replace("/admin/attributes");
      } catch (error) {
         return;
      }
   };

   return {
      isCreating: createAttribute.isLoading,
      onSubmit,
   };
}
