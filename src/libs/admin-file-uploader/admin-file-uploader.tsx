import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { arrayPipeline } from "@/shared/functions";

export default class AdminFileUpload extends HttpInterceptor {
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

   productImageUploader = async (productImages: any[], productId = null) => {
      try {
         const [files, images] = arrayPipeline({
            input: productImages as any[],
            filter: (file) => file?.file,
            map: {
               matched: (file) => file,
            },
         });
         if (!files?.length) return null;
         const res = await this.uploadFile(files.map((x) => x.file));
         const resMap = res?.data?.map((url: string, i: number) => ({
            ...(productId ? { productId } : {}),
            originImage: url,
            thumbImage: url,
            listingImage: url,
            singleImage: url,
            isMain: files[i]?.isMain,
         }));
         return [...images, ...resMap];
      } catch (error) {
         return error;
      }
   };

   categoryImageUpload = async (image: File | string | null) => {
      try {
         if (!image || typeof image !== "object") return null;
         const res = await this.uploadFile([image]);
         return res.data[0];
      } catch (error) {
         return error;
      }
   };
}
