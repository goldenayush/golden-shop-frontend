import HttpInterceptor from "@/libs/interceptors/http.interceptor";

/*Note : it is none redux service class */
class AdminFileUploadService extends HttpInterceptor {
   uploadFile = async (filesList: any[]) => {
      try {
         const formData = new FormData();
         filesList.forEach((file) => {
            formData.append("files", file);
         });
         const { data } = await this.admin.post("/admin/upload/images", formData);
         return data;
      } catch (error) {
         return error;
      }
   };
}
export const adminFileUploadService = new AdminFileUploadService();
