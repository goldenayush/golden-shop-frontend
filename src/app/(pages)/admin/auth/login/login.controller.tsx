import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { authAdminService } from "@/services/admin/admin-auth.service";
import { useRouter } from "next/navigation";

export default function useLoginController() {
   const { login } = useAppSelector((state) => state.admin.auth);
   const initialValues = { email: "", password: "" };
   const router = useRouter();
   const dispatch = useAppDispatch();

   const onSubmit = (values: any) => {
      dispatch(authAdminService.login.api(values))
         .unwrap()
         .then(() => router.replace("/admin/dashboard"));
   };
   return { initialValues, onSubmit, login };
}

